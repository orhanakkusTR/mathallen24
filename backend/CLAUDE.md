# Backend — Mathallen 24 Lugnet API

## Çalıştırma
```bash
pip install -r requirements.txt
cp .env.example .env   # Değişkenleri ayarla
uvicorn server:app --reload --port 8000
```

## Yapı
Tek dosya API: `server.py` — Tüm endpointler, modeller ve konfigürasyon bu dosyada.

## Ortam Değişkenleri (.env)
| Değişken | Açıklama | Varsayılan |
|----------|----------|------------|
| MONGO_URL | MongoDB bağlantı | mongodb://localhost:27017 |
| DB_NAME | Veritabanı adı | mathallen24 |
| JWT_SECRET | JWT imzalama | mathallen24-secret-key-2024 |
| RESEND_API_KEY | Email servisi | (boş) |
| SENDER_EMAIL | Gönderen email | onboarding@resend.dev |
| STORE_EMAIL | Mağaza email | mathallen24@mathallen.nu |
| CORS_ORIGINS | İzinli originler | * |

## MongoDB Koleksiyonları
- `offers` — Kampanya ürünleri
- `categories` — Ürün kategorileri
- `contact_messages` — İletişim formu mesajları
- `newsletter` — Email aboneleri
- `products` — Ürün envanteri
- `admins` — Admin kullanıcıları
- `settings` — Site ayarları (kampanya haftası, popup, vb.)
- `images` — Yüklenen ürün görselleri (base64)
- `popup_images` — Promo popup görselleri

## API Endpointleri

### Auth
- `POST /api/auth/login` — Admin giriş (JWT token döner)
- `GET /api/auth/me` — Mevcut admin bilgisi

### Offers (Kampanyalar)
- `GET /api/offers` — Liste (filtre: week, year, active_only)
- `GET /api/offers/count` — Sayım
- `GET /api/offers/current` — Aktif haftanın kampanyaları
- `GET /api/offers/homepage` — Anasayfa kampanyaları (home_order 1-4)
- `POST /api/offers` — Oluştur (admin)
- `PUT /api/offers/{id}` — Güncelle (admin)
- `DELETE /api/offers/{id}` — Sil (admin)

### Categories
- `GET /api/categories` — Kategori listesi

### Contact
- `POST /api/contact` — İletişim formu gönder
- `GET /api/contact/messages` — Mesajları listele (admin)

### Newsletter
- `POST /api/newsletter/subscribe` — Abone ol
- `GET /api/newsletter/subscribers` — Aboneleri listele (admin)

### Products
- `GET /api/products` — Ürün listesi
- `POST /api/products` — Ürün ekle (admin)
- `DELETE /api/products/{id}` — Ürün sil (admin)
- `GET /api/products/categories` — Ürün kategorileri

### Settings
- `GET /api/settings` — Site ayarları (public)
- `PUT /api/settings` — Ayarları güncelle (admin)
- `POST /api/settings/popup-image` — Popup görseli yükle (admin)

### Dosya Yükleme
- `POST /api/upload` — Ürün görseli yükle (admin)
- `GET /api/images/{image_id}` — Görsel servis et
- `GET /api/popup-image/{image_id}` — Popup görseli servis et

### Setup
- `POST /api/setup/admin` — İlk admin oluştur (kullanıcı: admin, şifre: mathallen24lugnet)

## Auth Detayları
- JWT algoritması: HS256
- Token süresi: 24 saat
- HTTPBearer güvenlik şeması
- Admin endpoint'leri `get_current_admin` dependency'si ile korunur

## Referanstan Farklar (mathallen.nu)
- Chatbot/lead endpointleri kaldırıldı
- Ürün bulk import kaldırıldı
- DB_NAME: mathallen24
- STORE_EMAIL: mathallen24@mathallen.nu
- Admin şifresi: mathallen24lugnet
