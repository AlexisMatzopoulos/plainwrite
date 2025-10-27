
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Impressum() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header  />
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4 mt-10 mb-10">
        <h1 className="text-4xl font-extrabold">Legal Imprint</h1>
        <div className="max-w-4xl">
          <p className="text-sm text-gray-500">
            Information according to § 5 TMG (German Telemedia Act)
          </p>
        </div>

        <main className="max-w-4xl space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Information according to § 5 TMG</h2>
            <div className="space-y-2">
              <p className="font-semibold">[YOUR FULL NAME]</p>
              <p>[STREET AND HOUSE NUMBER]</p>
              <p>[POSTAL CODE AND CITY]</p>
              <p>[COUNTRY]</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Contact</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Phone:</span> [YOUR PHONE NUMBER]
              </p>
              <p>
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:PlainWrite@gmail.com" className="text-blue-600 hover:underline">
                  PlainWrite@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">VAT ID</h2>
            <div className="space-y-2">
              <p>
                VAT Identification Number according to § 27a of the German VAT Act:
              </p>
              <p className="font-semibold">[YOUR VAT ID - e.g. DE123456789]</p>
              <p className="text-sm text-gray-600 mt-2">
                If you are exempt from VAT as a small business under § 19 UStG,
                you can instead write: "As a small business under § 19(1) of the
                German VAT Act, no VAT is charged."
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Professional Designation and Professional Regulations</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Professional Title:</span> [YOUR PROFESSIONAL TITLE - e.g. Web Designer, Consultant, etc.]
              </p>
              <p className="text-sm text-gray-600">
                (Only required for regulated professions such as lawyer, doctor, architect, etc.)
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Responsible for Content according to § 55(2) RStV</h2>
            <div className="space-y-2">
              <p>[YOUR FULL NAME]</p>
              <p>[YOUR ADDRESS]</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">EU Dispute Resolution</h2>
            <p>
              The European Commission provides a platform for online dispute resolution (ODR):{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p>You will find our email address above in the imprint.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Consumer Dispute Resolution / Universal Mediation Office</h2>
            <p>
              We are not willing or obligated to participate in dispute resolution proceedings
              before a consumer mediation office.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Disclaimer</h2>

            <h3 className="text-xl font-semibold">Liability for Content</h3>
            <p>
              As a service provider, we are responsible for our own content on these pages according to general laws
              under § 7(1) TMG. However, as a service provider under §§ 8-10 TMG, we are not obligated to monitor
              transmitted or stored information from others or to investigate circumstances indicating illegal activity.
            </p>
            <p>
              Obligations to remove or block the use of information according to general laws remain unaffected.
              However, liability for this only applies from the time we become aware of a specific legal violation.
              Upon learning of such violations, we will promptly remove the content.
            </p>

            <h3 className="text-xl font-semibold mt-4">Liability for Links</h3>
            <p>
              Our website contains links to external third-party websites over whose content we have no control.
              Therefore, we cannot be responsible for this external content. The respective provider or operator
              of the linked pages is always responsible for their content.
            </p>
            <p>
              The linked pages were checked for possible legal violations at the time of linking. Illegal content
              was not apparent at the time of linking. However, permanent monitoring of linked pages is not
              reasonable without concrete evidence of legal violations. Upon learning of legal violations,
              we will promptly remove such links.
            </p>

            <h3 className="text-xl font-semibold mt-4">Copyright</h3>
            <p>
              The content and works created by the page operators on these pages are subject to German copyright law.
              Reproduction, modification, distribution, and any use outside the scope of copyright law require
              the written consent of the respective author or creator. Downloads and copies of this page are
              permitted only for private, non-commercial use.
            </p>
            <p>
              To the extent that content on this page was not created by the operator, third-party copyrights are
              respected. In particular, third-party content is marked as such. Should you nonetheless become aware
              of a copyright violation, we ask that you inform us accordingly. Upon learning of legal violations,
              we will promptly remove such content.
            </p>
          </section>
        </main>

        <div className="max-w-4xl text-sm text-gray-500 space-y-1 mb-4 mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="font-semibold text-yellow-800">⚠️ Important Notice for Sole Proprietors:</p>
          <p className="text-yellow-800">
            Please replace all placeholders in square brackets [INSERT HERE] with your actual information.
            An incomplete imprint can result in cease-and-desist letters and fines up to €50,000.
          </p>
          <p className="text-yellow-800 mt-2">
            <span className="font-semibold">As a sole proprietor, you do NOT need:</span><br />
            • Trade register number (unless you are registered in the trade register)<br />
            • Manager information<br />
            • Fax number (is optional)
          </p>
          <p className="text-yellow-800 mt-2">
            <span className="font-semibold">You MUST provide:</span><br />
            • Your full name (first and last name)<br />
            • Your complete postal address (no P.O. box)<br />
            • Phone number and email address<br />
            • VAT ID (or small business status under § 19 UStG)
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
