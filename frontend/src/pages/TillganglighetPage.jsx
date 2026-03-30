import SEO from '../components/SEO';

export default function TillganglighetPage() {
  return (
    <>
      <SEO
        title="Tillgänglighet"
        description="Tillgänglighetsredogörelse för Mathallen 24 Lugnets webbplats. Vi strävar efter att göra vår webbplats tillgänglig för alla."
        url="/tillganglighet"
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
            Tillgänglighetsredogörelse
          </h1>
          <p className="text-stone-500 mb-10">
            Senast uppdaterad: 2026-03-30
          </p>

          <div className="prose prose-stone max-w-none space-y-8 leading-relaxed text-stone-700">
            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">1. Vårt åtagande</h2>
              <p>
                Mathallen 24 Lugnet strävar efter att göra webbplatsen mathallen24.nu tillgänglig för
                alla besökare, oavsett funktionsvariation. Vi arbetar kontinuerligt med att förbättra
                tillgängligheten på vår webbplats i enlighet med lagen om tillgänglighet till digital
                offentlig service (DOS-lagen) och riktlinjerna i Web Content Accessibility Guidelines
                (WCAG) 2.1 nivå AA.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">2. Tillgänglighetsstatus</h2>
              <p>
                Vi har vidtagit följande åtgärder för att säkerställa tillgängligheten på vår webbplats:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Semantisk HTML:</strong> Vi använder korrekt HTML-struktur med tydliga rubriker, listor och landmärken för att underlätta navigering med hjälpmedel.</li>
                <li><strong>Tangentbordsnavigering:</strong> Alla interaktiva element på webbplatsen kan nås och användas med tangentbord.</li>
                <li><strong>Kontrast:</strong> Vi strävar efter tillräcklig färgkontrast mellan text och bakgrund enligt WCAG 2.1 nivå AA.</li>
                <li><strong>Responsiv design:</strong> Webbplatsen är anpassad för olika skärmstorlekar och enheter.</li>
                <li><strong>Alternativtext:</strong> Bilder på webbplatsen har beskrivande alternativtext.</li>
                <li><strong>Tydliga länkar:</strong> Länktexter är beskrivande och ger kontext om vart de leder.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">3. Kända begränsningar</h2>
              <p>
                Trots våra ansträngningar kan det finnas delar av webbplatsen som inte är fullt
                tillgängliga. Vi är medvetna om följande begränsningar och arbetar med att åtgärda dem:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Vissa produktbilder kan sakna fullständig alternativtext.</li>
                <li>Vissa tredjepartskomponenter kan ha begränsad tillgänglighet.</li>
                <li>PDF-dokument som länkas från webbplatsen kan ha varierande tillgänglighet.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">4. Kompatibilitet</h2>
              <p>
                Webbplatsen är utformad för att vara kompatibel med:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>De senaste versionerna av Chrome, Firefox, Safari och Edge.</li>
                <li>Skärmläsare som JAWS, NVDA och VoiceOver.</li>
                <li>Mobila enheter med iOS och Android.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">5. Tekniska specifikationer</h2>
              <p>
                Webbplatsens tillgänglighet bygger på följande tekniker:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>HTML5</li>
                <li>WAI-ARIA</li>
                <li>CSS</li>
                <li>JavaScript</li>
              </ul>
              <p className="mt-3">
                Dessa tekniker används för att följa WCAG 2.1 och säkerställa kompatibilitet med
                hjälpmedel.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">6. Återkoppling och kontakt</h2>
              <p>
                Vi välkomnar din återkoppling om tillgängligheten på vår webbplats. Om du upplever
                problem med tillgängligheten eller har förslag på förbättringar, vänligen kontakta oss:
              </p>
              <ul className="list-none space-y-1 mt-3">
                <li><strong>Butik:</strong> Mathallen 24 Lugnet</li>
                <li><strong>Adress:</strong> Lugna gatan 2, 211 60 Malmö</li>
                <li>
                  <strong>E-post:</strong>{' '}
                  <a href="mailto:mathallen24@mathallen.nu" className="text-red-600 hover:text-red-700 underline">
                    mathallen24@mathallen.nu
                  </a>
                </li>
              </ul>
              <p className="mt-3">
                Vi försöker besvara tillgänglighetsrelaterade frågor inom 5 arbetsdagar.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">7. Tillsynsmyndighet</h2>
              <p>
                Om du inte är nöjd med hur vi hanterar din återkoppling om tillgängligheten kan du
                vända dig till Myndigheten för digital förvaltning (DIGG):
              </p>
              <ul className="list-none space-y-1 mt-3">
                <li><strong>Webbplats:</strong>{' '}
                  <a href="https://www.digg.se" className="text-red-600 hover:text-red-700 underline" target="_blank" rel="noopener noreferrer">
                    www.digg.se
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
