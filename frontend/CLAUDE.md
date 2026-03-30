# Frontend — Mathallen 24 Lugnet

## Build Sistemi
- **Vite** (CRA/Craco yerine — Node.js 24 uyumu için)
- Build: `npm run build` → `build/` klasörüne çıktı
- Dev: `npm start` → localhost:3000
- Path alias: `@/` → `src/`

## Ortam Değişkenleri
Vite kullandığımız için `VITE_` prefix'i zorunlu:
```
VITE_BACKEND_URL=http://localhost:8000
```
Kod içinde `import.meta.env.VITE_BACKEND_URL` şeklinde erişilir.
**`process.env.REACT_APP_*` KULLANMA** — Vite'ta çalışmaz.

## Bileşen Yapısı
- `src/components/ui/` — shadcn/ui primitives (Button, Dialog, Sheet, Tabs vb.). Değiştirme.
- `src/components/` — Proje bileşenleri (Header, Footer, CampaignCard, vb.)
- `src/pages/` — Sayfa bileşenleri (her route için bir dosya)
- `src/hooks/` — Custom hooks (useIntersection, useMediaQuery)
- `src/lib/utils.js` — `cn()` helper (clsx + tailwind-merge)

## Stil Kuralları
- Tailwind CSS 3 ile styling
- Başlıklar: `font-heading` class'ı (Manrope)
- Gövde: varsayılan Inter
- Primary: `red-600` / `hsl(var(--primary))`
- Secondary: `orange` tonu / `hsl(var(--secondary))`
- Arka plan: Stone-50 tonları
- Kartlar: `rounded-2xl shadow-sm hover:shadow-lg`
- Butonlar: genellikle `rounded-full`
- Animasyonlar: `useIntersection` hook ile scroll-reveal

## Sayfa Listesi
| Route | Dosya | Açıklama |
|-------|-------|----------|
| `/` | HomePage.jsx | Anasayfa (hero, kampanyalar, yorumlar) |
| `/om-oss` | AboutPage.jsx | Hakkında |
| `/erbjudanden` | OffersPage.jsx | Haftalık erbjudanden + filtre |
| `/kontakt` | ContactPage.jsx | İletişim formu + harita |
| `/admin` | AdminLogin.jsx | Admin giriş |
| `/admin/dashboard` | AdminDashboard.jsx | Admin paneli |
| `/allmanna-villkor` | AllmannaVillkorPage.jsx | Genel koşullar |
| `/dataskydd` | DataskyddPage.jsx | Veri koruma |
| `/tillganglighet` | TillganglighetPage.jsx | Erişilebilirlik |
| `/integritetspolicy` | IntegritetspolicyPage.jsx | Gizlilik politikası |

## API Kullanımı
```js
const API = `${import.meta.env.VITE_BACKEND_URL}/api`;

// Görseller
function getImageUrl(url) {
  if (url?.startsWith('/api/images')) return `${import.meta.env.VITE_BACKEND_URL}${url}`;
  if (url?.startsWith('/uploads')) return `${import.meta.env.VITE_BACKEND_URL}/api${url}`;
  return url;
}
```

## Lazy Loading
App.jsx'te sayfalar `React.lazy()` ile yüklenir. Yeni sayfa eklerken `lazy(() => import(...))` kullan.

## LocalStorage Anahtarları
- `mathallen24_admin_token` — Admin JWT
- `mathallen24_cookie_consent` — Cookie onayı
- `mathallen24_newsletter_subscribed` — Newsletter aboneliği
- `mathallen24_newsletter_popup_dismissed` — Popup kapatma
- `mathallen24_floating_minimized` (sessionStorage) — Newsletter widget durumu
- `mathallen24_popup_*` — Promo popup ayarları
