from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import certifi
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt
import resend
import shutil
import base64

ROOT_DIR = Path(__file__).parent
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url, tlsCAFile=certifi.where())
db = client[os.environ.get('DB_NAME', 'mathallen24')]

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
STORE_EMAIL = os.environ.get('STORE_EMAIL', 'mathallen24@mathallen.nu')

# JWT settings
JWT_SECRET = os.environ.get('JWT_SECRET', 'mathallen24-secret-key-2024')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

security = HTTPBearer()

# Create the main app
app = FastAPI(title="Mathallen 24 Lugnet API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============== MODELS ==============

class AdminUser(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password_hash: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AdminLogin(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class Offer(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    product_name: str
    original_price: Optional[float] = None
    offer_price: float
    unit: str = "st"
    image_url: Optional[str] = None
    category: str
    week_number: int
    year: int
    is_active: bool = True
    sort_order: int = 0
    home_order: Optional[int] = None  # 1-4 for homepage display order
    multi_buy: Optional[int] = None  # 2 for, 3 for, 4 for - null means no multi-buy
    is_best_price: bool = False  # Basta Pris badge
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class OfferCreate(BaseModel):
    product_name: str
    original_price: Optional[float] = None
    offer_price: float
    unit: str = "st"
    image_url: Optional[str] = None
    category: str
    week_number: int
    year: int
    is_active: bool = True
    sort_order: int = 0
    home_order: Optional[int] = None
    multi_buy: Optional[int] = None
    is_best_price: bool = False

class OfferUpdate(BaseModel):
    product_name: Optional[str] = None
    original_price: Optional[float] = None
    offer_price: Optional[float] = None
    unit: Optional[str] = None
    image_url: Optional[str] = None
    category: Optional[str] = None
    week_number: Optional[int] = None
    year: Optional[int] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None
    home_order: Optional[int] = None
    multi_buy: Optional[int] = None
    is_best_price: Optional[bool] = None

class Category(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    image_url: Optional[str] = None
    icon: str = "Package"

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_read: bool = False

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = True

class NewsletterSubscribe(BaseModel):
    email: EmailStr

# Product model for inventory
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductCreate(BaseModel):
    name: str
    category: Optional[str] = None

# ============== AUTH HELPERS ==============

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, password_hash: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))

def create_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS),
        "iat": datetime.now(timezone.utc)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        admin = await db.admins.find_one({"id": user_id}, {"_id": 0})
        if admin is None:
            raise HTTPException(status_code=401, detail="Admin not found")
        return admin
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ============== ROUTES ==============

@api_router.get("/")
async def root():
    return {"message": "Valkommen till Mathallen 24 Lugnet API"}

# ---- AUTH ----

@api_router.post("/auth/login", response_model=TokenResponse)
async def admin_login(login_data: AdminLogin):
    admin = await db.admins.find_one({"username": login_data.username}, {"_id": 0})
    if not admin or not verify_password(login_data.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Ogiltigt anvandarnamn eller losenord")
    token = create_token(admin["id"])
    return TokenResponse(access_token=token)

@api_router.get("/auth/me")
async def get_current_user(admin = Depends(get_current_admin)):
    return {"id": admin["id"], "username": admin["username"]}

# ---- OFFERS ----

@api_router.get("/offers", response_model=List[Offer])
async def get_offers(week: Optional[int] = None, year: Optional[int] = None, active_only: bool = True, limit: int = 500, skip: int = 0):
    query = {}
    if week:
        query["week_number"] = week
    if year:
        query["year"] = year
    if active_only:
        query["is_active"] = True

    # Sort by week_number descending, then by created_at descending (newest first)
    offers = await db.offers.find(query, {"_id": 0}).sort([("week_number", -1), ("created_at", -1)]).skip(skip).limit(limit).to_list(limit)
    for offer in offers:
        if isinstance(offer.get('created_at'), str):
            offer['created_at'] = datetime.fromisoformat(offer['created_at'])
    return offers

@api_router.get("/offers/count")
async def get_offers_count(week: Optional[int] = None, year: Optional[int] = None, active_only: bool = True):
    """Get total count of offers for pagination"""
    query = {}
    if week:
        query["week_number"] = week
    if year:
        query["year"] = year
    if active_only:
        query["is_active"] = True

    count = await db.offers.count_documents(query)
    return {"count": count}

@api_router.get("/offers/debug")
async def debug_offers():
    """Debug endpoint to see offer stats"""
    from datetime import datetime, timezone
    now = datetime.now(timezone.utc)
    current_week = now.isocalendar()[1]
    current_year = now.year

    total = await db.offers.count_documents({})
    active = await db.offers.count_documents({"is_active": True})
    current_week_active = await db.offers.count_documents({"week_number": current_week, "year": current_year, "is_active": True})
    current_week_all = await db.offers.count_documents({"week_number": current_week, "year": current_year})

    # Get all unique week numbers
    pipeline = [{"$group": {"_id": {"week": "$week_number", "year": "$year"}, "count": {"$sum": 1}, "active": {"$sum": {"$cond": ["$is_active", 1, 0]}}}}]
    weeks = await db.offers.aggregate(pipeline).to_list(100)

    return {
        "current_week": current_week,
        "current_year": current_year,
        "total_offers": total,
        "active_offers": active,
        "current_week_active": current_week_active,
        "current_week_all": current_week_all,
        "weeks_breakdown": weeks
    }

@api_router.get("/offers/current", response_model=List[Offer])
async def get_current_offers():
    now = datetime.now(timezone.utc)
    current_week = now.isocalendar()[1]
    current_year = now.year

    offers = await db.offers.find(
        {"week_number": current_week, "year": current_year, "is_active": True},
        {"_id": 0}
    ).sort("sort_order", 1).to_list(500)

    for offer in offers:
        if isinstance(offer.get('created_at'), str):
            offer['created_at'] = datetime.fromisoformat(offer['created_at'])
    return offers

@api_router.get("/offers/homepage", response_model=List[Offer])
async def get_homepage_offers():
    """Get offers for homepage - active offers sorted by home_order then sort_order"""
    offers = await db.offers.find(
        {"is_active": True},
        {"_id": 0}
    ).sort([("home_order", 1), ("sort_order", 1)]).to_list(100)

    for offer in offers:
        if isinstance(offer.get('created_at'), str):
            offer['created_at'] = datetime.fromisoformat(offer['created_at'])
    return offers

@api_router.post("/offers", response_model=Offer)
async def create_offer(offer_data: OfferCreate, admin = Depends(get_current_admin)):
    offer = Offer(**offer_data.model_dump())
    doc = offer.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.offers.insert_one(doc)
    return offer

@api_router.put("/offers/{offer_id}", response_model=Offer)
async def update_offer(offer_id: str, offer_data: OfferUpdate, admin = Depends(get_current_admin)):
    update_dict = {k: v for k, v in offer_data.model_dump().items() if v is not None}
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = await db.offers.update_one({"id": offer_id}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Offer not found")

    updated = await db.offers.find_one({"id": offer_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    return updated

@api_router.delete("/offers/{offer_id}")
async def delete_offer(offer_id: str, admin = Depends(get_current_admin)):
    result = await db.offers.delete_one({"id": offer_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Offer not found")
    return {"message": "Offer deleted"}

# ---- CATEGORIES ----

@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    categories = await db.categories.find({}, {"_id": 0}).to_list(20)
    if not categories:
        # Return default categories if none exist
        return [
            Category(id="1", name="Farska frukter & gronsaker", description="Handplockade frukter och gronsaker varje dag", image_url="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", icon="Apple"),
            Category(id="2", name="Dagligvaror", description="Allt du behover for vardagen", image_url="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", icon="ShoppingBasket"),
            Category(id="3", name="Kott & chark", description="Farskt kott och kvalitetschark", image_url="https://images.pexels.com/photos/1927383/pexels-photo-1927383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", icon="Beef"),
            Category(id="4", name="Mejeri", description="Mjolk, ost och andra mejeriprodukter", image_url="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", icon="Milk"),
            Category(id="5", name="Specialprodukter", description="Unika produkter fran hela varlden", image_url="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", icon="Sparkles"),
        ]
    return categories

# ---- CONTACT ----

@api_router.post("/contact")
async def submit_contact(contact_data: ContactMessageCreate):
    contact = ContactMessage(**contact_data.model_dump())
    doc = contact.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)

    # Send email notification
    if resend.api_key:
        try:
            html_content = f"""
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #F97316;">Nytt meddelande fran Mathallen 24 Lugnet</h2>
                <p><strong>Fran:</strong> {contact.name}</p>
                <p><strong>E-post:</strong> {contact.email}</p>
                <p><strong>Telefon:</strong> {contact.phone or 'Ej angiven'}</p>
                <hr style="border: 1px solid #E7E5E4;">
                <p><strong>Meddelande:</strong></p>
                <p style="background: #FAFAF9; padding: 15px; border-radius: 8px;">{contact.message}</p>
                <hr style="border: 1px solid #E7E5E4;">
                <p style="color: #78716C; font-size: 12px;">Skickat: {contact.created_at.strftime('%Y-%m-%d %H:%M')}</p>
            </body>
            </html>
            """

            params = {
                "from": SENDER_EMAIL,
                "to": [STORE_EMAIL],
                "subject": f"Kontaktformular: {contact.name}",
                "html": html_content
            }

            await asyncio.to_thread(resend.Emails.send, params)
            logger.info(f"Contact email sent for {contact.email}")
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")

    return {"message": "Tack for ditt meddelande! Vi aterkommer sa snart vi kan."}

@api_router.get("/contact/messages", response_model=List[ContactMessage])
async def get_contact_messages(admin = Depends(get_current_admin)):
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for msg in messages:
        if isinstance(msg.get('created_at'), str):
            msg['created_at'] = datetime.fromisoformat(msg['created_at'])
    return messages

# ---- NEWSLETTER ----

@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(subscription: NewsletterSubscribe):
    """Subscribe to newsletter"""
    # Check if already subscribed
    existing = await db.newsletter.find_one({"email": subscription.email})
    if existing:
        if existing.get('is_active'):
            return {"message": "Du ar redan prenumerant pa vart nyhetsbrev!"}
        else:
            # Reactivate subscription
            await db.newsletter.update_one(
                {"email": subscription.email},
                {"$set": {"is_active": True, "subscribed_at": datetime.now(timezone.utc).isoformat()}}
            )
            return {"message": "Valkommen tillbaka! Din prenumeration ar nu aktiv igen."}

    # Create new subscription
    new_sub = NewsletterSubscription(email=subscription.email)
    doc = new_sub.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    await db.newsletter.insert_one(doc)

    logger.info(f"New newsletter subscription: {subscription.email}")
    return {"message": "Tack! Du kommer nu fa vara veckokampanjer via e-post."}

@api_router.get("/newsletter/subscribers", response_model=List[NewsletterSubscription])
async def get_newsletter_subscribers(admin = Depends(get_current_admin)):
    """Get all newsletter subscribers (admin only)"""
    subscribers = await db.newsletter.find({"is_active": True}, {"_id": 0}).sort("subscribed_at", -1).to_list(1000)
    for sub in subscribers:
        if isinstance(sub.get('subscribed_at'), str):
            sub['subscribed_at'] = datetime.fromisoformat(sub['subscribed_at'])
    return subscribers

# ---- PRODUCTS (Basic CRUD) ----

@api_router.get("/products")
async def get_products(
    search: Optional[str] = None,
    category: Optional[str] = None,
    limit: int = 100,
    skip: int = 0
):
    """Get all products with optional search/filter"""
    query = {}
    if search:
        query["name"] = {"$regex": search, "$options": "i"}
    if category:
        query["category"] = category

    products = await db.products.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    total = await db.products.count_documents(query)

    return {"products": products, "total": total}

@api_router.post("/products")
async def create_product(product: ProductCreate, admin = Depends(get_current_admin)):
    """Create a single product (admin only)"""
    new_product = Product(name=product.name, category=product.category)
    doc = new_product.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.products.insert_one(doc)
    return {"message": "Produkt skapad", "product": doc}

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, admin = Depends(get_current_admin)):
    """Delete a product (admin only)"""
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Produkt hittades inte")
    return {"message": "Produkt borttagen"}

@api_router.get("/products/categories")
async def get_product_categories():
    """Get unique product categories"""
    categories = await db.products.distinct("category")
    return [c for c in categories if c]

# ---- SITE SETTINGS ----

class SiteSettings(BaseModel):
    campaign_week: str = "v.10"
    campaign_date: str = "03/03 - 09/03"
    campaign_year: int = 2026
    # Popup settings
    popup_enabled: bool = True
    popup_image_url: str = ""
    popup_link: str = "/erbjudanden"
    popup_delay: int = 1  # seconds before showing
    popup_frequency: str = "always"  # always, session, daily, once
    popup_pages: list = []  # empty = all pages, or list of specific pages
    popup_show_mobile: bool = True
    popup_show_desktop: bool = True

@api_router.get("/settings")
async def get_settings():
    """Get site settings (public)"""
    settings = await db.settings.find_one({"id": "site_settings"}, {"_id": 0})
    if not settings:
        # Return default settings
        return {
            "campaign_week": "v.10",
            "campaign_date": "03/03 - 09/03",
            "campaign_year": 2026,
            "popup_enabled": False,
            "popup_image_url": "",
            "popup_link": "/erbjudanden",
            "popup_delay": 1,
            "popup_frequency": "always",
            "popup_pages": [],
            "popup_show_mobile": True,
            "popup_show_desktop": True
        }
    return settings

@api_router.put("/settings")
async def update_settings(settings: SiteSettings, admin = Depends(get_current_admin)):
    """Update site settings (admin only)"""
    settings_doc = {
        "id": "site_settings",
        "campaign_week": settings.campaign_week,
        "campaign_date": settings.campaign_date,
        "campaign_year": settings.campaign_year,
        "popup_enabled": settings.popup_enabled,
        "popup_image_url": settings.popup_image_url,
        "popup_link": settings.popup_link,
        "popup_delay": settings.popup_delay,
        "popup_frequency": settings.popup_frequency,
        "popup_pages": settings.popup_pages,
        "popup_show_mobile": settings.popup_show_mobile,
        "popup_show_desktop": settings.popup_show_desktop,
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    await db.settings.update_one(
        {"id": "site_settings"},
        {"$set": settings_doc},
        upsert=True
    )
    return {"message": "Settings updated", "settings": settings_doc}

@api_router.post("/settings/popup-image")
async def upload_popup_image(file: UploadFile = File(...), admin = Depends(get_current_admin)):
    """Upload popup image (admin only)"""
    # Read file and convert to base64
    contents = await file.read()
    base64_image = base64.b64encode(contents).decode('utf-8')

    # Determine content type
    content_type = file.content_type or "image/png"

    # Create data URL
    image_data = f"data:{content_type};base64,{base64_image}"

    # Generate unique image ID
    image_id = str(uuid.uuid4())

    # Store in database
    await db.popup_images.update_one(
        {"id": "popup_image"},
        {"$set": {
            "id": "popup_image",
            "image_id": image_id,
            "image_data": image_data,
            "filename": file.filename,
            "content_type": content_type,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }},
        upsert=True
    )

    # Update settings with new image URL
    await db.settings.update_one(
        {"id": "site_settings"},
        {"$set": {"popup_image_url": f"/api/popup-image/{image_id}"}},
        upsert=True
    )

    return {"message": "Popup image uploaded", "image_url": f"/api/popup-image/{image_id}"}

@api_router.get("/popup-image/{image_id}")
async def get_popup_image(image_id: str):
    """Get popup image by ID"""
    popup_image = await db.popup_images.find_one({"image_id": image_id})
    if not popup_image or not popup_image.get("image_data"):
        raise HTTPException(status_code=404, detail="Image not found")

    # Parse data URL
    image_data = popup_image["image_data"]
    if image_data.startswith("data:"):
        # Extract content type and base64 data
        header, base64_data = image_data.split(",", 1)
        content_type = header.split(":")[1].split(";")[0]
        image_bytes = base64.b64decode(base64_data)
        return Response(content=image_bytes, media_type=content_type)

    raise HTTPException(status_code=404, detail="Invalid image data")

# ---- ADMIN SETUP ----

@api_router.post("/setup/admin")
async def setup_admin():
    """Create initial admin user if none exists"""
    existing = await db.admins.find_one({})
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")

    admin = AdminUser(
        username="admin",
        password_hash=hash_password("mathallen24lugnet")
    )
    doc = admin.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.admins.insert_one(doc)
    return {"message": "Admin created", "username": "admin", "password": "mathallen24lugnet"}

# Include the router in the main app
app.include_router(api_router)

# Serve uploaded files at /api/uploads (to go through ingress properly)
# Also keep local mount for backwards compatibility
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# ---- FILE UPLOAD (Now saves to MongoDB for persistence) ----
@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...), admin = Depends(get_current_admin)):
    """Upload a product image - saves to MongoDB for persistence across deployments"""
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Endast bildformat ar tillatna (JPG, PNG, WebP, GIF)")

    # Validate file size (max 5MB)
    contents = await file.read()
    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Filen ar for stor. Max 5MB tillatet.")

    # Generate unique filename
    file_ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
    unique_filename = f"{uuid.uuid4()}.{file_ext}"

    try:
        # Save to MongoDB for persistence
        image_doc = {
            "id": unique_filename,
            "filename": file.filename,
            "content_type": file.content_type,
            "data": base64.b64encode(contents).decode('utf-8'),
            "size": len(contents),
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.images.insert_one(image_doc)
        logger.info(f"Image saved to MongoDB: {unique_filename}")

        # Also save locally for immediate access in preview
        file_path = UPLOAD_DIR / unique_filename
        with open(file_path, "wb") as buffer:
            buffer.write(contents)

        # Return the URL path (using /api/images for DB-served images)
        return {
            "url": f"/api/images/{unique_filename}",
            "filename": unique_filename
        }
    except Exception as e:
        logger.error(f"File upload error: {str(e)}")
        raise HTTPException(status_code=500, detail="Kunde inte ladda upp filen")

# ---- SERVE IMAGES FROM MONGODB ----
@app.get("/api/images/{image_id}")
async def get_image(image_id: str):
    """Serve image from MongoDB - persistent across deployments"""
    # First try MongoDB
    image = await db.images.find_one({"id": image_id}, {"_id": 0})
    if image:
        image_data = base64.b64decode(image["data"])
        return Response(content=image_data, media_type=image["content_type"])

    # Fallback to local file (for backwards compatibility)
    file_path = UPLOAD_DIR / image_id
    if file_path.exists():
        with open(file_path, "rb") as f:
            content = f.read()
        # Determine content type from extension
        ext = image_id.split(".")[-1].lower()
        content_types = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png", "webp": "image/webp", "gif": "image/gif"}
        return Response(content=content, media_type=content_types.get(ext, "image/jpeg"))

    raise HTTPException(status_code=404, detail="Bilden hittades inte")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
