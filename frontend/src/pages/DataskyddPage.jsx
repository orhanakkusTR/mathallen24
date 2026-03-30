import SEO from '../components/SEO';

export default function DataskyddPage() {
  return (
    <>
      <SEO
        title="Dataskydd"
        description="Information om hur Mathallen 24 Lugnet hanterar dina personuppgifter i enlighet med GDPR och dataskyddsförordningen."
        url="/dataskydd"
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
            Dataskydd
          </h1>
          <p className="text-stone-500 mb-10">
            Senast uppdaterad: 2026-03-30
          </p>

          <div className="prose prose-stone max-w-none space-y-8 leading-relaxed text-stone-700">
            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">1. Personuppgiftsansvarig</h2>
              <p>
                Mathallen 24 Lugnet, med adress Lugna gatan 2, 211 60 Malmö, är personuppgiftsansvarig
                för behandlingen av dina personuppgifter i enlighet med EU:s dataskyddsförordning
                (GDPR, förordning 2016/679).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">2. Vilka personuppgifter samlar vi in?</h2>
              <p>Vi kan samla in och behandla följande personuppgifter:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Kontaktuppgifter:</strong> Namn, e-postadress och telefonnummer som du lämnar via vårt kontaktformulär.</li>
                <li><strong>Nyhetsbrev:</strong> E-postadress som du anger vid prenumeration på vårt nyhetsbrev.</li>
                <li><strong>Tekniska data:</strong> IP-adress, webbläsartyp, enhetsinformation och besöksstatistik som samlas in automatiskt via cookies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">3. Ändamål och rättslig grund</h2>
              <p>Vi behandlar dina personuppgifter för följande ändamål:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Besvara förfrågningar</strong> (rättslig grund: berättigat intresse) -- när du
                  kontaktar oss via kontaktformuläret behandlar vi dina uppgifter för att kunna besvara
                  din förfrågan.
                </li>
                <li>
                  <strong>Skicka nyhetsbrev</strong> (rättslig grund: samtycke) -- om du prenumererar på
                  vårt nyhetsbrev behandlar vi din e-postadress för att skicka information om erbjudanden
                  och nyheter.
                </li>
                <li>
                  <strong>Förbättra webbplatsen</strong> (rättslig grund: berättigat intresse) -- vi
                  använder tekniska data för att förbättra webbplatsens funktionalitet och användarupplevelse.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">4. Lagringstid</h2>
              <p>
                Vi lagrar dina personuppgifter bara så länge det är nödvändigt för det ändamål de
                samlades in för:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Kontaktmeddelanden:</strong> Sparas i upp till 12 månader efter att ärendet avslutats.</li>
                <li><strong>Nyhetsbrevsprenumerationer:</strong> Sparas tills du avregistrerar dig.</li>
                <li><strong>Tekniska data (cookies):</strong> Se vår cookiepolicy för specifika lagringstider.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">5. Dina rättigheter</h2>
              <p>Enligt GDPR har du följande rättigheter:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Rätt till tillgång:</strong> Du har rätt att begära ett utdrag av de personuppgifter vi behandlar om dig.</li>
                <li><strong>Rätt till rättelse:</strong> Du har rätt att begära att felaktiga uppgifter rättas.</li>
                <li><strong>Rätt till radering:</strong> Du har rätt att begära att dina uppgifter raderas ("rätten att bli glömd").</li>
                <li><strong>Rätt till begränsning:</strong> Du har rätt att begära att behandlingen av dina uppgifter begränsas.</li>
                <li><strong>Rätt till dataportabilitet:</strong> Du har rätt att få dina uppgifter i ett maskinläsbart format.</li>
                <li><strong>Rätt att invända:</strong> Du har rätt att invända mot behandling som grundar sig på berättigat intresse.</li>
                <li><strong>Rätt att återkalla samtycke:</strong> Om behandlingen grundar sig på samtycke kan du när som helst återkalla det.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">6. Delning av personuppgifter</h2>
              <p>
                Vi säljer aldrig dina personuppgifter till tredje part. Vi kan dela dina uppgifter med:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Tjänsteleverantörer som hjälper oss att driva webbplatsen och skicka nyhetsbrev (personuppgiftsbiträden).</li>
                <li>Myndigheter om vi är skyldiga att göra det enligt lag.</li>
              </ul>
              <p className="mt-3">
                Alla personuppgiftsbiträden är bundna av avtal som säkerställer att dina uppgifter
                behandlas i enlighet med GDPR.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">7. Säkerhet</h2>
              <p>
                Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina
                personuppgifter mot obehörig åtkomst, förlust eller förstöring. Åtkomst till
                personuppgifter är begränsad till behörig personal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">8. Tillsynsmyndighet</h2>
              <p>
                Om du anser att vi behandlar dina personuppgifter i strid med GDPR har du rätt att
                lämna klagomål till Integritetsskyddsmyndigheten (IMY):
              </p>
              <ul className="list-none space-y-1 mt-3">
                <li><strong>Webbplats:</strong>{' '}
                  <a href="https://www.imy.se" className="text-red-600 hover:text-red-700 underline" target="_blank" rel="noopener noreferrer">
                    www.imy.se
                  </a>
                </li>
                <li><strong>Telefon:</strong> 08-657 61 00</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">9. Kontakt</h2>
              <p>
                Har du frågor om hur vi hanterar dina personuppgifter? Kontakta oss:
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
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
