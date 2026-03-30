import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/sonner';
import { lazy, Suspense } from 'react';

import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import Layout from '@/components/Layout';

// Pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const OffersPage = lazy(() => import('@/pages/OffersPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const AllmannaVillkorPage = lazy(() => import('@/pages/AllmannaVillkorPage'));
const DataskyddPage = lazy(() => import('@/pages/DataskyddPage'));
const TillganglighetPage = lazy(() => import('@/pages/TillganglighetPage'));
const IntegritetspolicyPage = lazy(() => import('@/pages/IntegritetspolicyPage'));

// Admin
const AdminLogin = lazy(() => import('@/pages/AdminLogin'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));

// Optional components - lazy loaded with fallback to empty component
const PromoPopup = lazy(() =>
  import('@/components/PromoPopup').catch(() => ({ default: () => null }))
);
const FloatingNewsletter = lazy(() =>
  import('@/components/FloatingNewsletter').catch(() => ({ default: () => null }))
);

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent" />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public pages with Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/om-oss" element={<AboutPage />} />
              <Route path="/erbjudanden" element={<OffersPage />} />
              <Route path="/kontakt" element={<ContactPage />} />
              <Route path="/allmanna-villkor" element={<AllmannaVillkorPage />} />
              <Route path="/dataskydd" element={<DataskyddPage />} />
              <Route path="/tillganglighet" element={<TillganglighetPage />} />
              <Route path="/integritetspolicy" element={<IntegritetspolicyPage />} />
            </Route>

            {/* Admin pages (no Layout) */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>

          {/* Global overlays */}
          <Suspense fallback={null}>
            <PromoPopup />
            <FloatingNewsletter />
          </Suspense>
          <CookieConsent />
          <Toaster position="top-right" richColors />
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
