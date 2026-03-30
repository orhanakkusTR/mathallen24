import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Award, Users, Leaf, ArrowRight, Phone, MapPin } from 'lucide-react';

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
    image: '/images/store-interior.jpg',
  },
  {
    icon: Leaf,
    title: 'Mångfald',
    description:
      'Ett brett sortiment med produkter från hela världen — så att alla kan hitta sina favoriter hos oss.',
    image: '/images/products-flatlay.png',
  },
  {
    icon: Users,
    title: 'Kundfokus',
    description:
      'Vår personal finns alltid till hands för att hjälpa dig. Personlig service är kärnan i det vi gör.',
    image: '/images/shopping.jpg',
  },
];

// ---------------------------------------------------------------------------
// Product gallery data
// ---------------------------------------------------------------------------

const GALLERY = [
  { title: 'Frukt & Grönt', subtitle: 'Dagliga leveranser', image: '/images/fresh-produce.jpg' },
  { title: 'Kött & Chark', subtitle: 'Färskt varje dag', image: '/images/store-interior.jpg' },
  { title: 'Internationellt', subtitle: 'Smaker från hela världen', image: '/images/products-flatlay.png' },
  { title: 'Mejeri', subtitle: 'Ost, mjölk & yoghurt', image: '/images/shopping.jpg' },
  { title: 'Bröd & Bageri', subtitle: 'Nybakat dagligen', image: '/images/store-exterior.jpg' },
  { title: 'Kryddor & Oljor', subtitle: 'Smaksättning för alla', image: '/images/fresh-produce.jpg' },
  { title: 'Drycker', subtitle: 'Juice, läsk & vatten', image: '/images/shopping.jpg' },
  { title: 'Snacks & Godis', subtitle: 'Sötsaker för alla', image: '/images/products-flatlay.png' },
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
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-lg">
                Mathallen 24 Lugnet är mer än en matbutik — vi är en mötesplats
                för grannar, en plats där smaker från hela världen möts och där
                alla är välkomna. Mat för alla, varje dag.
              </p>
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left — text */}
            <RevealSection>
              <div>
                <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-3">
                  Vår historia
                </p>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight mb-8">
                  Vår historia
                </h2>
                <div className="space-y-5 text-stone-600 text-base sm:text-lg leading-relaxed">
                  <p>
                    Mathallen 24 Lugnet är den andra filialen av Mathallen i
                    Malmö. Vi öppnade vår butik på Lugna gatan 2 i stadsdelen
                    Lugnet år 2024 med ett tydligt mål — att erbjuda
                    närområdets invånare en matbutik som kombinerar färska
                    produkter, bra priser och ett mångkulturellt sortiment
                    under samma tak.
                  </p>
                  <p>
                    Vår filosofi är enkel: <strong>Mat för alla!</strong>{' '}
                    Oavsett var du kommer ifrån eller vad du letar efter ska
                    du kunna hitta det hos oss. Vi har ett brett utbud av
                    dagligvaror, frukt och grönt, kött och chark samt
                    internationella specialiteter som gör att alla kan laga
                    sina favoriträtter.
                  </p>
                  <p>
                    Vi är stolta över att vara en del av Lugnets gemenskap.
                    Vår butik är mer än bara en matbutik — det är en
                    mötesplats där grannar träffas och där vi tillsammans
                    bygger ett bättre kvarter. Varje dag strävar vi efter att
                    leverera den bästa upplevelsen till alla som besöker oss.
                  </p>
                </div>

                {/* Contact info boxes */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-stone-50 rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#d12c22] text-white flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Telefon
                      </p>
                      <p className="text-sm text-stone-600">040-92 44 20</p>
                    </div>
                  </div>
                  <div className="bg-stone-50 rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#d12c22] text-white flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Adress
                      </p>
                      <p className="text-sm text-stone-600">
                        Lugna gatan 2, Malmö
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Right — image */}
            <RevealSection delay={150}>
              <div className="relative">
                <img
                  src="/images/store-interior.jpg"
                  alt="Inuti Mathallen 24 Lugnet"
                  className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </div>
            </RevealSection>
          </div>
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
      <section className="py-16 sm:py-24 bg-stone-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealSection>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Välkommen till oss!
            </h2>
            <p className="text-stone-300 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Vi finns på Lugna gatan 2 i Malmö. Öppet alla dagar 08:00–22:00.
              Kom förbi och upptäck vårt breda sortiment av färska varor till
              fantastiska priser.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="bg-[#d12c22] hover:bg-red-700 text-white rounded-full px-8 py-3 text-base font-semibold"
              >
                <Link to="/kontakt">
                  Hitta till oss
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-stone-700 text-white hover:bg-stone-800 rounded-full px-8 py-3 text-base font-semibold bg-transparent"
              >
                <Link to="/erbjudanden">Se veckans erbjudanden</Link>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
