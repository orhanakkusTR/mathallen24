import SEO from '../components/SEO';

export default function IntegritetspolicyPage() {
  return (
    <>
      <SEO
        title="Integritetspolicy"
        description="Integritetspolicy för Mathallen 24 Lugnet. Läs om hur vi skyddar din integritet och hanterar personuppgifter."
        url="/integritetspolicy"
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
            Integritetspolicy
          </h1>
          <p className="text-stone-500 mb-10">
            Senast uppdaterad: 2026-03-30
          </p>

          <div className="prose prose-stone max-w-none space-y-8 leading-relaxed text-stone-700">
            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">1. Inledning</h2>
              <p>
                Mathallen 24 Lugnet värnar om din personliga integritet. Denna integritetspolicy
                beskriver hur vi samlar in, använder, lagrar och skyddar dina personuppgifter när
                du besöker vår webbplats mathallen24.nu eller handlar i vår butik på Lugna gatan 2,
                211 60 Malmö.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">2. Vilka uppgifter samlar vi in?</h2>

              <h3 className="text-lg font-medium text-stone-800 mt-5 mb-2">2.1 Uppgifter du lämnar till oss</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kontaktformulär:</strong> Namn, e-postadress, telefonnummer och ditt meddelande.</li>
                <li><strong>Nyhetsbrev:</strong> E-postadress för att ta emot våra erbjudanden och nyheter.</li>
              </ul>

              <h3 className="text-lg font-medium text-stone-800 mt-5 mb-2">2.2 Uppgifter som samlas in automatiskt</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies:</strong> Vi använder cookies för att förbättra din upplevelse. Läs mer i vår cookiepolicy.</li>
                <li><strong>Teknisk information:</strong> IP-adress, webbläsare, operativsystem, besökstid och vilka sidor du besöker.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">3. Hur använder vi dina uppgifter?</h2>
              <p>Vi använder dina personuppgifter för att:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Besvara frågor och meddelanden du skickar via kontaktformuläret.</li>
                <li>Skicka nyhetsbrev med erbjudanden och aktuell information (om du har samtyckt).</li>
                <li>Förbättra webbplatsens funktion och innehåll baserat på besöksstatistik.</li>
                <li>Uppfylla rättsliga skyldigheter.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">4. Cookies</h2>
              <p>
                Vår webbplats använder cookies -- små textfiler som lagras på din enhet. Vi använder:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Nödvändiga cookies:</strong> Krävs för att webbplatsen ska fungera korrekt, t.ex. hantering av cookie-samtycke.</li>
                <li><strong>Analyscookies:</strong> Hjälper oss förstå hur besökare använder webbplatsen för att kunna förbättra den.</li>
                <li><strong>Funktionscookies:</strong> Sparar dina preferenser, t.ex. om du har stängt en popup.</li>
              </ul>
              <p className="mt-3">
                Du kan hantera dina cookie-inställningar via din webbläsare. Observera att om du
                blockerar alla cookies kan vissa delar av webbplatsen sluta fungera korrekt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">5. Delning med tredje part</h2>
              <p>
                Vi säljer aldrig dina personuppgifter. Vi kan dock dela uppgifter med:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>IT-leverantörer:</strong> Företag som tillhandahåller hosting och tekniska tjänster för vår webbplats.</li>
                <li><strong>E-posttjänster:</strong> Leverantörer som hjälper oss att skicka nyhetsbrev.</li>
                <li><strong>Myndigheter:</strong> Om vi är skyldiga att lämna ut uppgifter enligt lag.</li>
              </ul>
              <p className="mt-3">
                Alla tredjepartsleverantörer är bundna av personuppgiftsbiträdesavtal och behandlar
                dina uppgifter i enlighet med GDPR.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">6. Lagring och säkerhet</h2>
              <p>
                Dina personuppgifter lagras inom EU/EES. Vi använder lämpliga tekniska och
                organisatoriska säkerhetsåtgärder för att skydda dina uppgifter mot obehörig åtkomst,
                ändring, spridning eller förstöring.
              </p>
              <p className="mt-3">
                Vi sparar dina uppgifter så länge det behövs för att uppfylla ändamålet med
                behandlingen. När uppgifterna inte längre behövs raderas de på ett säkert sätt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">7. Dina rättigheter</h2>
              <p>Du har rätt att:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Få tillgång</strong> till dina personuppgifter (registerutdrag).</li>
                <li><strong>Begära rättelse</strong> av felaktiga eller ofullständiga uppgifter.</li>
                <li><strong>Begära radering</strong> av dina uppgifter.</li>
                <li><strong>Begränsa behandlingen</strong> av dina uppgifter.</li>
                <li><strong>Invända mot behandling</strong> som sker med stöd av berättigat intresse.</li>
                <li><strong>Flytta dina uppgifter</strong> (dataportabilitet) till en annan tjänsteleverantör.</li>
                <li><strong>Återkalla samtycke</strong> som du tidigare gett, t.ex. för nyhetsbrev.</li>
              </ul>
              <p className="mt-3">
                För att utöva dina rättigheter, kontakta oss via uppgifterna nedan. Vi besvarar din
                förfrågan inom 30 dagar.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">8. Nyhetsbrev</h2>
              <p>
                Om du prenumererar på vårt nyhetsbrev sparar vi din e-postadress för att kunna skicka
                erbjudanden och information. Du kan när som helst avregistrera dig genom att klicka på
                avregistreringslänken i nyhetsbrevet eller genom att kontakta oss. Efter avregistrering
                raderas din e-postadress från vår sändlista.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">9. Ändringar i policyn</h2>
              <p>
                Vi kan uppdatera denna integritetspolicy vid behov. Vid väsentliga ändringar
                informerar vi dig via webbplatsen. Vi rekommenderar att du regelbundet läser igenom
                policyn.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">10. Kontakt</h2>
              <p>
                Har du frågor om vår integritetspolicy eller vill utöva dina rättigheter? Kontakta oss:
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
              <p className="mt-4">
                Du har även rätt att lämna klagomål till{' '}
                <a href="https://www.imy.se" className="text-red-600 hover:text-red-700 underline" target="_blank" rel="noopener noreferrer">
                  Integritetsskyddsmyndigheten (IMY)
                </a>
                {' '}om du anser att vi behandlar dina personuppgifter felaktigt.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
