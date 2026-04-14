import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Award, Users, Leaf, ArrowRight, Phone, MapPin, Mail } from 'lucide-react';

import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { useIntersection } from '@/hooks/useIntersection';

// ---------------------------------------------------------------------------
// RevealSection
// ---------------------------------------------------------------------------

function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Values data
// ---------------------------------------------------------------------------

const VALUES = [
  {
    icon: Award,
    title: 'Kvalitet',
    description:
      'Vi väljer noggrant ut våra produkter för att garantera högsta kvalitet i varje vara du köper hos oss.',
    image: '/images/fresh-produce.jpg',
  },
  {
    icon: Heart,
    title: 'Prisvärdhet',
    description:
      'Vi arbetar hårt för att erbjuda de bästa priserna utan att tumma på kvaliteten. Mat för alla plånböcker.',
    image: '/images/Prisvardhet-gorsel.png',
  },
  {
    icon: Leaf,
    title: 'Mångfald',
    description:
      'Ett brett sortiment med produkter från hela världen — så att alla kan hitta sina favoriter hos oss.',
    image: '/images/urunler-cin.jpg',
  },
  {
    icon: Users,
    title: 'Kundfokus',
    description:
      'Vår personal finns alltid till hands för att hjälpa dig. Personlig service är kärnan i det vi gör.',
    image: '/images/kund-fokus.png',
  },
];

// ---------------------------------------------------------------------------
// Product gallery data
// ---------------------------------------------------------------------------

const GALLERY = [
  { title: 'Frukt & Grönt', subtitle: 'Dagliga leveranser', image: '/images/vegant.jpg' },
  { title: 'Kött & Chark', subtitle: 'Färskt varje dag', image: '/images/kot.jpg' },
  { title: 'Internationellt', subtitle: 'Smaker från hela världen', image: '/images/products-flatlay.png' },
  { title: 'Mejeri', subtitle: 'Ost, mjölk & yoghurt', image: '/images/mejeri.jpg' },
  { title: 'Bröd & Bageri', subtitle: 'Nybakat dagligen', image: '/images/brod.jpg' },
  { title: 'Asiatiska Produkter', subtitle: 'Smaker från Asien', image: '/images/urunler-cin.jpg' },
  { title: 'Drycker', subtitle: 'Juice, läsk & vatten', image: '/images/drink.jpg' },
  { title: 'Snacks & Godis', subtitle: 'Sötsaker för alla', image: '/images/snack.jpg' },
];

// ---------------------------------------------------------------------------
// AboutPage
// ---------------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <SEO
        title="Om oss"
        description="Lär känna Mathallen 24 Lugnet — din lokala matbutik i Malmö med färska varor, bra priser och mångkulturellt sortiment. Mat för alla!"
        url="/om-oss"
      />

      {/* ----------------------------------------------------------------- */}
      {/* 1. Hero — Full-width split                                        */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative bg-stone-900 overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[55vh] lg:min-h-[65vh]">
          {/* Left — text */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] py-16 md:py-24 relative z-10">
            <RevealSection>
              <span className="inline-block bg-[#d12c22] text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                Om oss
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
                Din lokala matbutik i Lugnet sedan{' '}
                <span className="text-red-400">2024</span>
              </h1>
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
                Mathallen 24 Lugnet är mer än en matbutik — vi är en mötesplats
                för grannar, en plats där smaker från hela världen möts och där
                alla är välkomna. Mat för alla, varje dag.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+46707952060"
                  className="inline-flex items-center justify-center gap-2 bg-[#d12c22] hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Ring oss
                </a>
                <a
                  href="mailto:info24@mathallen.nu"
                  className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 border border-white/40 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Mejla oss
                </a>
              </div>
            </RevealSection>
          </div>

          {/* Right — image (full-bleed to the right edge) */}
          <div className="relative min-h-[300px] md:min-h-0">
            <img
              src="/images/store-exterior.jpg"
              alt="Mathallen 24 Lugnet butiksfasad"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient blending into the dark left side */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 2. Story Section                                                  */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="max-w-full">
              <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Om oss
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight mb-8">
                Vår historia
              </h2>
              <div className="space-y-5 text-stone-600 text-base sm:text-lg leading-relaxed">
                <p>
                  Sedan 2024 har vi på Mathallen 24 haft en tydlig vision – att erbjuda färska råvaror, bra priser och ett brett internationellt sortiment mitt i Malmö. Vår butik speglar stadens mångfald och ger våra kunder möjlighet att upptäcka smaker från hela världen – från asiatiska specialiteter till medelhavsinspirerade produkter och moderna veganska alternativ.
                </p>
                <p>
                  Vi tror på att mat förenar människor. Därför strävar vi efter att skapa en plats där alla känner sig välkomna och där det är enkelt att hitta kvalitetsprodukter som passar både smak och budget.
                </p>
                <p>
                  Mathallen 24 Lugnet är vår andra filial i Malmö, belägen på Lugna gatan 2. När vi öppnade butiken hade vi ett tydligt mål: att ge närområdets invånare en komplett matbutik med ett brett och inspirerande sortiment under samma tak. Här hittar du allt från färsk frukt och grönt till kött, chark och internationella delikatesser.
                </p>
                <p>
                  Vår filosofi är enkel – <strong>Mat för alla.</strong> Oavsett bakgrund, smakpreferenser eller behov ska du kunna hitta det du söker hos oss.
                </p>
                <p>
                  Vi är stolta över att vara en del av gemenskapen i Lugnet. För oss är Mathallen 24 mer än bara en butik – det är en mötesplats där människor möts, inspireras och tillsammans skapar ett levande och inkluderande kvarter.
                </p>
                <p className="font-semibold text-stone-800">
                  Välkommen till oss!
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Varför välja oss                                                  */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#d12c22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center max-w-5xl mx-auto">
              <p className="text-white/70 font-semibold text-sm uppercase tracking-widest mb-3">
                Om vårt sortiment
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
                Varför välja oss?
              </h2>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                Ett brett internationellt sortiment med allt från asiatiska produkter till hälsosamma medelhavsspecialiteter och veganska alternativ. Hos oss hittar du både välkända varumärken och unika produkter från hela världen, alltid med fokus på kvalitet och service.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 3. Values Section                                                 */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Det vi står för
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
                Våra värderingar
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {VALUES.map((value, i) => (
              <RevealSection key={value.title} delay={i * 100}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                      <value.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-1">
                      {value.title}
                    </h3>
                    <p className="hidden md:block text-white/80 text-sm leading-relaxed max-w-[200px]">
                      {value.description}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 4. Product Gallery                                                */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Vårt sortiment
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
                Upptäck vårt sortiment
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {GALLERY.map((item, i) => (
              <RevealSection key={item.title} delay={i * 80}>
                <div className="relative aspect-square rounded-2xl overflow-hidden group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 5. CTA Section                                                    */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#d12c22]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealSection>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Välkommen till oss!
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-8 leading-relaxed">
              Vi finns på Lugna gatan 2 i Malmö. Öppet alla dagar 08:00–20:00.
              Kom förbi och upptäck vårt breda sortiment av färska varor till
              fantastiska priser.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 bg-white text-[#d12c22] font-semibold rounded-full px-8 py-3 text-base hover:bg-stone-100 transition-colors"
              >
                Hitta till oss
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/erbjudanden"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-semibold rounded-full px-8 py-3 text-base hover:bg-white/10 transition-colors"
              >
                Se veckans erbjudanden
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
