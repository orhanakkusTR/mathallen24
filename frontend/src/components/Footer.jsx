import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';

const TikTokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-6">
              <img
                src="/logo.png"
                alt="Mathallen 24 Lugnet"
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Din lokala stormarknad i Malmö. Kvalitet, prisvärdhet och attraktiva
              veckokampanjer under ett och samma tak.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/MathallenMalmo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/__mathallen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com/@mathallen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Snabblänkar
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/om-oss" className="hover:text-red-400 transition-colors text-sm">
                  Om Mathallen
                </Link>
              </li>
              <li>
                <Link to="/erbjudanden" className="hover:text-red-400 transition-colors text-sm">
                  Veckans erbjudanden
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="hover:text-red-400 transition-colors text-sm">
                  Kontakta oss
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <a
                  href="https://maps.google.com/?q=Lugna+gatan+2,+211+60+Malmö"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-red-400 transition-colors"
                >
                  Lugna gatan 2,<br />
                  211 60 Malmö
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a href="tel:+46409244220" className="text-sm hover:text-red-400 transition-colors">
                  040-92 44 20
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a href="mailto:mathallen24@mathallen.nu" className="text-sm hover:text-red-400 transition-colors">
                  mathallen24@mathallen.nu
                </a>
              </li>
            </ul>
          </div>

          {/* Opening hours */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Öppettider
            </h3>
            <div className="flex items-start gap-3 mb-4">
              <Clock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm space-y-2">
                <div className="flex justify-between gap-4">
                  <span>Alla dagar</span>
                  <span className="text-white font-medium">08:00 - 22:00</span>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="mt-6">
              <p className="text-stone-400 text-xs font-medium mb-3">Handla på Mathallen</p>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="bg-white rounded px-2 py-1.5 h-8 flex items-center">
                  <img src="https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/o4qaqrp1_visa.svg" alt="Visa" className="h-5 w-auto" />
                </div>
                <div className="bg-white rounded px-2 py-1.5 h-8 flex items-center">
                  <img src="https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/7pkbx55j_mastercard.svg" alt="Mastercard" className="h-5 w-auto" />
                </div>
                <div className="bg-white rounded px-2 py-1.5 h-8 flex items-center">
                  <img src="https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/bs4qg3b5_apple-pay.svg" alt="Apple Pay" className="h-5 w-auto" />
                </div>
                <div className="bg-white rounded px-2 py-1.5 h-8 flex items-center">
                  <img src="https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/iyykfk7z_swish.svg" alt="Swish" className="h-5 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm">
            &copy; {currentYear} Mathallen 24 Lugnet. Alla rättigheter förbehållna.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <Link to="/allmanna-villkor" className="text-stone-500 hover:text-stone-300 transition-colors">
              Allmänna villkor
            </Link>
            <Link to="/dataskydd" className="text-stone-500 hover:text-stone-300 transition-colors">
              Dataskydd
            </Link>
            <Link to="/tillganglighet" className="text-stone-500 hover:text-stone-300 transition-colors">
              Tillgänglighet
            </Link>
            <Link to="/integritetspolicy" className="text-stone-500 hover:text-stone-300 transition-colors">
              Integritetspolicy
            </Link>
          </div>
        </div>
      </div>

      {/* Developer credit bar */}
      <div className="bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs text-stone-500">
          <span>
            Webbplats utvecklad av{' '}
            <a
              href="https://orvedo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              Orvedo Co.
            </a>
          </span>
          <span className="hidden md:inline text-stone-700">|</span>
          <a href="mailto:info@orvedo.com" className="hover:text-stone-300 transition-colors">
            info@orvedo.com
          </a>
          <span className="hidden md:inline text-stone-700">|</span>
          <span className="flex items-center gap-2">
            <a href="tel:+46723735555" className="hover:text-stone-300 transition-colors">072 373 55 55</a>
            <span className="text-stone-700">|</span>
            <a href="tel:+46722822866" className="hover:text-stone-300 transition-colors">072 282 28 66</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
