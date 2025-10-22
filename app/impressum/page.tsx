import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Impressum() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4 mt-10 mb-10">
        <h1 className="text-4xl font-extrabold">Impressum</h1>
        <div className="max-w-4xl">
          <p className="text-sm text-gray-500">
            Angaben gemäß § 5 TMG
          </p>
        </div>

        <main className="max-w-4xl space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Angaben gemäß § 5 TMG</h2>
            <div className="space-y-2">
              <p className="font-semibold">[IHR VOLLSTÄNDIGER NAME]</p>
              <p>[STRAßE UND HAUSNUMMER]</p>
              <p>[POSTLEITZAHL UND ORT]</p>
              <p>[LAND]</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Kontakt</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Telefon:</span> [IHRE TELEFONNUMMER]
              </p>
              <p>
                <span className="font-semibold">E-Mail:</span>{' '}
                <a href="mailto:echtschreib@gmail.com" className="text-blue-600 hover:underline">
                  echtschreib@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Umsatzsteuer-ID</h2>
            <div className="space-y-2">
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              </p>
              <p className="font-semibold">[IHRE USt-IdNr. - z.B. DE123456789]</p>
              <p className="text-sm text-gray-600 mt-2">
                Falls Sie als Kleinunternehmer nach § 19 UStG von der Umsatzsteuer befreit sind,
                können Sie stattdessen schreiben: "Als Kleinunternehmer im Sinne von § 19 Abs. 1
                Umsatzsteuergesetz wird keine Umsatzsteuer berechnet."
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Berufsbezeichnung:</span> [IHRE BERUFSBEZEICHNUNG - z.B. Webdesigner, Berater, etc.]
              </p>
              <p className="text-sm text-gray-600">
                (Nur erforderlich bei reglementierten Berufen wie Rechtsanwalt, Arzt, Architekt, etc.)
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <div className="space-y-2">
              <p>[IHR VOLLSTÄNDIGER NAME]</p>
              <p>[IHRE ADRESSE]</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Haftungsausschluss</h2>

            <h3 className="text-xl font-semibold">Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
              der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>

            <h3 className="text-xl font-semibold mt-4">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
            <p>
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
              inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
              Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
              Links umgehend entfernen.
            </p>

            <h3 className="text-xl font-semibold mt-4">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
              deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
              außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
              Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet.
            </p>
            <p>
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
              Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden
              Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>
        </main>

        <div className="max-w-4xl text-sm text-gray-500 space-y-1 mb-4 mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="font-semibold text-yellow-800">⚠️ Wichtiger Hinweis für Einzelunternehmer:</p>
          <p className="text-yellow-800">
            Bitte ersetzen Sie alle Platzhalter in eckigen Klammern [HIER EINTRAGEN] mit Ihren tatsächlichen
            Informationen. Ein unvollständiges Impressum kann zu Abmahnungen und Bußgeldern bis zu 50.000 EUR führen.
          </p>
          <p className="text-yellow-800 mt-2">
            <span className="font-semibold">Als Einzelunternehmer benötigen Sie KEINE:</span><br />
            • Handelsregisternummer (außer Sie sind im Handelsregister eingetragen)<br />
            • Geschäftsführerangaben<br />
            • Fax-Nummer (ist optional)
          </p>
          <p className="text-yellow-800 mt-2">
            <span className="font-semibold">Sie MÜSSEN angeben:</span><br />
            • Ihren vollständigen Namen (Vor- und Nachname)<br />
            • Ihre vollständige Postadresse (kein Postfach)<br />
            • Telefonnummer und E-Mail-Adresse<br />
            • USt-IdNr. (oder Kleinunternehmer-Status nach § 19 UStG)
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
