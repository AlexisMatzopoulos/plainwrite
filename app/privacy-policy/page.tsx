
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header  />
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4 mt-10 mb-10">
      <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
      <div className="max-w-4xl">
        <p className="text-sm text-gray-500">
          Last updated <time dateTime="2025-08-17">August 17, 2025</time>
        </p>
      </div>

      <main className="max-w-4xl space-y-8">
        <section className="space-y-4">
          <p>
            PlainWrite, operated by Alexis Matzopoulos ("we", "us" or "our"), operates the PlainWrite website and
            services (the "Services"). This privacy policy describes how we collect, use, and share information about you
            when you use our Services.
          </p>
          <p>
            Please read this policy carefully. By accessing or using our Services, you agree to this privacy policy.
            If you do not agree, please do not use our Services.
          </p>
        </section>

        <nav className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Table of Contents</h2>
          <ul className="list-decimal list-inside space-y-1 text-sm">
            <li>
              <a href="#info-we-collect" className="text-blue-600 hover:underline">
                What Information We Collect
              </a>
            </li>
            <li>
              <a href="#how-we-use-info" className="text-blue-600 hover:underline">
                How We Use Your Information
              </a>
            </li>
            <li>
              <a href="#sharing-info" className="text-blue-600 hover:underline">
                Sharing Your Information
              </a>
            </li>
            <li>
              <a href="#cookies" className="text-blue-600 hover:underline">
                Cookies and Tracking
              </a>
            </li>
            <li>
              <a href="#third-party" className="text-blue-600 hover:underline">
                Third-Party Links
              </a>
            </li>
            <li>
              <a href="#security" className="text-blue-600 hover:underline">
                Security
              </a>
            </li>
            <li>
              <a href="#your-choices" className="text-blue-600 hover:underline">
                Your Choices
              </a>
            </li>
            <li>
              <a href="#children" className="text-blue-600 hover:underline">
                Children's Privacy
              </a>
            </li>
            <li>
              <a href="#international" className="text-blue-600 hover:underline">
                International Transfers
              </a>
            </li>
            <li>
              <a href="#changes" className="text-blue-600 hover:underline">
                Changes to This Policy
              </a>
            </li>
            <li>
              <a href="#marketing-communications" className="text-blue-600 hover:underline">
                Marketing Communications
              </a>
            </li>
            <li>
              <a href="#contact-us" className="text-blue-600 hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>

        <section id="info-we-collect" className="space-y-4">
          <h2 className="text-2xl font-bold">1. What Information We Collect</h2>
          <p>We collect information that you provide directly:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              <span className="font-semibold">Account Information:</span> Name, email address, and password upon registration.
            </li>
            <li>
              <span className="font-semibold">Usage Data:</span> Content you submit for processing
              (e.g., text you check or convert).
            </li>
            <li>
              <span className="font-semibold">Communication:</span> Any messages you send through support or feedback forms.
            </li>
          </ul>
          <p>We also automatically collect certain information:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              <span className="font-semibold">Device and Browser Data:</span> IP address, browser type,
              operating system, and device IDs.
            </li>
            <li>
              <span className="font-semibold">Usage Metrics:</span> Pages visited, features used, and time spent.
            </li>
          </ul>
        </section>

        <section id="how-we-use-info" className="space-y-4">
          <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
          <ul className="list-decimal list-inside ml-4 space-y-2">
            <li>
              <span className="font-semibold">To Provide and Maintain Services:</span> Process your requests
              and provide features.
            </li>
            <li>
              <span className="font-semibold">To Improve Our Services:</span> Analyze usage and performance
              to optimize user experience.
            </li>
            <li>
              <span className="font-semibold">For Communication:</span> Send service announcements, updates, and security alerts.
            </li>
            <li>
              <span className="font-semibold">For Compliance:</span> Enforce our terms of service and comply with legal
              obligations.
            </li>
          </ul>
        </section>

        <section id="sharing-info" className="space-y-4">
          <h2 className="text-2xl font-bold">3. Sharing Your Information</h2>
          <p>We do not sell your personal data. We may share information with:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              <span className="font-semibold">Service Providers:</span> Third parties that provide services
              (e.g., hosting, analytics) under confidentiality agreements.
            </li>
            <li>
              <span className="font-semibold">Legal Requirements:</span> When required by law or to protect
              rights, safety, or property.
            </li>
            <li>
              <span className="font-semibold">Business Transfers:</span> In connection with a merger, acquisition, or
              sale of assets.
            </li>
          </ul>
        </section>

        <section id="cookies" className="space-y-4">
          <h2 className="text-2xl font-bold">4. Cookies and Tracking</h2>
          <p>
            We and our partners use cookies and similar technologies to collect information about your activities
            and preferences. You can control cookies through your browser settings; however, disabling
            cookies may limit functionality.
          </p>
        </section>

        <section id="third-party" className="space-y-4">
          <h2 className="text-2xl font-bold">5. Third-Party Links</h2>
          <p>
            Our Services may contain links to third-party websites. We are not responsible for their privacy practices.
            Visiting these websites is at your own risk.
          </p>
        </section>

        <section id="security" className="space-y-4">
          <h2 className="text-2xl font-bold">6. Security</h2>
          <p>
            We implement industry-standard measures to protect your information. However, no transmission method
            or storage is 100% secure. We cannot guarantee absolute security.
          </p>
        </section>

        <section id="your-choices" className="space-y-4">
          <h2 className="text-2xl font-bold">7. Your Choices</h2>
          <ul className="list-decimal list-inside ml-4 space-y-2">
            <li>
              You can access, update, or delete your account information in your account settings.
            </li>
            <li>
              You can unsubscribe from marketing emails via the link in those emails. Essential service emails
              cannot be unsubscribed.
            </li>
            <li>
              You can disable cookies in your browser, although some features may not work.
            </li>
          </ul>
        </section>

        <section id="children" className="space-y-4">
          <h2 className="text-2xl font-bold">8. Children's Privacy</h2>
          <p>
            Our Services are not directed to children under 18. We do not knowingly collect personal data
            from minors. If you believe we have, please contact us and we will delete it.
          </p>
        </section>

        <section id="international" className="space-y-4">
          <h2 className="text-2xl font-bold">9. International Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries outside your residence,
            including the United States. These countries may have different privacy laws.
            By using our Services, you consent to such transfers.
          </p>
        </section>

        <section id="changes" className="space-y-4">
          <h2 className="text-2xl font-bold">10. Changes to This Policy</h2>
          <p>
            We may update this privacy policy. We will publish the updated date above.
            Continued use after changes constitutes consent. We recommend you review this policy
            regularly.
          </p>
        </section>

        <section id="marketing-communications" className="space-y-4">
          <h2 className="text-2xl font-bold">11. Marketing Communications</h2>
          <p>
            By creating an account or providing your email address, you consent to receive
            marketing communications from PlainWrite, including newsletters, promotions, and product updates.
          </p>
          <p>
            You can unsubscribe from these communications at any time by clicking the "Unsubscribe" link in a marketing email
            or by contacting us at{' '}
            <a href="mailto:PlainWrite@gmail.com" className="text-blue-600 hover:underline">
              PlainWrite@gmail.com
            </a>
            . Please note that you will continue to receive essential service-related emails
            required for the operation of your account.
          </p>
        </section>

        <section id="contact-us" className="space-y-4">
          <h2 className="text-2xl font-bold">12. Contact Us</h2>
          <p>
            If you have any questions or concerns about this privacy policy, please contact us at{' '}
            <a href="mailto:PlainWrite@gmail.com" className="text-blue-600 hover:underline">
              PlainWrite@gmail.com
            </a>
            .
          </p>
        </section>
      </main>

        <div className="max-w-4xl text-sm text-gray-500 space-y-1 mb-4 mt-4">
          <p>PlainWrite</p>
          <p>
            This policy is effective as of the date stated above and forms part of our terms of service.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
