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
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60000;
  const oneWeek = 604800000;
  return Math.ceil((diff / oneWeek + start.getDay() + 1) / 7);
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
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Text */}
          <div className="lg:col-span-3 text-white">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
              <ShoppingCart className="w-4 h-4 text-yellow-400" />
              Mat för alla!
            </span>

            <h1 className="font-heading text-4xl sm:text-4xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6">
              Välkommen till
              <br />
              <span className="text-[#d12c22]">Mathallen 24</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-xl mb-8 leading-relaxed">
              Din lokala matbutik i Lugnet, Malmö. Färska varor, bästa priser och ett
              brett sortiment från hela världen — varje dag.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/erbjudanden"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-colors text-base shadow-lg shadow-red-600/25"
              >
                Se erbjudanden
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

          {/* Weekly offer card — desktop */}
          <div className="hidden lg:flex lg:col-span-2 justify-end">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-72">
              <div className="bg-[#d12c22] text-white px-6 py-4 text-center">
                <p className="text-sm font-medium uppercase tracking-wider opacity-80">
                  Aktuella erbjudanden
                </p>
                <p className="text-3xl font-heading font-extrabold mt-1">VECKA {week}</p>
              </div>
              <div className="px-6 py-5 text-center">
                <p className="text-stone-600 text-sm leading-relaxed">
                  Kolla in veckans bästa erbjudanden och kampanjer.
                </p>
                <Link
                  to="/erbjudanden"
                  className="mt-4 inline-flex items-center gap-1.5 text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
                >
                  Se alla erbjudanden
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly offer bar — mobile */}
        <div className="lg:hidden mt-10">
          <Link
            to="/erbjudanden"
            className="flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white hover:bg-white/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="bg-red-600 text-white text-sm font-extrabold px-3 py-1.5 rounded-lg">
                V.{week}
              </span>
              <span className="font-semibold text-base">Veckans erbjudanden</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
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
            subtitle="Våra löften"
            title="Varför välja Mathallen 24?"
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

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data } = await axios.get(`${API_BASE}/offers/homepage`);
        if (!cancelled) {
          setOffers(Array.isArray(data) ? data.slice(0, 4) : []);
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

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-2">
                Kampanjer
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900">
                Veckans erbjudanden
              </h2>
            </div>
            <Link
              to="/erbjudanden"
              className="inline-flex items-center gap-1.5 text-red-600 font-semibold hover:text-red-700 transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              Se alla
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
              <Link
                to="/erbjudanden"
                className="mt-4 inline-flex items-center gap-1.5 text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
              >
                Se alla erbjudanden
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </RevealSection>
        ) : (
          <RevealSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {offers.map((offer, idx) => (
                <CampaignCard key={offer.id || idx} offer={offer} />
              ))}
            </div>
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
    name: 'Anna Karlsson',
    initials: 'AK',
    color: 'red',
    rating: 5,
    text: 'Fantastisk butik med ett brett sortiment! Personalen är alltid hjälpsam och veckans erbjudanden är verkligen prisvärda. Vår familjs favoritbutik!',
    time: '2 veckor sedan',
    platform: 'google',
  },
  {
    id: 2,
    name: 'Magnus Lindqvist',
    initials: 'ML',
    color: 'blue',
    rating: 5,
    text: 'Bästa stormarknaden i Malmö! Fräscha grönsaker, bra kött och alltid trevlig service. Har handlat här i över 5 år och kommer fortsätta.',
    time: '1 månad sedan',
    platform: 'google',
  },
  {
    id: 3,
    name: 'Sofia Nilsson',
    initials: 'SN',
    color: 'green',
    rating: 5,
    text: 'Gillar verkligen deras färskvaror och charkuteriavdelning. Priserna är rimliga och kampanjerna är alltid värda att kolla in. Rekommenderas!',
    time: '3 veckor sedan',
    platform: 'facebook',
  },
  {
    id: 4,
    name: 'Erik Johansson',
    initials: 'EJ',
    color: 'purple',
    rating: 5,
    text: 'Alltid fräscha produkter och bra priser. Personalen är vänlig och butiken är välorganiserad. Min favoritbutik för veckans matinköp!',
    time: '1 vecka sedan',
    platform: 'google',
  },
  {
    id: 5,
    name: 'Linda Andersson',
    initials: 'LA',
    color: 'orange',
    rating: 4,
    text: 'Stort utbud av internationella produkter. Perfekt för oss som gillar att laga mat från olika kulturer. Kommer definitivt tillbaka!',
    time: '2 månader sedan',
    platform: 'google',
  },
  {
    id: 6,
    name: 'Oscar Pettersson',
    initials: 'OP',
    color: 'teal',
    rating: 5,
    text: 'Supernöjd med servicen! Köttdisken har alltid färska produkter och personalen hjälper gärna till med tips. Rekommenderar starkt!',
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
            <Button
              asChild
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
            >
              <a
                href="https://g.page/r/CSeTPWnEBFkLEAE/review"
                target="_blank"
                rel="noopener noreferrer"
              >
                Skriv ett omdöme
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
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
                <p className="font-heading font-extrabold text-3xl sm:text-4xl leading-none text-[#d12c22]">45.000+</p>
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
      <CategoriesSection />
      <NewsletterSection />
    </>
  );
}
