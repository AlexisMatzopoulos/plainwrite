
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header  />
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4 mt-10 mb-10">
      <h1 className="text-4xl font-extrabold">Datenschutzerklärung</h1>
      <div className="max-w-4xl">
        <p className="text-sm text-gray-500">
          Zuletzt aktualisiert <time dateTime="2025-08-17">17.08.2025</time>
        </p>
      </div>

      <main className="max-w-4xl space-y-8">
        <section className="space-y-4">
          <p>
            EchtSchreib („wir", „uns" oder „unser") betreibt die EchtSchreib-Website und -Dienste (die „Dienste").
            Diese Datenschutzerklärung beschreibt, wie wir Informationen über dich sammeln, verwenden und weitergeben,
            wenn du unsere Dienste nutzt.
          </p>
          <p>
            Bitte lies diese Richtlinie sorgfältig durch. Durch den Zugriff auf oder die Nutzung unserer Dienste
            stimmst du dieser Datenschutzerklärung zu. Wenn du nicht einverstanden bist, nutze bitte unsere Dienste nicht.
          </p>
        </section>

        <nav className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Inhaltsverzeichnis</h2>
          <ul className="list-decimal list-inside space-y-1 text-sm">
            <li>
              <a href="#info-we-collect" className="text-blue-600 hover:underline">
                Welche Informationen wir sammeln
              </a>
            </li>
            <li>
              <a href="#how-we-use-info" className="text-blue-600 hover:underline">
                Wie wir deine Informationen verwenden
              </a>
            </li>
            <li>
              <a href="#sharing-info" className="text-blue-600 hover:underline">
                Weitergabe deiner Informationen
              </a>
            </li>
            <li>
              <a href="#cookies" className="text-blue-600 hover:underline">
                Cookies und Tracking
              </a>
            </li>
            <li>
              <a href="#third-party" className="text-blue-600 hover:underline">
                Links zu Drittanbietern
              </a>
            </li>
            <li>
              <a href="#security" className="text-blue-600 hover:underline">
                Sicherheit
              </a>
            </li>
            <li>
              <a href="#your-choices" className="text-blue-600 hover:underline">
                Deine Wahlmöglichkeiten
              </a>
            </li>
            <li>
              <a href="#children" className="text-blue-600 hover:underline">
                Privatsphäre von Kindern
              </a>
            </li>
            <li>
              <a href="#international" className="text-blue-600 hover:underline">
                Internationale Übertragungen
              </a>
            </li>
            <li>
              <a href="#changes" className="text-blue-600 hover:underline">
                Änderungen dieser Richtlinie
              </a>
            </li>
            <li>
              <a href="#marketing-communications" className="text-blue-600 hover:underline">
                Marketing-Kommunikation
              </a>
            </li>
            <li>
              <a href="#contact-us" className="text-blue-600 hover:underline">
                Kontaktiere uns
              </a>
            </li>
          </ul>
        </nav>

        <section id="info-we-collect" className="space-y-4">
          <h2 className="text-2xl font-bold">1. Welche Informationen wir sammeln</h2>
          <p>Wir sammeln Informationen, die du direkt bereitstellst:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              <span className="font-semibold">Kontoinformationen:</span> Name, E-Mail-Adresse und Passwort bei der Registrierung.
            </li>
            <li>
              <span className="font-semibold">Nutzungsdaten:</span> Inhalte, die du zur Verarbeitung einreichst
              (z. B. Text, den du überprüfst oder umwandelst).
            </li>
            <li>
              <span className="font-semibold">Kommunikation:</span> Alle Nachrichten, die du über Support- oder Feedback-Formulare sendest.
            </li>
          </ul>
          <p>Wir sammeln auch automatisch bestimmte Informationen:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              <span className="font-semibold">Geräte- und Browser-Daten:</span> IP-Adresse, Browser-Typ,
              Betriebssystem und Geräte-IDs.
            </li>
            <li>
              <span className="font-semibold">Nutzungsmetriken:</span> Besuchte Seiten, verwendete Funktionen und verbrachte Zeit.
            </li>
          </ul>
        </section>

        <section id="how-we-use-info" className="space-y-4">
          <h2 className="text-2xl font-bold">2. Wie wir deine Informationen verwenden</h2>
          <ul className="list-decimal list-inside ml-4 space-y-2">
            <li>
              <span className="font-semibold">Um Dienste bereitzustellen und zu pflegen:</span> Deine Anfragen verarbeiten
              und Funktionen bereitstellen.
            </li>
            <li>
              <span className="font-semibold">Um unsere Dienste zu verbessern:</span> Nutzung und Leistung analysieren,
              um das Benutzererlebnis zu optimieren.
            </li>
            <li>
              <span className="font-semibold">Zur Kommunikation:</span> Service-Ankündigungen, Updates und Sicherheitswarnungen senden.
            </li>
            <li>
              <span className="font-semibold">Zur Einhaltung:</span> Unsere Nutzungsbedingungen durchsetzen und gesetzlichen
              Verpflichtungen nachkommen.
            </li>
          </ul>
        </section>

        <section id="sharing-info" className="space-y-4">
          <h2 className="text-2xl font-bold">3. Weitergabe deiner Informationen</h2>
          <p>Wir verkaufen deine persönlichen Daten nicht. Wir können Informationen weitergeben an:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              <span className="font-semibold">Dienstleister:</span> Dritte, die Dienstleistungen erbringen
              (z. B. Hosting, Analytics) im Rahmen von Vertraulichkeitsvereinbarungen.
            </li>
            <li>
              <span className="font-semibold">Gesetzliche Anforderungen:</span> Wenn gesetzlich vorgeschrieben oder zum Schutz
              von Rechten, Sicherheit oder Eigentum erforderlich.
            </li>
            <li>
              <span className="font-semibold">Geschäftsübertragungen:</span> Im Zusammenhang mit einer Fusion, Übernahme oder
              dem Verkauf von Vermögenswerten.
            </li>
          </ul>
        </section>

        <section id="cookies" className="space-y-4">
          <h2 className="text-2xl font-bold">4. Cookies und Tracking</h2>
          <p>
            Wir und unsere Partner verwenden Cookies und ähnliche Technologien, um Informationen über deine Aktivitäten
            und Präferenzen zu sammeln. Du kannst Cookies über deine Browser-Einstellungen steuern; das Deaktivieren
            von Cookies kann jedoch die Funktionalität einschränken.
          </p>
        </section>

        <section id="third-party" className="space-y-4">
          <h2 className="text-2xl font-bold">5. Links zu Drittanbietern</h2>
          <p>
            Unsere Dienste können Links zu Websites Dritter enthalten. Wir sind nicht für deren Datenschutzpraktiken
            verantwortlich. Der Besuch dieser Websites erfolgt auf eigenes Risiko.
          </p>
        </section>

        <section id="security" className="space-y-4">
          <h2 className="text-2xl font-bold">6. Sicherheit</h2>
          <p>
            Wir implementieren branchenübliche Maßnahmen zum Schutz deiner Informationen. Keine Übertragungsmethode
            oder Speicherung ist jedoch zu 100 % sicher. Wir können absolute Sicherheit nicht garantieren.
          </p>
        </section>

        <section id="your-choices" className="space-y-4">
          <h2 className="text-2xl font-bold">7. Deine Wahlmöglichkeiten</h2>
          <ul className="list-decimal list-inside ml-4 space-y-2">
            <li>
              Du kannst deine Kontoinformationen in deinen Kontoeinstellungen aufrufen, aktualisieren oder löschen.
            </li>
            <li>
              Du kannst dich von Marketing-E-Mails über den Link in diesen E-Mails abmelden. Wesentliche Service-E-Mails
              können nicht abbestellt werden.
            </li>
            <li>
              Du kannst Cookies in deinem Browser deaktivieren, obwohl einige Funktionen möglicherweise nicht funktionieren.
            </li>
          </ul>
        </section>

        <section id="children" className="space-y-4">
          <h2 className="text-2xl font-bold">8. Privatsphäre von Kindern</h2>
          <p>
            Unsere Dienste richten sich nicht an Kinder unter 18 Jahren. Wir sammeln wissentlich keine personenbezogenen
            Daten von Minderjährigen. Wenn du glaubst, dass wir dies getan haben, kontaktiere uns bitte und wir werden
            sie löschen.
          </p>
        </section>

        <section id="international" className="space-y-4">
          <h2 className="text-2xl font-bold">9. Internationale Übertragungen</h2>
          <p>
            Deine Informationen können in Länder außerhalb deines Wohnsitzes übertragen und dort verarbeitet werden,
            einschließlich der Vereinigten Staaten. Diese Länder können unterschiedliche Datenschutzgesetze haben.
            Durch die Nutzung unserer Dienste stimmst du solchen Übertragungen zu.
          </p>
        </section>

        <section id="changes" className="space-y-4">
          <h2 className="text-2xl font-bold">10. Änderungen dieser Richtlinie</h2>
          <p>
            Wir können diese Datenschutzerklärung aktualisieren. Wir werden das aktualisierte Datum oben veröffentlichen.
            Die fortgesetzte Nutzung nach Änderungen stellt eine Zustimmung dar. Wir empfehlen dir, diese Richtlinie
            regelmäßig zu überprüfen.
          </p>
        </section>

        <section id="marketing-communications" className="space-y-4">
          <h2 className="text-2xl font-bold">11. Marketing-Kommunikation</h2>
          <p>
            Durch das Erstellen eines Kontos oder die Angabe deiner E-Mail-Adresse stimmst du dem Erhalt von
            Marketing-Mitteilungen von EchtSchreib zu, einschließlich Newsletter, Werbeaktionen und Produkt-Updates.
          </p>
          <p>
            Du kannst diese Mitteilungen jederzeit abbestellen, indem du auf den Link „Abmelden" in einer Marketing-E-Mail
            klickst oder uns unter{' '}
            <a href="mailto:echtschreib@gmail.com" className="text-blue-600 hover:underline">
              echtschreib@gmail.com
            </a>{' '}
            kontaktierst. Bitte beachte, dass du weiterhin wesentliche servicebezogene E-Mails erhältst,
            die für den Betrieb deines Kontos erforderlich sind.
          </p>
        </section>

        <section id="contact-us" className="space-y-4">
          <h2 className="text-2xl font-bold">12. Kontaktiere uns</h2>
          <p>
            Wenn du Fragen oder Bedenken zu dieser Datenschutzerklärung hast, kontaktiere uns bitte unter{' '}
            <a href="mailto:echtschreib@gmail.com" className="text-blue-600 hover:underline">
              echtschreib@gmail.com
            </a>
            .
          </p>
        </section>
      </main>

        <div className="max-w-4xl text-sm text-gray-500 space-y-1 mb-4 mt-4">
          <p>EchtSchreib</p>
          <p>
            Diese Richtlinie ist ab dem oben genannten Datum wirksam und bildet einen Teil unserer Nutzungsbedingungen.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
