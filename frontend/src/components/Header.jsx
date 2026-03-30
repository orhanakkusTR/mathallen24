import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Clock, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

const navLinks = [
  { to: '/', label: 'Hem' },
  { to: '/om-oss', label: 'Om oss' },
  { to: '/erbjudanden', label: 'Veckans erbjudanden', badge: 'REA' },
  { to: '/kontakt', label: 'Kontakt' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top info bar — white bg, red text, matching reference */}
      <div className="bg-white text-red-600 py-2.5 text-sm border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Desktop */}
          <div className="hidden sm:flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a
                href="https://maps.google.com/?q=Lugna+gatan+2,+211+60+Malmö"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-red-700 transition-colors"
              >
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Lugna gatan 2, Malmö</span>
              </a>
              <span className="w-px h-4 bg-red-200" />
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span>Öppet: 08–22</span>
              </span>
              <span className="w-px h-4 bg-red-200" />
              <a href="tel:+46409244220" className="flex items-center gap-2 hover:text-red-700 transition-colors">
                <Phone className="w-4 h-4 text-red-500" />
                <span>040-92 44 20</span>
              </a>
            </div>
            <div className="text-red-500 font-medium">
              Nya erbjudanden varje vecka!
            </div>
          </div>

          {/* Mobile */}
          <div className="sm:hidden flex items-center justify-center gap-3 text-xs">
            <a
              href="https://maps.google.com/?q=Lugna+gatan+2,+211+60+Malmö"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-red-700"
            >
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Lugna gatan 2</span>
            </a>
            <span className="w-px h-3.5 bg-red-200" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>08–22</span>
            </span>
            <span className="w-px h-3.5 bg-red-200" />
            <a href="tel:+46409244220" className="flex items-center gap-1.5 hover:text-red-700">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>040-92 44 20</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main header — Red, matching reference exactly */}
      <div className="bg-[#d12c22] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/logo-white.png"
                alt="Mathallen 24 Lugnet"
                className="h-12 md:h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-base font-semibold transition-colors text-white/90 hover:text-white hover:bg-red-700/50',
                    isActive(link.to) && 'text-white bg-red-700'
                  )}
                >
                  {link.badge && (
                    <span className="absolute -top-4 -right-1 bg-yellow-400 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                asChild
                className="bg-white hover:bg-stone-100 text-red-600 rounded-full px-6 shadow-lg font-semibold"
              >
                <Link to="/erbjudanden">Se erbjudanden</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-red-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation — Sheet drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-[300px] p-0 flex flex-col">
          <SheetHeader className="bg-[#d12c22] px-6 py-5">
            <SheetTitle className="text-left">
              <img
                src="/logo-white.png"
                alt="Mathallen 24 Lugnet"
                className="h-10 w-auto"
              />
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col px-4 py-4 gap-1">
            <SheetClose asChild>
              <Link to="/erbjudanden" className="block mb-3">
                <Button className="w-full bg-[#d12c22] hover:bg-red-700 text-white rounded-full font-semibold">
                  Se veckans erbjudanden
                </Button>
              </Link>
            </SheetClose>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.to}>
                  <NavLink
                    to={link.to}
                    className={cn(
                      'relative px-4 py-3 rounded-xl text-base font-medium transition-colors text-stone-700 hover:bg-stone-50',
                      isActive(link.to) && 'text-red-600 bg-red-50'
                    )}
                  >
                    {link.badge && (
                      <span className="absolute top-2 right-3 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                        {link.badge}
                      </span>
                    )}
                    {link.label}
                  </NavLink>
                </SheetClose>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
