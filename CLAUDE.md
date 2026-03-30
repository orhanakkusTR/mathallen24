# Mathallen24 - Proje Rehberi

## Proje Tanımı
Mathallen 24 Lugnet (mathallen24.nu) — Malmö'deki Mathallen market zincirinin ikinci şubesi için web sitesi ve admin paneli.

## Mağaza Bilgileri
- **Ad:** Mathallen 24 Lugnet
- **Slogan:** MAT FÖR ALLA!
- **Adres:** Lugna gatan 2, 211 60 Malmö
- **Telefon:** 040-92 44 20
- **Email:** mathallen24@mathallen.nu
- **Çalışma saatleri:** 08:00 - 22:00 (Alla dagar)
- **Harita:** https://share.google/MWMBVQELm4DgXytg3
- **Referans site:** mathallen.nu (GitHub: https://github.com/orhanakkusTR/mathallen.git)

## Tech Stack
- **Frontend:** React 19 + Vite + Tailwind CSS 3 + Radix UI (shadcn/ui)
- **Backend:** FastAPI (Python) + MongoDB (Motor async driver)
- **Fontlar:** Manrope (başlıklar) + Inter (gövde)
- **Renkler:** Kırmızı (#DC2626) primary, Turuncu (#F97316) secondary, Stone tonları
- **Dil:** İsveççe (sv)

## Proje Yapısı
```
mathallen24/
├── frontend/          # React SPA (Vite)
│   ├── src/
│   │   ├── components/   # Header, Footer, Layout, CampaignCard vb.
│   │   ├── components/ui/ # shadcn/ui primitives (dokunma)
│   │   ├── pages/        # Sayfa bileşenleri
│   │   ├── hooks/        # useIntersection, useMediaQuery
│   │   └── lib/          # utils.js (cn helper)
│   ├── public/           # Statik dosyalar, görseller, logo
│   └── index.html        # Vite entry point
├── backend/           # FastAPI sunucu
│   ├── server.py         # Tek dosya API (tüm endpointler)
│   ├── requirements.txt
│   └── .env.example
└── gorseller/         # Kaynak tasarım dosyaları (deploy edilmez)
```

## Geliştirme Komutları
```bash
# Frontend
cd frontend
npm install --legacy-peer-deps
npm start                        # Vite dev server → localhost:3000

# Backend
cd backend
pip install -r requirements.txt
cp .env.example .env             # MongoDB URL'ini ayarla
uvicorn server:app --reload      # → localhost:8000
```

## Ortam Değişkenleri
- **Frontend:** `frontend/.env` → `VITE_BACKEND_URL=http://localhost:8000`
- **Backend:** `backend/.env` → MONGO_URL, DB_NAME, JWT_SECRET, RESEND_API_KEY, vb.

## Kurallar
- Tüm UI metinleri İsveççe olmalı
- LocalStorage anahtarları `mathallen24_` prefix'i ile başlamalı
- shadcn/ui bileşenlerine (src/components/ui/) dokunma — bunlar standart primitifler
- Yeni bileşenler src/components/ altına, sayfalar src/pages/ altına
- API endpointleri /api prefix'i ile
- Görseller MongoDB'ye yükleniyor (base64), /api/images/{id} ile servis ediliyor
- Admin token: `mathallen24_admin_token` (localStorage)

## Kritik Dosyalar
- `frontend/src/pages/HomePage.jsx` — En kapsamlı sayfa (hero, kampanyalar, yorumlar, newsletter)
- `frontend/src/pages/AdminDashboard.jsx` — Admin paneli (kampanya CRUD, ayarlar)
- `frontend/src/components/CampaignCard.jsx` — Kampanya ürün kartı bileşeni
- `frontend/src/components/Header.jsx` — Navigasyon (mobil Sheet drawer)
- `backend/server.py` — Tüm API endpointleri tek dosyada

## Geliştirici
Orvedo Co. — info@orvedo.com
