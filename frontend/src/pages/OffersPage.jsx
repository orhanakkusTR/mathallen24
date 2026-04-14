import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBasket, Filter, X, Tag, Calendar } from 'lucide-react';
import axios from 'axios';

import SEO from '@/components/SEO';
import CampaignCard, { getImageUrl } from '@/components/CampaignCard';

const API_BASE = `${import.meta.env.VITE_BACKEND_URL || ''}/api`;

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

function OfferCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
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
  );
}

function OffersGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(8)].map((_, i) => (
        <OfferCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// OffersPage
// ---------------------------------------------------------------------------

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Alla');
  const [filterOpen, setFilterOpen] = useState(false);

  // Fetch offers and settings in parallel
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [offersRes, settingsRes] = await Promise.all([
          axios.get(`${API_BASE}/offers/current`),
          axios.get(`${API_BASE}/settings`).catch(() => ({ data: null })),
        ]);

        if (!cancelled) {
          setOffers(Array.isArray(offersRes.data) ? offersRes.data : []);
          setSettings(settingsRes.data);
        }
      } catch {
        if (!cancelled) setOffers([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set();
    offers.forEach((o) => {
      if (o.category) cats.add(o.category);
    });
    return ['Alla', ...Array.from(cats).sort()];
  }, [offers]);

  // Filtered offers
  const filteredOffers = useMemo(() => {
    if (activeFilter === 'Alla') return offers;
    return offers.filter((o) => o.category === activeFilter);
  }, [offers, activeFilter]);

  // Campaign info from settings
  const campaignWeek = settings?.campaign_week;
  const campaignDateRange = settings?.campaign_date_range;

  return (
    <>
      <SEO
        title="Veckans Erbjudanden"
        description="Se veckans bästa erbjudanden och kampanjer hos Mathallen 24 Lugnet i Malmö. Färska varor till låga priser varje vecka."
        url="/erbjudanden"
      />

      {/* Hero — split layout */}
      <section className="relative bg-stone-900 overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[45vh] lg:min-h-[55vh]">
          {/* Left — text */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] py-12 md:py-16 relative z-10">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#d12c22]/15 text-[#ff6b61] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                <Tag className="w-4 h-4" />
                Veckans bästa priser
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-5">
                Veckans
                <br />
                <span className="text-[#d12c22]">erbjudanden</span>
              </h1>
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-md mb-6">
                Upptäck veckans bästa priser på utvalda favoriter – passa på att spara mer.
              </p>
              {(campaignWeek || campaignDateRange) && (
                <div className="inline-flex items-center gap-3 bg-stone-800/80 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-stone-700">
                  <Calendar className="w-5 h-5 text-[#d12c22] flex-shrink-0" />
                  <div className="text-left">
                    {campaignWeek && (
                      <p className="text-white text-sm font-semibold leading-tight">
                        Gäller {new Date().getFullYear()} v{campaignWeek}
                      </p>
                    )}
                    {campaignDateRange && (
                      <p className="text-stone-400 text-xs mt-0.5">{campaignDateRange}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right — image (full-bleed to the right edge) */}
          <div className="relative min-h-[280px] md:min-h-0">
            <img
              src="/images/store-interior.jpg"
              alt="Mathallen 24 Lugnet butik"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 sm:py-14 bg-stone-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Mobile filter toggle */}
          {!loading && categories.length > 2 && (
            <div className="md:hidden mb-4">
              <button
                onClick={() => setFilterOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-50 transition-colors"
              >
                {filterOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Filter className="w-4 h-4" />
                )}
                Filtrera
                {activeFilter !== 'Alla' && (
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {activeFilter}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Category filter pills */}
          {!loading && categories.length > 2 && (
            <div
              className={`mb-8 transition-all duration-300 overflow-hidden ${
                filterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100'
              }`}
            >
              <div className="flex flex-wrap gap-2 pb-2 md:overflow-x-auto md:flex-nowrap md:scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveFilter(cat);
                      setFilterOpen(false);
                    }}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      activeFilter === cat
                        ? 'bg-[#d12c22] text-white shadow-md shadow-red-600/25'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading && <OffersGridSkeleton />}

          {/* Empty state */}
          {!loading && filteredOffers.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-stone-100">
              <ShoppingBasket className="w-14 h-14 text-stone-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-stone-700 mb-2">
                Inga erbjudanden just nu
              </h2>
              <p className="text-stone-500 max-w-md mx-auto">
                {activeFilter !== 'Alla'
                  ? `Det finns inga erbjudanden i kategorin "${activeFilter}" just nu. Prova en annan kategori.`
                  : 'Nya erbjudanden kommer snart — håll utkik!'}
              </p>
              {activeFilter !== 'Alla' && (
                <button
                  onClick={() => setActiveFilter('Alla')}
                  className="mt-4 text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
                >
                  Visa alla erbjudanden
                </button>
              )}
            </div>
          )}

          {/* Offers grid */}
          {!loading && filteredOffers.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredOffers.map((offer, idx) => (
                <div
                  key={offer.id || idx}
                  className="animate-in fade-in duration-300"
                  style={{ animationDelay: `${idx * 30}ms`, animationFillMode: 'both' }}
                >
                  <CampaignCard offer={offer} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
