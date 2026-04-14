import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  Star,
  CheckCircle,
  Mail,
  Leaf,
  ShoppingCart,
  Heart,
  Globe,
} from 'lucide-react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import SectionHeading from '../components/SectionHeading';
import CampaignCard from '../components/CampaignCard';
import { useIntersection } from '../hooks/useIntersection';

const API_BASE = `${import.meta.env.VITE_BACKEND_URL || ''}/api`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getWeekNumber() {
  const now = new Date();
  const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function getWeekDateRange() {
  const now = new Date();
  const day = now.getDay() || 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - day + 1);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const fmt = (d) => `${d.getDate()}/${d.getMonth() + 1}`;
  return `${fmt(monday)} - ${fmt(sunday)}`;
}

// Animated section wrapper
function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-5 md:translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function HeroSection() {
  const week = getWeekNumber();
  const dateRange = getWeekDateRange();

  return (
    <section className="relative min-h-screen flex items-center -mt-[104px] md:-mt-[124px] pt-[104px] md:pt-[124px]">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/store-exterior.jpg"
          alt="Mathallen 24 Lugnet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 md:from-black/70 md:via-black/50 md:to-black/30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Text */}
        <div className="text-white max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <ShoppingCart className="w-4 h-4 text-yellow-400" />
            Där smak möter erbjudanden
          </span>

          <h1 className="font-heading text-4xl sm:text-4xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6">
            Välkommen till
            <br />
            <span className="text-[#d12c22]">Mathallen</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-xl mb-8 leading-relaxed">
            Upptäck veckans bästa priser på utvalda favoriter – passa
            på att spara mer
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/erbjudanden"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-colors text-base shadow-lg shadow-red-600/25"
            >
              Se veckans erbjudanden
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 border border-white/50 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-colors text-base"
            >
              Hitta till oss
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* VECKA box — bottom right (desktop/tablet) */}
      <Link
        to="/erbjudanden"
        className="hidden sm:block absolute bottom-16 right-[8%] md:bottom-20 md:right-[10%] lg:bottom-24 lg:right-[12%] z-20 group"
      >
        <div className="rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform w-52 md:w-56">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#d12c22]">
              Erbjudanden
            </p>
          </div>
          <div className="bg-[#d12c22] px-5 py-4 text-center text-white">
            <p className="text-3xl md:text-4xl font-heading font-extrabold leading-none whitespace-nowrap">VECKA {week}</p>
            <p className="text-xs mt-2 opacity-80">{dateRange}</p>
            <p className="text-xs font-semibold mt-2 opacity-90 group-hover:opacity-100 flex items-center justify-center gap-1">
              Se alla
              <ArrowRight className="w-3 h-3" />
            </p>
          </div>
        </div>
      </Link>

      {/* VECKA box — mobile */}
      <div className="sm:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <Link to="/erbjudanden" className="group">
          <div className="rounded-lg overflow-hidden shadow-xl w-32">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#d12c22]">
                Erbjudanden
              </p>
            </div>
            <div className="bg-[#d12c22] px-3 py-2.5 text-center text-white">
              <p className="text-xl font-heading font-extrabold leading-none">VECKA {week}</p>
              <p className="text-[10px] mt-1 opacity-80">{dateRange}</p>
              <p className="text-[10px] font-semibold mt-1.5 opacity-90 flex items-center justify-center gap-1">
                Se alla <ArrowRight className="w-2.5 h-2.5" />
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Values / Promises
// ---------------------------------------------------------------------------

const VALUES = [
  {
    icon: Leaf,
    title: 'Färskhet',
    description: 'Dagliga leveranser av färska varor',
    image: '/images/fresh-produce.jpg',
  },
  {
    icon: ShoppingCart,
    title: 'Prisvärdhet',
    description: 'Bästa priserna i området',
    image: '/images/store-interior.jpg',
  },
  {
    icon: Heart,
    title: 'Lokal service',
    description: 'Personlig service med ett leende',
    image: '/images/shopping.jpg',
  },
  {
    icon: Globe,
    title: 'Mångkulturellt',
    description: 'Sortiment från hela världen',
    image: '/images/products-flatlay.png',
  },
];

function ValuesSection() {
  return (
    <section className="relative py-16 sm:py-20 bg-white overflow-hidden">
      {/* Subtle dot pattern overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <SectionHeading
            subtitle="Våra löften till dig"
            title="Varför välja Mathallen 24 Lugnet?"
            description="Vi bryr oss om kvalitet, pris och service — varje dag, hela året."
          />
        </RevealSection>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {VALUES.map((v, i) => (
            <RevealSection key={v.title} delay={i * 100}>
              <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-default">
                <img
                  src={v.image}
                  alt={v.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d12c22] flex items-center justify-center mb-2">
                    <v.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl">{v.title}</h3>
                  <p className="text-sm text-white/75 mt-1 leading-snug">{v.description}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Offers Preview
// ---------------------------------------------------------------------------

function OffersSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
          <div className="aspect-square bg-stone-200" />
          <div className="bg-yellow-200 px-4 py-3">
            <div className="h-3 w-16 bg-yellow-300 rounded mb-2" />
            <div className="h-8 w-24 bg-yellow-300 rounded" />
          </div>
          <div className="px-4 py-3 space-y-2">
            <div className="h-4 w-full bg-stone-200 rounded" />
            <div className="h-3 w-20 bg-stone-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function OffersSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = React.useRef(null);
  const autoPlayRef = React.useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data } = await axios.get(`${API_BASE}/offers/homepage`);
        if (!cancelled) {
          setOffers(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  function getItemsPerPage() {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  }

  const [perPage, setPerPage] = useState(getItemsPerPage);
  const totalPages = Math.ceil(offers.length / perPage);

  useEffect(() => {
    function onResize() { setPerPage(getItemsPerPage()); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  function getPageScrollLeft(page) {
    if (!scrollRef.current || !scrollRef.current.children[0]) return 0;
    const card = scrollRef.current.children[0];
    const gap = parseFloat(getComputedStyle(scrollRef.current).gap) || 16;
    return page * perPage * (card.offsetWidth + gap);
  }

  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-scroll by page
  useEffect(() => {
    if (totalPages <= 1 || isPaused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev >= totalPages - 1 ? 0 : prev + 1;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: getPageScrollLeft(next), behavior: 'smooth' });
        }
        return next;
      });
    }, 2500);
    autoPlayRef.current = id;
    return () => clearInterval(id);
  }, [offers, totalPages, perPage, isPaused]);

  function scrollToPage(page) {
    setActiveIndex(page);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: getPageScrollLeft(page), behavior: 'smooth' });
    }
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-stone-900 leading-tight">
                Veckans erbjudanden
              </h2>
              <p className="mt-1 text-stone-400 text-sm">
                Ta del av våra starka kampanjer och extra bra priser – varje vecka.
              </p>
            </div>
            <Link
              to="/erbjudanden"
              className="inline-flex items-center gap-1.5 bg-[#d12c22] hover:bg-red-700 text-white font-semibold whitespace-nowrap self-start sm:self-auto text-sm rounded-full px-5 py-2.5 transition-colors"
            >
              Se alla erbjudanden
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealSection>

        {loading ? (
          <OffersSkeleton />
        ) : error || offers.length === 0 ? (
          <RevealSection>
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-100">
              <ShoppingCart className="w-10 h-10 text-red-300 mx-auto mb-4" />
              <p className="text-stone-500 text-lg">
                Nya erbjudanden kommer snart — håll utkik!
              </p>
            </div>
          </RevealSection>
        ) : (
          <RevealSection>
            <div
              ref={scrollRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {offers.map((offer, idx) => (
                <div
                  key={offer.id || idx}
                  className="snap-start flex-shrink-0"
                  style={{ width: `calc((100% - ${(perPage - 1)} * 1rem) / ${perPage})` }}
                >
                  <CampaignCard offer={offer} />
                </div>
              ))}
            </div>

            {/* Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToPage(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'bg-[#d12c22] w-6'
                        : 'bg-stone-300 hover:bg-stone-400 w-2.5'
                    }`}
                  />
                ))}
              </div>
            )}

          </RevealSection>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Customer Reviews
// ---------------------------------------------------------------------------

const customerReviews = [
  {
    id: 1,
    name: 'Fatima Al-Hassan',
    initials: 'FA',
    color: 'red',
    rating: 5,
    text: 'Äntligen en butik i Lugnet som har allt man behöver! Färska grönsaker, bra köttsortiment och fantastiska veckoerbjudanden. Hela familjen älskar att handla här.',
    time: '2 veckor sedan',
    platform: 'google',
  },
  {
    id: 2,
    name: 'Johan Ekström',
    initials: 'JE',
    color: 'blue',
    rating: 5,
    text: 'Bästa matbutiken i området utan tvekan. Priserna slår de stora kedjorna och kvaliteten på färskvarorna är alltid i topp. Personalen känner igen en och hälsar alltid glatt!',
    time: '1 månad sedan',
    platform: 'google',
  },
  {
    id: 3,
    name: 'Maria Kovač',
    initials: 'MK',
    color: 'green',
    rating: 5,
    text: 'Jag hittar produkter här som jag inte kan hitta någon annanstans i Malmö. Underbart sortiment från hela världen och väldigt schyssta kampanjpriser varje vecka.',
    time: '3 veckor sedan',
    platform: 'facebook',
  },
  {
    id: 4,
    name: 'Ahmed Yilmaz',
    initials: 'AY',
    color: 'purple',
    rating: 5,
    text: 'Handlar här varje vecka med familjen. Butiken är ren, välsorterad och har alltid fräscha varor. Veckans erbjudanden gör verkligen skillnad i plånboken!',
    time: '1 vecka sedan',
    platform: 'google',
  },
  {
    id: 5,
    name: 'Elina Bergström',
    initials: 'EB',
    color: 'orange',
    rating: 4,
    text: 'Stort utbud av internationella produkter och kryddor. Perfekt för oss som älskar att laga mat från olika kök. Priserna är mycket konkurrenskraftiga!',
    time: '2 månader sedan',
    platform: 'google',
  },
  {
    id: 6,
    name: 'Samir Hadzic',
    initials: 'SH',
    color: 'teal',
    rating: 5,
    text: 'Köttavdelningen är fantastisk — alltid färskt och bra kvalitet. Personalen tar sig tid att hjälpa till och ge tips. Min go-to butik för all mathandling!',
    time: '3 veckor sedan',
    platform: 'facebook',
  },
];

const colorClasses = {
  red: { bg: 'bg-red-100', text: 'text-red-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-600' },
};

const GoogleLogo = () => (
  <img
    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
    alt="Google"
    className="h-4 w-auto"
  />
);

const FacebookLogo = () => (
  <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

function ReviewCard({ review }) {
  return (
    <div className="flex-shrink-0 w-[280px] md:w-[380px] bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-100">
      {/* Top: stars + platform logo */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-stone-200 text-stone-200'
              }`}
            />
          ))}
        </div>
        {review.platform === 'google' ? <GoogleLogo /> : <FacebookLogo />}
      </div>

      {/* Review text */}
      <p className="text-stone-700 mb-4 leading-relaxed text-sm md:text-base">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full ${colorClasses[review.color].bg} flex items-center justify-center`}
        >
          <span className={`${colorClasses[review.color].text} font-semibold text-sm`}>
            {review.initials}
          </span>
        </div>
        <div>
          <p className="font-semibold text-stone-900 text-sm">{review.name}</p>
          <p className="text-stone-500 text-xs">{review.time}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  return (
    <section className="py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row: rating + title on left, CTA on right */}
        <RevealSection>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-stone-600 font-medium">4.8 / 5</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-stone-900">
                Vad våra kunder tycker
              </h2>
            </div>
            <a
              href="https://g.page/r/CSeTPWnEBFkLEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#d12c22] hover:bg-red-700 text-white font-semibold whitespace-nowrap text-sm rounded-full px-5 py-2.5 transition-colors"
            >
              Skriv ett omdöme
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </RevealSection>

        {/* Auto-scrolling reviews carousel */}
        <div className="reviews-carousel">
          <div className="flex gap-4 md:gap-6 animate-scroll-reviews">
            {/* First set */}
            {customerReviews.map((review) => (
              <ReviewCard key={`review-${review.id}`} review={review} />
            ))}
            {/* Duplicate for seamless loop */}
            {customerReviews.map((review) => (
              <ReviewCard key={`review-dup-${review.id}`} review={review} />
            ))}
          </div>
        </div>

        {/* Platform badges */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="inline-flex items-center gap-2 bg-stone-100 rounded-full px-4 py-2">
            <GoogleLogo />
            <span className="text-stone-600 text-xs md:text-sm font-medium">1630+ omdömen</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-stone-100 rounded-full px-4 py-2">
            <FacebookLogo />
            <span className="text-stone-600 text-xs md:text-sm font-medium">134+ omdömen</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Why Shop With Us
// ---------------------------------------------------------------------------

const BULLET_POINTS = [
  'Dagliga leveranser av frukt, grönt och färskvaror',
  'Brett internationellt sortiment — produkter från hela världen',
  'Veckovisa kampanjer med bästa priserna i Malmö',
  'Trevlig och kunnig personal som alltid hjälper dig',
  'Öppet varje dag med generösa öppettider',
  'Enkel parkering och centralt läge i Lugnet',
];

function WhyShopSection() {
  return (
    <section className="py-16 sm:py-20 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <RevealSection>
            <div>
              <p className="text-red-400 font-semibold text-sm uppercase tracking-widest mb-3">
                Om oss
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                En matbutik i Lugnet — för alla
              </h2>
              <p className="text-stone-400 text-base sm:text-lg leading-relaxed mb-8">
                Mathallen 24 Lugnet i Malmö öppnade som vår andra butik och har snabbt blivit
                en favorit i området. Vi erbjuder ett brett sortiment av dagligvaror, internationella
                specialiteter och färska produkter till priser som slår de flesta.
              </p>
              <ul className="space-y-3">
                {BULLET_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-stone-300 text-sm sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="relative">
              <img
                src="/images/store-interior.jpg"
                alt="Inuti Mathallen 24 Lugnet"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[16/10] lg:aspect-[4/3]"
                loading="lazy"
              />
              {/* Bottom-left badge */}
              <div className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 bg-[#d12c22] text-white rounded-2xl px-5 py-4 sm:px-6 sm:py-5 shadow-xl animate-float">
                <p className="font-heading font-extrabold text-3xl sm:text-4xl leading-none">5+</p>
                <p className="text-xs sm:text-sm font-medium opacity-90 mt-1">års erfarenhet</p>
              </div>
              {/* Top-right badge */}
              <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 bg-white text-stone-900 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <p className="font-heading font-extrabold text-3xl sm:text-4xl leading-none text-[#d12c22]">30.000+</p>
                <p className="text-xs sm:text-sm font-medium text-stone-500 mt-1">Produkter i sortimentet</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Newsletter
// ---------------------------------------------------------------------------

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email.trim()) return;

      setStatus('loading');
      try {
        await axios.post(`${API_BASE}/newsletter/subscribe`, { email });
        setStatus('success');
        setMessage('Tack! Du är nu prenumerant.');
        setEmail('');
      } catch (err) {
        setStatus('error');
        setMessage(
          err.response?.data?.message || 'Något gick fel. Försök igen senare.'
        );
      }
    },
    [email]
  );

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-red-700 via-red-600 to-red-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left side */}
            <div>
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4 12 13 2 4" />
                </svg>
                Nyhetsbrev
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                Missa aldrig ett erbjudande!
              </h2>
              <p className="text-red-100 text-base sm:text-lg leading-relaxed max-w-lg">
                Prenumerera på vårt nyhetsbrev och få veckans bästa erbjudanden och kampanjer direkt i din inkorg. Helt gratis!
              </p>
            </div>

            {/* Right side */}
            <div>
              {status === 'success' ? (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-5 text-white font-medium text-center">
                  {message}
                </div>
              ) : (
                <div>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Din e-postadress"
                        className="w-full h-[52px] pl-12 pr-5 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-base"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold px-8 h-[52px] rounded-xl transition-colors disabled:opacity-60 whitespace-nowrap"
                    >
                      {status === 'loading' ? 'Skickar...' : 'Prenumerera'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                  <p className="mt-3 text-red-200/70 text-sm">
                    Vi skickar max ett mail per vecka. Avsluta när du vill.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <p className="mt-3 text-red-100 text-sm">{message}</p>
              )}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Categories Showcase
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { name: 'Frukt & Grönt', image: '/images/fresh-produce.jpg' },
  { name: 'Kött & Chark', image: '/images/shopping.jpg' },
  { name: 'Internationellt', image: '/images/products-flatlay.png' },
  { name: 'Dagligvaror', image: '/images/store-interior.jpg' },
];

function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <SectionHeading
            subtitle="Sortiment"
            title="Utforska våra avdelningar"
            description="Från färska grönsaker till internationella specialiteter — vi har allt du behöver."
          />
        </RevealSection>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {CATEGORIES.map((cat, i) => (
            <RevealSection key={cat.name} delay={i * 80}>
              <Link
                to="/erbjudanden"
                className="group relative aspect-[3/2] rounded-2xl overflow-hidden block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                  <h3 className="font-heading font-extrabold text-white text-base sm:text-lg flex items-center gap-2">
                    {cat.name}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// HomePage
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuesSection />
      <OffersSection />
      <ReviewsSection />
      <WhyShopSection />
      <NewsletterSection />
    </>
  );
}
