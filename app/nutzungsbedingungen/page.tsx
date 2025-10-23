
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsOfService() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header  />
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4 mt-10 mb-10">
      <h1 className="text-4xl font-extrabold">Nutzungsbedingungen</h1>
      <div className="max-w-4xl">
        <p className="text-sm text-gray-500">
          Zuletzt aktualisiert <time dateTime="2025-08-17">17.08.2025</time>
        </p>
      </div>

      <main className="max-w-4xl space-y-8">
        <section className="space-y-4">
          <p>
            Diese Nutzungsbedingungen werden zwischen dir („du" oder „dein") und EchtSchreib („Unternehmen", „wir",
            „uns" oder „unser") geschlossen. Diese rechtlichen Bedingungen regeln deinen Zugriff auf und deine Nutzung
            unserer Website und aller damit verbundenen Produkte oder Dienstleistungen, die von EchtSchreib bereitgestellt
            werden (zusammen die „Dienste"). Durch den Zugriff auf oder die Nutzung unserer Dienste erklärst du, dass du
            diese rechtlichen Bedingungen gelesen, verstanden und akzeptiert hast.
          </p>
          <p>
            Wenn du nicht mit allen diesen rechtlichen Bedingungen einverstanden bist, ist es dir ausdrücklich untersagt,
            unsere Dienste zu nutzen, und du musst die Nutzung sofort einstellen.
          </p>
          <p>
            Ergänzende Bedingungen oder zusätzliche Dokumente, die wir von Zeit zu Zeit veröffentlichen, werden hiermit
            durch Verweis in diese rechtlichen Bedingungen aufgenommen. Wir behalten uns das Recht vor, nach unserem
            alleinigen Ermessen jederzeit Änderungen oder Modifikationen an diesen rechtlichen Bedingungen ohne vorherige
            Ankündigung vorzunehmen. Das Datum „Zuletzt aktualisiert" oben spiegelt solche Änderungen wider.
          </p>
          <p>
            Es liegt in deiner Verantwortung, diese rechtlichen Bedingungen regelmäßig zu überprüfen, und deine fortgesetzte
            Nutzung unserer Dienste nach vorgenommenen Änderungen stellt deine Zustimmung zu den überarbeiteten Bedingungen dar.
          </p>
          <p>
            Die Dienste sind für Nutzer bestimmt, die mindestens 18 Jahre alt sind. Personen unter 18 Jahren ist die Nutzung
            oder Registrierung für unsere Dienste nicht gestattet.
          </p>
          <p className="italic text-gray-600">
            Es wird empfohlen, dass du eine Kopie dieser rechtlichen Bedingungen für deine Unterlagen ausdruckst.
          </p>
        </section>

        <nav className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Inhaltsverzeichnis</h2>
          <ul className="list-decimal list-inside space-y-1 text-sm">
            <li>
              <a href="#our-services" className="text-blue-600 hover:underline">
                UNSERE DIENSTE
              </a>
            </li>
            <li>
              <a href="#intellectual-property" className="text-blue-600 hover:underline">
                GEISTIGE EIGENTUMSRECHTE
              </a>
            </li>
            <li>
              <a href="#user-representations" className="text-blue-600 hover:underline">
                NUTZERVERTRETUNGEN
              </a>
            </li>
            <li>
              <a href="#user-registration" className="text-blue-600 hover:underline">
                NUTZERREGISTRIERUNG
              </a>
            </li>
            <li>
              <a href="#purchases-payment" className="text-blue-600 hover:underline">
                KÄUFE UND ZAHLUNG
              </a>
            </li>
            <li>
              <a href="#cancellation" className="text-blue-600 hover:underline">
                KÜNDIGUNG
              </a>
            </li>
            <li>
              <a href="#subscription-term" className="text-blue-600 hover:underline">
                ABONNEMENTLAUFZEIT UND BEENDIGUNG
              </a>
            </li>
            <li>
              <a href="#prohibited-activities" className="text-blue-600 hover:underline">
                VERBOTENE AKTIVITÄTEN
              </a>
            </li>
            <li>
              <a href="#user-generated" className="text-blue-600 hover:underline">
                VON NUTZERN ERSTELLTE BEITRÄGE
              </a>
            </li>
            <li>
              <a href="#contribution-license" className="text-blue-600 hover:underline">
                BEITRAGSLIZENZ
              </a>
            </li>
            <li>
              <a href="#third-party" className="text-blue-600 hover:underline">
                DRITTANBIETER-WEBSITES UND INHALTE
              </a>
            </li>
            <li>
              <a href="#advertisers" className="text-blue-600 hover:underline">
                WERBETREIBENDE
              </a>
            </li>
            <li>
              <a href="#services-management" className="text-blue-600 hover:underline">
                DIENSTVERWALTUNG
              </a>
            </li>
            <li>
              <a href="#privacy-policy" className="text-blue-600 hover:underline">
                DATENSCHUTZERKLÄRUNG
              </a>
            </li>
            <li>
              <a href="#copyright" className="text-blue-600 hover:underline">
                URHEBERRECHTSVERLETZUNGEN
              </a>
            </li>
            <li>
              <a href="#term-termination" className="text-blue-600 hover:underline">
                LAUFZEIT UND BEENDIGUNG
              </a>
            </li>
            <li>
              <a href="#modifications" className="text-blue-600 hover:underline">
                ÄNDERUNGEN UND UNTERBRECHUNGEN
              </a>
            </li>
            <li>
              <a href="#governing-law" className="text-blue-600 hover:underline">
                ANWENDBARES RECHT
              </a>
            </li>
            <li>
              <a href="#dispute-resolution" className="text-blue-600 hover:underline">
                STREITBEILEGUNG
              </a>
            </li>
            <li>
              <a href="#corrections" className="text-blue-600 hover:underline">
                KORREKTUREN
              </a>
            </li>
            <li>
              <a href="#disclaimer" className="text-blue-600 hover:underline">
                HAFTUNGSAUSSCHLUSS
              </a>
            </li>
            <li>
              <a href="#limitations" className="text-blue-600 hover:underline">
                HAFTUNGSBESCHRÄNKUNGEN
              </a>
            </li>
            <li>
              <a href="#indemnification" className="text-blue-600 hover:underline">
                SCHADLOSHALTUNG
              </a>
            </li>
            <li>
              <a href="#user-data" className="text-blue-600 hover:underline">
                NUTZERDATEN
              </a>
            </li>
            <li>
              <a href="#electronic" className="text-blue-600 hover:underline">
                ELEKTRONISCHE KOMMUNIKATION, TRANSAKTIONEN UND SIGNATUREN
              </a>
            </li>
            <li>
              <a href="#california" className="text-blue-600 hover:underline">
                KALIFORNISCHE NUTZER UND EINWOHNER
              </a>
            </li>
            <li>
              <a href="#miscellaneous" className="text-blue-600 hover:underline">
                VERSCHIEDENES
              </a>
            </li>
            <li>
              <a href="#refunds" className="text-blue-600 hover:underline">
                RÜCKERSTATTUNGEN
              </a>
            </li>
            <li>
              <a href="#marketing-communications" className="text-blue-600 hover:underline">
                MARKETING-KOMMUNIKATION
              </a>
            </li>
            <li>
              <a href="#contact-us" className="text-blue-600 hover:underline">
                KONTAKTIERE UNS
              </a>
            </li>
          </ul>
        </nav>

        <section id="our-services" className="space-y-4">
          <h2 className="text-2xl font-bold">1. UNSERE DIENSTE</h2>
          <p>
            Die bei der Nutzung unserer Dienste bereitgestellten Informationen sind nicht für die Verbreitung oder
            Nutzung durch Personen oder Organisationen in Rechtsordnungen bestimmt, in denen eine solche Verbreitung
            oder Nutzung gegen geltendes Recht oder Vorschriften verstößt. Diejenigen, die von Orten aus auf unsere
            Dienste zugreifen, an denen lokale Gesetze abweichen, tun dies auf eigene Initiative und sind allein für
            die Einhaltung der lokalen Gesetze verantwortlich.
          </p>
          <p>
            Die Dienste sind nicht speziell darauf ausgelegt, branchenspezifische Vorschriften einzuhalten (z. B. solche,
            die für das Gesundheitswesen oder Finanzdienstleistungen gelten); wenn deine Interaktionen solchen Gesetzen
            unterliegen würden, darfst du die Dienste nicht nutzen.
          </p>
        </section>

        <section id="intellectual-property" className="space-y-4">
          <h2 className="text-2xl font-bold">2. GEISTIGE EIGENTUMSRECHTE</h2>
          <p>
            Wir sind der Eigentümer oder Lizenznehmer aller geistigen Eigentumsrechte an unseren Diensten, einschließlich
            aller Quellcodes, Datenbanken, Software, Website-Designs, Audio, Video, Text, Fotos und Grafiken (zusammen der
            „Inhalt") sowie der Marken, Dienstleistungsmarken und Logos (die „Marken"). Unser Inhalt und unsere Marken
            sind weltweit durch Urheberrechts-, Marken- und andere anwendbare Gesetze zum Schutz geistigen Eigentums geschützt.
          </p>
          <p>
            Vorbehaltlich deiner Einhaltung dieser rechtlichen Bedingungen gewähren wir dir eine beschränkte, nicht-exklusive,
            nicht übertragbare, widerrufliche Lizenz zum Zugriff auf unsere Dienste und zum Herunterladen oder Drucken einer
            Kopie eines Teils des Inhalts, auf den du rechtmäßig Zugriff erhalten hast, ausschließlich für deine persönliche,
            nicht-kommerzielle Nutzung oder interne Geschäftszwecke. Kein Teil der Dienste, des Inhalts oder der Marken darf
            zu kommerziellen Zwecken kopiert, reproduziert, übertragen oder anderweitig ausgebeutet werden ohne unsere
            ausdrückliche vorherige schriftliche Zustimmung.
          </p>
          <p>
            Die unbefugte Nutzung von Inhalten oder Marken stellt einen wesentlichen Verstoß gegen diese rechtlichen
            Bedingungen dar und kann zur sofortigen Beendigung deines Rechts zur Nutzung unserer Dienste führen.
          </p>
        </section>

        <section id="user-representations" className="space-y-4">
          <h2 className="text-2xl font-bold">3. NUTZERVERTRETUNGEN</h2>
          <ul className="list-decimal list-inside ml-4 space-y-2">
            <li>
              Alle Informationen, die bei der Registrierung oder durch die Nutzung der Dienste bereitgestellt werden,
              sind wahr, genau, aktuell und vollständig.
            </li>
            <li>Du wirst solche Informationen bei Bedarf pflegen und umgehend aktualisieren.</li>
            <li>Du hast die rechtliche Befugnis und stimmst zu, diese rechtlichen Bedingungen einzuhalten.</li>
            <li>Du bist kein Minderjähriger in deiner Gerichtsbarkeit.</li>
            <li>Du wirst keine automatisierten oder nicht-menschlichen Methoden verwenden, um auf die Dienste zuzugreifen.</li>
            <li>
              Deine Nutzung der Dienste erfolgt nur zu rechtmäßigen Zwecken und verstößt nicht gegen geltendes Recht oder
              geltende Vorschriften.
            </li>
          </ul>
          <p>
            Wenn die von dir bereitgestellten Informationen unwahr, ungenau oder unvollständig sind, behalten wir uns das
            Recht vor, dein Konto auszusetzen oder zu kündigen und jede aktuelle oder zukünftige Nutzung unserer Dienste
            zu verweigern.
          </p>
        </section>

        <section id="user-registration" className="space-y-4">
          <h2 className="text-2xl font-bold">4. NUTZERREGISTRIERUNG</h2>
          <p>
            Eine Registrierung kann erforderlich sein, um auf bestimmte Dienste zuzugreifen. Du bist für die Sicherung
            deines Passworts und für alle Aktivitäten verantwortlich, die unter deinem Konto stattfinden. Wir behalten
            uns das Recht vor, jeden von dir gewählten Benutzernamen zu entfernen, zurückzufordern oder zu ändern, wenn
            wir nach unserem alleinigen Ermessen der Ansicht sind, dass der Benutzername unangemessen, obszön oder
            anstößig ist.
          </p>
        </section>

        <section id="purchases-payment" className="space-y-4">
          <h2 className="text-2xl font-bold">5. KÄUFE UND ZAHLUNG</h2>
          <p>
            Für alle über die Dienste getätigten Transaktionen stimmst du zu, aktuelle, vollständige und genaue Kauf- und
            Kontoinformationen bereitzustellen. Du stimmst ferner zu, deine Konto- und Zahlungsinformationen, wie
            E-Mail-Adresse und Kartendetails, zu aktualisieren, um sicherzustellen, dass Transaktionen verarbeitet werden
            können und wir dich bei Bedarf kontaktieren können. Alle Zahlungen erfolgen in der zum Zeitpunkt des Kaufs
            angegebenen Währung. Die Umsatzsteuer kann von uns hinzugefügt werden, wie es erforderlich ist. Die Preise
            können sich jederzeit ändern.
          </p>
          <p>
            Du ermächtigst uns, deinem Zahlungsanbieter alle Gebühren in Rechnung zu stellen, die zu den zu diesem
            Zeitpunkt gültigen Preisen anfallen. Bei Abonnements mit wiederkehrenden Gebühren stimmst du solchen Gebühren
            zu, bis du das Abonnement gemäß diesen Bedingungen kündigst. Wir behalten uns das Recht vor, alle Preisfehler
            zu korrigieren, auch nachdem die Zahlung verarbeitet wurde.
          </p>
        </section>

        <section id="cancellation" className="space-y-4">
          <h2 className="text-2xl font-bold">6. KÜNDIGUNG</h2>
          <p>
            Alle über unsere Dienste getätigten Käufe sind nicht erstattungsfähig. Du kannst dein Abonnement jederzeit
            kündigen, indem du dich in dein Konto einloggst. Nach der Kündigung verlierst du sofort alle verbleibenden
            Nutzungsguthaben oder zugewiesenen Nutzungen. Eine Rückerstattung von Guthaben oder Zahlungen wird unter
            keinen Umständen gewährt.
          </p>
        </section>

        <section id="subscription-term" className="space-y-4">
          <h2 className="text-2xl font-bold">7. ABONNEMENTLAUFZEIT UND BEENDIGUNG</h2>
          <p>
            Dein Abonnement für unsere Dienste ist nur für den Zeitraum gültig, in dem unser Betrieb aktiv bleibt. Wir
            garantieren nicht, dass dein Abonnement für ein volles Jahr oder für einen bestimmten Zeitraum läuft. Wenn
            EchtSchreib den Betrieb einstellt oder anderweitig nicht in der Lage ist, die Dienste während deiner
            Abonnementlaufzeit bereitzustellen, wird dein Abonnement sofort ohne Rückerstattung beendet.
          </p>
          <p>
            Durch die Nutzung unserer Dienste erkennst du das Risiko an und akzeptierst, dass dein Abonnement vor dem
            ursprünglich bezahlten Zeitraum enden kann.
          </p>
          <p>
            Wenn du zu irgendeinem Zeitpunkt mit unseren Diensten unzufrieden bist, sende uns bitte eine E-Mail an{' '}
            <a href="mailto:echtschreib@gmail.com" className="text-blue-600 hover:underline">
              echtschreib@gmail.com
            </a>
            .
          </p>
        </section>

        <section id="prohibited-activities" className="space-y-4">
          <h2 className="text-2xl font-bold">8. VERBOTENE AKTIVITÄTEN</h2>
          <p>
            Du darfst die Dienste nicht für andere Zwecke verwenden als die von EchtSchreib bereitgestellten. Verbotenes
            Verhalten umfasst unter anderem:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              Systematisches Abrufen von Daten oder Inhalten aus unseren Diensten zur Erstellung, Aggregierung oder
              Erstellung von Datenbanken oder Verzeichnissen ohne unsere schriftliche Zustimmung.
            </li>
            <li>
              Betrug, Täuschung oder Irreführung von EchtSchreib oder anderen Nutzern, einschließlich Versuchen, auf
              sensible Kontoinformationen wie Passwörter zuzugreifen.
            </li>
            <li>Umgehen oder Deaktivieren von Sicherheitsfunktionen unserer Dienste.</li>
            <li>Verunglimpfen oder Schaden an EchtSchreib oder den Diensten verursachen.</li>
            <li>
              Verwenden von Informationen, die über unsere Dienste erhalten wurden, um eine andere Person zu belästigen,
              zu missbrauchen oder zu schaden.
            </li>
            <li>
              Unsachgemäße Nutzung von Support-Diensten oder Einreichung falscher Berichte über Missbrauch oder Fehlverhalten.
            </li>
            <li>Verstoß gegen geltende Gesetze oder Vorschriften durch deine Nutzung der Dienste.</li>
            <li>Einbinden, Verlinken oder anderweitiges Verwenden unserer Dienste auf nicht autorisierte Weise.</li>
            <li>
              Hochladen oder Übertragen von Viren, Malware oder anderen schädlichen Materialien, die die Funktionalität
              der Dienste beeinträchtigen.
            </li>
            <li>
              Automatisierte Nutzung des Systems, wie die Verwendung von Bots, Skripten oder Data-Mining-Tools zur
              Interaktion mit den Diensten ohne Genehmigung.
            </li>
            <li>
              Versuch, Maßnahmen zu umgehen, die entwickelt wurden, um den Zugriff auf die Dienste zu verhindern oder
              einzuschränken oder um geschützte Inhalte zu kopieren.
            </li>
            <li>
              Jede andere Aktivität, die EchtSchreib nach eigenem Ermessen als schädlich, illegal oder unangemessen erachtet.
            </li>
          </ul>
        </section>

        <section id="user-generated" className="space-y-4">
          <h2 className="text-2xl font-bold">9. VON NUTZERN ERSTELLTE BEITRÄGE</h2>
          <p>
            Unsere Dienste können es dir ermöglichen, Inhalte, Kommentare, Bewertungen oder andere Materialien
            („Beiträge") zu veröffentlichen oder einzureichen. Durch das Einreichen von Beiträgen stimmst du Folgendem zu:
          </p>
          <ul className="list-decimal list-inside ml-4 space-y-2">
            <li>Deine Beiträge sind nicht vertraulich und können von EchtSchreib verwendet werden.</li>
            <li>Du bist allein verantwortlich für deine Beiträge und die Folgen ihrer Veröffentlichung.</li>
            <li>
              Beiträge dürfen nicht das geistige Eigentum oder andere Rechte Dritter verletzen.
            </li>
            <li>
              Deine Beiträge dürfen kein Material enthalten, das rechtswidrig, schädlich, verleumderisch, obszön oder
              anderweitig anstößig ist.
            </li>
            <li>
              EchtSchreib behält sich das Recht vor, Beiträge zu entfernen, zu bearbeiten oder zu verlagern, die nach
              seinem alleinigen Ermessen als schädlich oder als Verstoß gegen diese rechtlichen Bedingungen angesehen werden.
            </li>
            <li>
              Du stimmst zu, EchtSchreib für alle Schäden oder Verluste schadlos zu halten, die sich aus deinen Beiträgen ergeben.
            </li>
          </ul>
        </section>

        <section id="contribution-license" className="space-y-4">
          <h2 className="text-2xl font-bold">10. BEITRAGSLIZENZ</h2>
          <p>
            Durch das Veröffentlichen von Beiträgen auf unseren Diensten gewährst du EchtSchreib eine unbeschränkte,
            unbefristete, unwiderrufliche, weltweite, nicht-exklusive, lizenzgebührenfreie, übertragbare Lizenz zur
            Nutzung, Reproduktion, Modifikation, Veröffentlichung, Verbreitung, Übersetzung, Anzeige und Aufführung
            deiner Beiträge in allen Medien und für jeden Zweck, einschließlich kommerzieller Zwecke. Du verzichtest
            auf alle Urheberpersönlichkeitsrechte in Bezug auf deine Beiträge.
          </p>
          <p>
            EchtSchreib beansprucht kein Eigentum an deinen Beiträgen; du behältst das Eigentum, gewährst uns jedoch
            diese umfassende Lizenz.
          </p>
        </section>

        <section id="third-party" className="space-y-4">
          <h2 className="text-2xl font-bold">11. DRITTANBIETER-WEBSITES UND INHALTE</h2>
          <p>
            Unsere Dienste können Links zu Drittanbieter-Websites enthalten oder Inhalte von Drittanbietern anzeigen.
            EchtSchreib kontrolliert oder unterstützt keine Drittanbieter-Websites oder -Inhalte nicht und wir sind nicht
            für deren Genauigkeit, Rechtmäßigkeit oder Inhalt verantwortlich. Alle Interaktionen mit Drittanbieter-Websites
            oder -Diensten erfolgen ausschließlich zwischen dir und dem Drittanbieter. Du erkennst an, dass diese rechtlichen
            Bedingungen keine Drittanbieter-Websites oder -Inhalte mehr regeln, sobald du unsere Dienste verlässt.
          </p>
        </section>

        <section id="advertisers" className="space-y-4">
          <h2 className="text-2xl font-bold">12. WERBETREIBENDE</h2>
          <p>
            Werbetreibende können ihre Anzeigen in unseren Diensten anzeigen. EchtSchreib stellt den Raum für solche
            Anzeigen bereit und hat keine Verantwortung für den Inhalt oder die Praktiken der Werbetreibenden. Deine
            Interaktionen mit Werbetreibenden erfolgen ausschließlich zwischen dir und dem Werbetreibenden.
          </p>
        </section>

        <section id="services-management" className="space-y-4">
          <h2 className="text-2xl font-bold">13. DIENSTVERWALTUNG</h2>
          <p>EchtSchreib behält sich das Recht vor:</p>
          <ul className="list-decimal list-inside ml-4 space-y-2">
            <li>Die Dienste auf Verstöße gegen diese rechtlichen Bedingungen zu überwachen;</li>
            <li>
              Angemessene rechtliche Schritte gegen jeden Nutzer einzuleiten, der gegen diese rechtlichen Bedingungen
              verstößt, einschließlich der Benachrichtigung von Strafverfolgungsbehörden;
            </li>
            <li>
              Den Zugriff auf jeden Teil der Dienste nach unserem alleinigen Ermessen abzulehnen, einzuschränken oder
              zu deaktivieren;
            </li>
            <li>
              Inhalte zu entfernen oder zu deaktivieren, die übermäßig groß sind oder unsere Systeme belasten;
            </li>
            <li>
              Die Dienste anderweitig zu verwalten und zu pflegen, wie es zum Schutz unserer Rechte und zur
              Gewährleistung einer ordnungsgemäßen Funktionsweise erforderlich ist.
            </li>
          </ul>
        </section>

        <section id="privacy-policy" className="space-y-4">
          <h2 className="text-2xl font-bold">14. DATENSCHUTZERKLÄRUNG</h2>
          <p>
            Deine Privatsphäre ist uns wichtig. Bitte lies unsere Datenschutzerklärung, die beschreibt, wie wir deine
            Informationen sammeln, verwenden, speichern und weitergeben. Durch die Nutzung unserer Dienste stimmst du zu,
            dass unsere Datenschutzerklärung unsere Nutzung deiner persönlichen Daten regelt. Alle Datenverarbeitungen
            erfolgen im Einklang mit den geltenden Datenschutzgesetzen.
          </p>
        </section>

        <section id="copyright" className="space-y-4">
          <h2 className="text-2xl font-bold">15. URHEBERRECHTSVERLETZUNGEN</h2>
          <p>
            Wir respektieren die geistigen Eigentumsrechte anderer. Wenn du glaubst, dass durch unsere Dienste
            bereitgestelltes Material ein Urheberrecht verletzt, das du besitzt oder kontrollierst, benachrichtige uns
            bitte unverzüglich unter Verwendung der unten angegebenen Kontaktinformationen. Jede Benachrichtigung muss
            ausreichende Details enthalten, damit wir die angebliche Verletzung bewerten können. Bitte beachte, dass du
            nach geltendem Recht für Schäden haftbar gemacht werden kannst, wenn du falsche Angaben zu einem
            Verletzungsanspruch machst.
          </p>
        </section>

        <section id="term-termination" className="space-y-4">
          <h2 className="text-2xl font-bold">16. LAUFZEIT UND BEENDIGUNG</h2>
          <p>
            Diese rechtlichen Bedingungen bleiben in vollem Umfang in Kraft, solange du unsere Dienste nutzt. EchtSchreib
            behält sich das Recht vor, nach eigenem Ermessen und ohne Ankündigung oder Haftung den Zugriff zu verweigern
            oder dein Konto zu kündigen, wenn du gegen eine Bestimmung dieser rechtlichen Bedingungen oder gegen
            geltendes Recht oder geltende Vorschriften verstößt. Wenn dein Konto gekündigt wird, ist es dir nicht gestattet,
            unter einem anderen Namen oder im Namen einer anderen Person oder Organisation ein neues Konto zu erstellen.
          </p>
          <p>EchtSchreib kann auch angemessene rechtliche Schritte gegen dich einleiten, wenn dies erforderlich ist.</p>
        </section>

        <section id="modifications" className="space-y-4">
          <h2 className="text-2xl font-bold">17. ÄNDERUNGEN UND UNTERBRECHUNGEN</h2>
          <p>
            EchtSchreib kann die Inhalte der Dienste jederzeit ohne Ankündigung ändern, modifizieren oder entfernen. Wir
            sind nicht verpflichtet, die in unseren Diensten bereitgestellten Informationen zu aktualisieren. Wir
            garantieren nicht, dass unsere Dienste jederzeit verfügbar sind, und wir können von Zeit zu Zeit
            Unterbrechungen, Verzögerungen oder Fehler erleben. Unter keinen Umständen ist EchtSchreib für Verluste,
            Schäden oder Unannehmlichkeiten haftbar, die durch Nichtverfügbarkeit oder Unterbrechung der Dienste verursacht werden.
          </p>
        </section>

        <section id="governing-law" className="space-y-4">
          <h2 className="text-2xl font-bold">18. ANWENDBARES RECHT</h2>
          <p>
            Diese rechtlichen Bedingungen und deine Nutzung der Dienste unterliegen den Gesetzen der Rechtsordnung, in
            der EchtSchreib tätig ist, und werden nach diesen ausgelegt, ohne Rücksicht auf Kollisionsnormen.
          </p>
        </section>

        <section id="dispute-resolution" className="space-y-4">
          <h2 className="text-2xl font-bold">19. STREITBEILEGUNG</h2>
          <p>
            <span className="font-semibold">Informelle Verhandlungen</span>
            <br />
            Bevor ein formelles Streitbeilegungsverfahren eingeleitet wird, stimmst du und EchtSchreib zu, zu versuchen,
            alle Streitigkeiten mindestens dreißig (30) Tage lang informell zu lösen, nachdem eine Partei die andere
            Partei schriftlich benachrichtigt hat.
          </p>
          <p>
            <span className="font-semibold">Verbindliche Schiedsgerichtsbarkeit</span>
            <br />
            Wenn eine Streitigkeit nicht informell beigelegt werden kann, wird jede ungelöste Streitigkeit durch
            verbindliche Schiedsgerichtsbarkeit nach allgemein geltenden Regeln beigelegt. Die Schiedsgerichtsbarkeit
            wird auf individueller Basis durchgeführt, und keine der Parteien darf an einer Sammel-, konsolidierten oder
            repräsentativen Klage teilnehmen. Solltest du ein Sammel- oder repräsentatives Verfahren einleiten oder daran
            teilnehmen, kann EchtSchreib deinen Zugriff auf unsere Dienste sofort beenden. Darüber hinaus muss jeder
            Anspruch innerhalb von zwei (2) Jahren ab dem Datum, an dem die Klagegründe entstanden sind, geltend gemacht
            werden. Sollte ein Teil der Schiedsklausel für ungültig oder nicht durchsetzbar befunden werden, bleibt der
            Rest in vollem Umfang in Kraft.
          </p>
        </section>

        <section id="corrections" className="space-y-4">
          <h2 className="text-2xl font-bold">20. KORREKTUREN</h2>
          <p>
            Es können Fehler, Ungenauigkeiten oder Auslassungen in den über unsere Dienste bereitgestellten Informationen
            vorliegen. EchtSchreib behält sich das Recht vor, Fehler zu korrigieren oder Informationen nach eigenem
            Ermessen ohne vorherige Ankündigung zu aktualisieren.
          </p>
        </section>

        <section id="disclaimer" className="space-y-4">
          <h2 className="text-2xl font-bold">21. HAFTUNGSAUSSCHLUSS</h2>
          <p>
            DIE DIENSTE WERDEN AUF „WIE BESEHEN"- UND „WIE VERFÜGBAR"-BASIS BEREITGESTELLT. DU STIMMST ZU, DASS DEINE
            NUTZUNG DER DIENSTE AUF DEIN EIGENES RISIKO ERFOLGT. IM VOLLSTEN GESETZLICH ZULÄSSIGEN UMFANG LEHNT
            ECHTSCHREIB ALLE GARANTIEN AB, AUSDRÜCKLICH ODER STILLSCHWEIGEND, EINSCHLIESSLICH DER STILLSCHWEIGENDEN
            GARANTIEN DER MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG.
          </p>
          <p>
            ECHTSCHREIB GARANTIERT NICHT, DASS DIE DIENSTE ODER JEGLICHE INHALTE GENAU, VOLLSTÄNDIG ODER UNUNTERBROCHEN
            SIND, UND WIR SIND NICHT VERANTWORTLICH FÜR FEHLER, IRRTÜMER ODER UNGENAUIGKEITEN IM INHALT. JEDES VERTRAUEN
            AUF DIE DIENSTE ERFOLGT AUF DEIN EIGENES RISIKO.
          </p>
        </section>

        <section id="limitations" className="space-y-4">
          <h2 className="text-2xl font-bold">22. HAFTUNGSBESCHRÄNKUNGEN</h2>
          <p>
            IN KEINEM FALL SIND ECHTSCHREIB, SEINE FÜHRUNGSKRÄFTE, MITARBEITER ODER VERTRETER DIR ODER DRITTEN GEGENÜBER
            HAFTBAR FÜR INDIREKTE, ZUFÄLLIGE, BESONDERE, FOLGE- ODER STRAFSCHÄDEN, DIE SICH AUS ODER IM ZUSAMMENHANG MIT
            DEINER NUTZUNG DER DIENSTE ERGEBEN, UNABHÄNGIG DAVON, OB EINE SOLCHE HAFTUNG AUF VERTRAG, UNERLAUBTER HANDLUNG,
            VERSCHULDENSUNABHÄNGIGER HAFTUNG ODER ANDERWEITIG BERUHT, SELBST WENN ECHTSCHREIB AUF DIE MÖGLICHKEIT SOLCHER
            SCHÄDEN HINGEWIESEN WURDE.
          </p>
          <p>
            DEINE GESAMTHAFTUNG, OB IM RAHMEN EINES VERTRAGS, EINER GARANTIE, UNERLAUBTER HANDLUNG ODER ANDERWEITIG, DARF
            DEN VON DIR GEZAHLTEN BETRAG, FALLS VORHANDEN, FÜR DEN ZUGRIFF AUF DIE DIENSTE NICHT ÜBERSCHREITEN. EINIGE
            GESETZE ERLAUBEN DEN AUSSCHLUSS ODER DIE BESCHRÄNKUNG BESTIMMTER SCHÄDEN NICHT, SODASS DIE OBEN GENANNTEN
            BESCHRÄNKUNGEN MÖGLICHERWEISE NICHT FÜR DICH GELTEN.
          </p>
        </section>

        <section id="indemnification" className="space-y-4">
          <h2 className="text-2xl font-bold">23. SCHADLOSHALTUNG</h2>
          <p>
            Du stimmst zu, EchtSchreib, seine Tochtergesellschaften, verbundenen Unternehmen, Führungskräfte, Vertreter
            und Mitarbeiter vor allen Ansprüchen, Verbindlichkeiten, Schäden, Verlusten und Ausgaben (einschließlich
            angemessener Anwaltsgebühren und -kosten) zu verteidigen, schadlos zu halten und freizustellen, die sich aus
            oder in irgendeiner Weise im Zusammenhang mit deinem Zugriff auf oder deiner Nutzung der Dienste, deinen
            Beiträgen, deinem Verstoß gegen diese rechtlichen Bedingungen oder deiner Verletzung der Rechte Dritter ergeben.
          </p>
        </section>

        <section id="user-data" className="space-y-4">
          <h2 className="text-2xl font-bold">24. NUTZERDATEN</h2>
          <p>
            EchtSchreib pflegt Daten, die du über unsere Dienste übermittelst, ausschließlich zur Verwaltung und zum
            Betrieb der Dienste sowie zu Analysezwecken. Während wir regelmäßig routinemäßige Datensicherungen durchführen,
            bist du für alle von dir bereitgestellten Daten verantwortlich. EchtSchreib haftet nicht für Verlust oder
            Beschädigung deiner Daten.
          </p>
        </section>

        <section id="electronic" className="space-y-4">
          <h2 className="text-2xl font-bold">25. ELEKTRONISCHE KOMMUNIKATION, TRANSAKTIONEN UND SIGNATUREN</h2>
          <p>
            Alle Kommunikationen, Transaktionen und Signaturen, die zwischen dir und EchtSchreib elektronisch ausgetauscht
            werden, werden so behandelt, als wären sie schriftlich. Durch die Nutzung unserer Dienste stimmst du zu,
            elektronische Mitteilungen zu erhalten, und du stimmst zu, dass alle derartigen Mitteilungen alle rechtlichen
            Anforderungen erfüllen, dass solche Mitteilungen schriftlich sein müssen.
          </p>
          <p>
            <span className="font-semibold">Marketing und Kommunikation</span>
            <br />
            Durch die Nutzung unserer Dienste stimmst du zu, Marketing-, Abrechnungs- und dienstbezogene Mitteilungen von
            EchtSchreib unter Verwendung der von dir angegebenen E-Mail-Adresse und Kontaktinformationen zu erhalten. Wenn
            du dich von Marketing-Mitteilungen abmelden möchtest, kannst du dies tun, indem du die Anweisungen in diesen
            Mitteilungen befolgst. Bitte beachte, dass das Abmelden von Marketing-Mitteilungen den Erhalt von Abrechnungs-
            oder wesentlichen Dienstmitteilungen nicht beeinflusst.
          </p>
        </section>

        <section id="california" className="space-y-4">
          <h2 className="text-2xl font-bold">26. KALIFORNISCHE NUTZER UND EINWOHNER</h2>
          <p>
            Wenn du ein Einwohner Kaliforniens bist und Bedenken bezüglich ungelöster Probleme mit unseren Diensten hast,
            kannst du die entsprechende Verbraucherunterstützungseinheit kontaktieren, wie sie von den zuständigen
            staatlichen Behörden bereitgestellt wird.
          </p>
        </section>

        <section id="miscellaneous" className="space-y-4">
          <h2 className="text-2xl font-bold">27. VERSCHIEDENES</h2>
          <p>
            Diese rechtlichen Bedingungen stellen zusammen mit allen zusätzlichen Richtlinien, die wir auf den Diensten
            veröffentlichen, die gesamte Vereinbarung zwischen dir und EchtSchreib dar. Unser Versäumnis, eine Bestimmung
            dieser rechtlichen Bedingungen durchzusetzen, stellt keinen Verzicht auf diese Bestimmung dar. Wir können unsere
            Rechte und Pflichten hierin ohne Ankündigung an dich abtreten oder übertragen.
          </p>
          <p>
            Sollte eine Bestimmung dieser rechtlichen Bedingungen für ungültig oder nicht durchsetzbar befunden werden,
            wird diese Bestimmung von diesen rechtlichen Bedingungen abgetrennt, und die verbleibenden Bestimmungen bleiben
            in vollem Umfang in Kraft. Durch diese rechtlichen Bedingungen wird kein Joint Venture, keine Partnerschaft,
            kein Beschäftigungs- oder Vertretungsverhältnis begründet.
          </p>
        </section>

        <section id="refunds" className="space-y-4">
          <h2 className="text-2xl font-bold">28. RÜCKERSTATTUNGEN</h2>
          <p>
            Durch das Abonnieren unserer Dienste erkennst du an, dass EchtSchreib dir sofortigen Zugriff auf digitale
            Funktionen gewährt und dass die Nutzung sofort nach dem Kauf beginnt. Dies bedeutet, dass du auf dein Recht
            auf die standardmäßige 14-tägige Widerrufsfrist verzichtest. Aufgrund der hohen Kosten für den Betrieb von
            KI-Modellen und Serverressourcen sind alle Zahlungen nicht erstattungsfähig, da Ressourcen zugewiesen und Kosten
            anfallen, sobald du mit der Nutzung des Dienstes beginnst.
          </p>
          <p>
            EchtSchreib arbeitet mit einem Abonnementmodell, das monatlich oder jährlich verfügbar ist. Abonnements werden
            automatisch für denselben Zeitraum verlängert, es sei denn, du kündigst vor dem Verlängerungsdatum. Du kannst
            dein Abonnement jederzeit über den Abrechnungsbereich unserer Website verwalten oder kündigen. Bitte beachte,
            dass eine Kündigung nicht zu einer Rückerstattung oder Gutschrift für bereits geleistete Zahlungen berechtigt.
          </p>
          <p>
            Wir behalten uns das Recht vor, Preise, Funktionen (wie verfügbare Guthaben oder Modelle) oder Dienstangebote
            jederzeit anzupassen. Preisänderungen für Abonnementpläne werden erst bei deiner nächsten Verlängerung wirksam.
          </p>
          <p>
            Sofern nicht anders angegeben, enthalten die Abonnementgebühren keine Steuern oder Abgaben. Du bist für die
            Zahlung aller anfallenden Steuern im Zusammenhang mit deinem Kauf verantwortlich. Wir können einen Nachweis
            über die Zahlung oder andere Dokumentationen für die Einhaltung von Steuervorschriften verlangen. Im Falle
            überfälliger Zahlungen kann dein Zugriff auf den Dienst nach schriftlicher Benachrichtigung ausgesetzt werden.
          </p>
          <p>
            Es ist dir nicht gestattet, mehrere Konten zu erstellen, um die kostenlose Nutzung zu nutzen. Wenn wir Missbrauch
            oder bösgläubiges Verhalten feststellen, können wir dein Konto aussetzen oder entsprechend Standardgebühren berechnen.
          </p>
        </section>

        <section id="marketing-communications" className="space-y-4">
          <h2 className="text-2xl font-bold">29. MARKETING-KOMMUNIKATION</h2>
          <p>
            Durch das Erstellen eines Kontos oder die Angabe deiner E-Mail-Adresse stimmst du zu, Marketing-Mitteilungen
            von EchtSchreib zu erhalten, einschließlich Newsletter, Werbeaktionen und Produkt-Updates.
          </p>
          <p>
            Du kannst diese Mitteilungen jederzeit abbestellen, indem du auf den Link „Abmelden" in einer Marketing-E-Mail
            klickst oder uns unter{' '}
            <a href="mailto:echtschreib@gmail.com" className="text-blue-600 hover:underline">
              echtschreib@gmail.com
            </a>{' '}
            kontaktierst. Bitte beachte, dass du weiterhin wesentliche dienstbezogene E-Mails erhältst, die für den Betrieb
            deines Kontos erforderlich sind.
          </p>
        </section>

        <section id="contact-us" className="space-y-4">
          <h2 className="text-2xl font-bold">30. KONTAKTIERE UNS</h2>
          <p>
            Bei Fragen, Bedenken oder weiteren Informationen zu diesen rechtlichen Bedingungen oder den Diensten
            kontaktiere uns bitte per E-Mail unter{' '}
            <a href="mailto:echtschreib@gmail.com" className="text-blue-600 hover:underline">
              echtschreib@gmail.com
            </a>
            .
          </p>
          <p>
            Bitte beachte: Diese Website enthält ein Barrierefreiheitssystem. Drücke Strg-F11, um die Website für
            Personen mit Sehbehinderungen anzupassen, die einen Screenreader verwenden; drücke Strg-F10, um das
            Barrierefreiheitsmenü zu öffnen. Für Barrierefreiheitsoptionen für blinde Benutzer, die auf Screenreader
            angewiesen sind, oder für die Tastaturnavigation folge bitte den Barrierefreiheitshinweisen, die auf der
            Website bereitgestellt werden.
          </p>
        </section>
      </main>

        <div className="max-w-4xl text-sm text-gray-500 space-y-1 mb-4 mt-4">
          <p>EchtSchreib</p>
          <p>
            Dieses Dokument dient als rechtsverbindliche Vereinbarung zwischen dir und EchtSchreib bezüglich der Nutzung
            unserer Dienste.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
