import SEO from '../components/SEO';

export default function AllmannaVillkorPage() {
  return (
    <>
      <SEO
        title="Allmänna villkor"
        description="Allmänna villkor för Mathallen 24 Lugnet. Läs om våra köpvillkor, leverans, reklamation och ångerrätt."
        url="/allmanna-villkor"
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
            Allmänna villkor
          </h1>
          <p className="text-stone-500 mb-10">
            Senast uppdaterad: 2026-03-30
          </p>

          <div className="prose prose-stone max-w-none space-y-8 leading-relaxed text-stone-700">
            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">1. Allmänt</h2>
              <p>
                Dessa allmänna villkor gäller för köp i butiken Mathallen 24 Lugnet, organisationsnamn
                Mathallen 24 Lugnet, med adress Lugna gatan 2, 211 60 Malmö. Genom att handla hos oss
                godkänner du dessa villkor.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">2. Priser och betalning</h2>
              <p>
                Alla priser anges i svenska kronor (SEK) inklusive moms. Vi förbehåller oss rätten att
                ändra priser utan förvarning. Kampanjpriser gäller under den angivna kampanjperioden
                eller så länge lagret räcker. Betalning sker i butiken vid köptillfället med de
                betalningsmetoder vi erbjuder, inklusive kontant, kort och Swish.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">3. Erbjudanden och kampanjer</h2>
              <p>
                Erbjudanden och kampanjer gäller under angiven period eller så länge lagret räcker.
                Vi förbehåller oss rätten att begränsa antal per kund vid kampanjvaror. Erbjudanden
                kan inte kombineras med andra rabatter om inget annat anges. Eventuella tryckfel i
                erbjudanden och annonser reserveras.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">4. Reklamation</h2>
              <p>
                Om du har köpt en vara som är felaktig eller skadad har du rätt att reklamera varan.
                Reklamation ska göras inom skälig tid efter att felet upptäckts. Ta med kvittot och
                den felaktiga varan till butiken. Vi åtgärdar felet genom att erbjuda byte, prisavdrag
                eller återbetalning i enlighet med konsumentköplagen (2022:260).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">5. Returnering av livsmedel</h2>
              <p>
                Livsmedel och andra färskvaror kan av hygienskäl inte returneras eller bytas om de
                inte är felaktiga vid köptillfället. Ångerrätt gäller inte för färskvaror och
                livsmedel med kort hållbarhet i enlighet med gällande lagstiftning.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">6. Ansvarsbegränsning</h2>
              <p>
                Mathallen 24 Lugnet ansvarar inte för indirekta skador eller förluster som kan uppstå
                i samband med användning av våra produkter utöver vad som följer av tvingande lag.
                Vi ansvarar inte för tillfälliga avbrott på vår webbplats eller för tekniska problem
                som påverkar tillgängligheten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">7. Immateriella rättigheter</h2>
              <p>
                Allt innehåll på webbplatsen mathallen24.nu, inklusive text, bilder, logotyper och
                grafik, är skyddat av upphovsrättslagen och tillhör Mathallen 24 Lugnet. Kopiering,
                distribution eller annan användning utan skriftligt tillstånd är förbjudet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">8. Tvistlösning</h2>
              <p>
                Tvister som uppstår i anledning av dessa villkor ska i första hand lösas genom
                överenskommelse mellan parterna. Om parterna inte kan enas kan tvisten prövas av
                Allmänna reklamationsnämnden (ARN), Box 174, 101 23 Stockholm,{' '}
                <a href="https://www.arn.se" className="text-red-600 hover:text-red-700 underline" target="_blank" rel="noopener noreferrer">
                  www.arn.se
                </a>
                . Tvisten kan även prövas av allmän domstol.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">9. Ändringar av villkor</h2>
              <p>
                Mathallen 24 Lugnet förbehåller sig rätten att när som helst ändra dessa villkor.
                Eventuella ändringar publiceras på denna sida. Det är kundens ansvar att regelbundet
                ta del av de senaste villkoren.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-3">10. Kontakt</h2>
              <p>
                Vid frågor om dessa allmänna villkor är du välkommen att kontakta oss:
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
