
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsOfService() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header  />
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4 mt-10 mb-10">
      <h1 className="text-4xl font-extrabold">Terms of Service</h1>
      <div className="max-w-4xl">
        <p className="text-sm text-gray-500">
          Last updated <time dateTime="2025-08-17">August 17, 2025</time>
        </p>
      </div>

      <main className="max-w-4xl space-y-8">
        <section className="space-y-4">
          <p>
            These terms of service are entered into between you ("you" or "your") and PlainWrite, operated by
            Alexis Matzopoulos ("Company", "we", "us" or "our"). These legal terms govern your access to and use of
            our website and all associated products or services provided by PlainWrite (together the "Services").
            By accessing or using our Services, you declare that you have read, understood, and accepted these legal terms.
          </p>
          <p>
            If you do not agree with all these legal terms, you are expressly prohibited from using our Services,
            and you must cease use immediately.
          </p>
          <p>
            Supplementary terms or additional documents that we publish from time to time are hereby incorporated by
            reference into these legal terms. We reserve the right to make changes or modifications to these legal terms
            at any time, at our sole discretion, without prior notice. The "Last Updated" date above reflects such changes.
          </p>
          <p>
            It is your responsibility to regularly review these legal terms, and your continued use of our Services after
            changes constitutes your agreement to the revised terms.
          </p>
          <p>
            The Services are intended for users who are at least 18 years old. Individuals under 18 are not permitted
            to use or register for our Services.
          </p>
          <p className="italic text-gray-600">
            It is recommended that you print a copy of these legal terms for your records.
          </p>
        </section>

        <nav className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Table of Contents</h2>
          <ul className="list-decimal list-inside space-y-1 text-sm">
            <li>
              <a href="#our-services" className="text-blue-600 hover:underline">
                OUR SERVICES
              </a>
            </li>
            <li>
              <a href="#intellectual-property" className="text-blue-600 hover:underline">
                INTELLECTUAL PROPERTY RIGHTS
              </a>
            </li>
            <li>
              <a href="#user-representations" className="text-blue-600 hover:underline">
                USER REPRESENTATIONS
              </a>
            </li>
            <li>
              <a href="#user-registration" className="text-blue-600 hover:underline">
                USER REGISTRATION
              </a>
            </li>
            <li>
              <a href="#purchases-payment" className="text-blue-600 hover:underline">
                PURCHASES AND PAYMENT
              </a>
            </li>
            <li>
              <a href="#cancellation" className="text-blue-600 hover:underline">
                CANCELLATION
              </a>
            </li>
            <li>
              <a href="#subscription-term" className="text-blue-600 hover:underline">
                SUBSCRIPTION TERM AND TERMINATION
              </a>
            </li>
            <li>
              <a href="#prohibited-activities" className="text-blue-600 hover:underline">
                PROHIBITED ACTIVITIES
              </a>
            </li>
            <li>
              <a href="#user-generated" className="text-blue-600 hover:underline">
                USER-GENERATED CONTRIBUTIONS
              </a>
            </li>
            <li>
              <a href="#contribution-license" className="text-blue-600 hover:underline">
                CONTRIBUTION LICENSE
              </a>
            </li>
            <li>
              <a href="#third-party" className="text-blue-600 hover:underline">
                THIRD-PARTY WEBSITES AND CONTENT
              </a>
            </li>
            <li>
              <a href="#advertisers" className="text-blue-600 hover:underline">
                ADVERTISERS
              </a>
            </li>
            <li>
              <a href="#services-management" className="text-blue-600 hover:underline">
                SERVICES MANAGEMENT
              </a>
            </li>
            <li>
              <a href="#privacy-policy" className="text-blue-600 hover:underline">
                PRIVACY POLICY
              </a>
            </li>
            <li>
              <a href="#copyright" className="text-blue-600 hover:underline">
                COPYRIGHT INFRINGEMENTS
              </a>
            </li>
            <li>
              <a href="#term-termination" className="text-blue-600 hover:underline">
                TERM AND TERMINATION
              </a>
            </li>
            <li>
              <a href="#modifications" className="text-blue-600 hover:underline">
                MODIFICATIONS AND INTERRUPTIONS
              </a>
            </li>
            <li>
              <a href="#governing-law" className="text-blue-600 hover:underline">
                GOVERNING LAW
              </a>
            </li>
            <li>
              <a href="#dispute-resolution" className="text-blue-600 hover:underline">
                DISPUTE RESOLUTION
              </a>
            </li>
            <li>
              <a href="#corrections" className="text-blue-600 hover:underline">
                CORRECTIONS
              </a>
            </li>
            <li>
              <a href="#disclaimer" className="text-blue-600 hover:underline">
                DISCLAIMER
              </a>
            </li>
            <li>
              <a href="#limitations" className="text-blue-600 hover:underline">
                LIMITATIONS OF LIABILITY
              </a>
            </li>
            <li>
              <a href="#indemnification" className="text-blue-600 hover:underline">
                INDEMNIFICATION
              </a>
            </li>
            <li>
              <a href="#user-data" className="text-blue-600 hover:underline">
                USER DATA
              </a>
            </li>
            <li>
              <a href="#electronic" className="text-blue-600 hover:underline">
                ELECTRONIC COMMUNICATIONS, TRANSACTIONS AND SIGNATURES
              </a>
            </li>
            <li>
              <a href="#california" className="text-blue-600 hover:underline">
                CALIFORNIA USERS AND RESIDENTS
              </a>
            </li>
            <li>
              <a href="#miscellaneous" className="text-blue-600 hover:underline">
                MISCELLANEOUS
              </a>
            </li>
            <li>
              <a href="#refunds" className="text-blue-600 hover:underline">
                REFUNDS
              </a>
            </li>
            <li>
              <a href="#marketing-communications" className="text-blue-600 hover:underline">
                MARKETING COMMUNICATIONS
              </a>
            </li>
            <li>
              <a href="#contact-us" className="text-blue-600 hover:underline">
                CONTACT US
              </a>
            </li>
          </ul>
        </nav>

        <section id="our-services" className="space-y-4">
          <h2 className="text-2xl font-bold">1. OUR SERVICES</h2>
          <p>
            The information provided when using our Services is not intended for distribution or use by any person or
            entity in any jurisdiction where such distribution or use would be contrary to law or regulation. Those who
            access our Services from locations where local laws differ do so on their own initiative and are solely
            responsible for compliance with local laws.
          </p>
          <p>
            The Services are not specifically designed to comply with industry-specific regulations (such as those
            applicable to healthcare or financial services); if your interactions would be subject to such laws, you
            may not use the Services.
          </p>
        </section>

        <section id="intellectual-property" className="space-y-4">
          <h2 className="text-2xl font-bold">2. INTELLECTUAL PROPERTY RIGHTS</h2>
          <p>
            We are the owner or licensee of all intellectual property rights in our Services, including all source code,
            databases, software, website designs, audio, video, text, photographs, and graphics (collectively the
            "Content") as well as the trademarks, service marks, and logos (the "Marks"). Our Content and Marks are
            protected worldwide by copyright, trademark, and other applicable intellectual property laws.
          </p>
          <p>
            Subject to your compliance with these legal terms, we grant you a limited, non-exclusive, non-transferable,
            revocable license to access our Services and to download or print a copy of any portion of the Content to
            which you have properly gained access, solely for your personal, non-commercial use or internal business
            purposes. No part of the Services, Content, or Marks may be copied, reproduced, transmitted, or otherwise
            exploited for commercial purposes without our express prior written consent.
          </p>
          <p>
            Unauthorized use of Content or Marks constitutes a material breach of these legal terms and may result in
            immediate termination of your right to use our Services.
          </p>
        </section>

        <section id="user-representations" className="space-y-4">
          <h2 className="text-2xl font-bold">3. USER REPRESENTATIONS</h2>
          <ul className="list-decimal list-inside ml-4 space-y-2">
            <li>
              All information provided during registration or through use of the Services is true, accurate, current,
              and complete.
            </li>
            <li>You will maintain and promptly update such information as needed.</li>
            <li>You have the legal capacity and agree to comply with these legal terms.</li>
            <li>You are not a minor in your jurisdiction.</li>
            <li>You will not use automated or non-human methods to access the Services.</li>
            <li>
              Your use of the Services is for lawful purposes only and does not violate any applicable law or regulation.
            </li>
          </ul>
          <p>
            If the information you provide is untrue, inaccurate, or incomplete, we reserve the right to suspend or
            terminate your account and refuse any current or future use of our Services.
          </p>
        </section>

        <section id="user-registration" className="space-y-4">
          <h2 className="text-2xl font-bold">4. USER REGISTRATION</h2>
          <p>
            Registration may be required to access certain Services. You are responsible for securing your password and
            for all activities that occur under your account. We reserve the right to remove, reclaim, or change any
            username you choose if we determine, in our sole discretion, that the username is inappropriate, obscene,
            or offensive.
          </p>
        </section>

        <section id="purchases-payment" className="space-y-4">
          <h2 className="text-2xl font-bold">5. PURCHASES AND PAYMENT</h2>
          <p>
            For all transactions made through the Services, you agree to provide current, complete, and accurate purchase
            and account information. You further agree to update your account and payment information, such as email
            address and card details, to ensure that transactions can be processed and we can contact you as needed. All
            payments are made in the currency specified at the time of purchase. Sales tax may be added by us as required.
            Prices may change at any time.
          </p>
          <p>
            You authorize us to charge your payment provider for all fees incurred at the prices in effect at that time.
            For subscriptions with recurring charges, you agree to such charges until you cancel the subscription in
            accordance with these terms. We reserve the right to correct any pricing errors, even after payment has been
            processed.
          </p>
        </section>

        <section id="cancellation" className="space-y-4">
          <h2 className="text-2xl font-bold">6. CANCELLATION</h2>
          <p>
            All purchases made through our Services are non-refundable. You may cancel your subscription at any time by
            logging into your account. Upon cancellation, you will immediately lose all remaining usage credits or
            allocated uses. No refund of credits or payments will be granted under any circumstances.
          </p>
        </section>

        <section id="subscription-term" className="space-y-4">
          <h2 className="text-2xl font-bold">7. SUBSCRIPTION TERM AND TERMINATION</h2>
          <p>
            Your subscription to our Services is only valid for the period during which our operations remain active. We
            do not guarantee that your subscription will run for a full year or for any specific period. If PlainWrite
            ceases operations or is otherwise unable to provide the Services during your subscription term, your
            subscription will be terminated immediately without refund.
          </p>
          <p>
            By using our Services, you acknowledge and accept the risk that your subscription may end before the period
            originally paid for.
          </p>
          <p>
            If you are dissatisfied with our Services at any time, please send us an email at{' '}
            <a href="mailto:PlainWrite@gmail.com" className="text-blue-600 hover:underline">
              PlainWrite@gmail.com
            </a>
            .
          </p>
        </section>

        <section id="prohibited-activities" className="space-y-4">
          <h2 className="text-2xl font-bold">8. PROHIBITED ACTIVITIES</h2>
          <p>
            You may not use the Services for any purpose other than those provided by PlainWrite. Prohibited conduct
            includes, but is not limited to:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              Systematically retrieving data or content from our Services to create, compile, or aggregate databases or
              directories without our written consent.
            </li>
            <li>
              Fraud, deception, or misleading PlainWrite or other users, including attempts to access sensitive account
              information such as passwords.
            </li>
            <li>Circumventing or disabling security features of our Services.</li>
            <li>Disparaging or causing harm to PlainWrite or the Services.</li>
            <li>
              Using information obtained through our Services to harass, abuse, or harm another person.
            </li>
            <li>
              Improper use of support services or submission of false reports about abuse or misconduct.
            </li>
            <li>Violating applicable laws or regulations through your use of the Services.</li>
            <li>Embedding, linking, or otherwise using our Services in unauthorized ways.</li>
            <li>
              Uploading or transmitting viruses, malware, or other harmful materials that impair the functionality of
              the Services.
            </li>
            <li>
              Automated use of the system, such as using bots, scripts, or data mining tools to interact with the
              Services without permission.
            </li>
            <li>
              Attempting to circumvent measures designed to prevent or restrict access to the Services or to copy
              protected content.
            </li>
            <li>
              Any other activity that PlainWrite deems, in its sole discretion, to be harmful, illegal, or inappropriate.
            </li>
          </ul>
        </section>

        <section id="user-generated" className="space-y-4">
          <h2 className="text-2xl font-bold">9. USER-GENERATED CONTRIBUTIONS</h2>
          <p>
            Our Services may allow you to post or submit content, comments, reviews, or other materials ("Contributions").
            By submitting Contributions, you agree to the following:
          </p>
          <ul className="list-decimal list-inside ml-4 space-y-2">
            <li>Your Contributions are not confidential and may be used by PlainWrite.</li>
            <li>You are solely responsible for your Contributions and the consequences of their publication.</li>
            <li>
              Contributions must not infringe upon the intellectual property or other rights of third parties.
            </li>
            <li>
              Your Contributions must not contain material that is unlawful, harmful, defamatory, obscene, or otherwise
              offensive.
            </li>
            <li>
              PlainWrite reserves the right to remove, edit, or relocate Contributions that are deemed, in its sole
              discretion, to be harmful or in violation of these legal terms.
            </li>
            <li>
              You agree to hold PlainWrite harmless for any damages or losses arising from your Contributions.
            </li>
          </ul>
        </section>

        <section id="contribution-license" className="space-y-4">
          <h2 className="text-2xl font-bold">10. CONTRIBUTION LICENSE</h2>
          <p>
            By posting Contributions to our Services, you grant PlainWrite an unlimited, perpetual, irrevocable,
            worldwide, non-exclusive, royalty-free, transferable license to use, reproduce, modify, publish, distribute,
            translate, display, and perform your Contributions in all media and for any purpose, including commercial
            purposes. You waive all moral rights with respect to your Contributions.
          </p>
          <p>
            PlainWrite does not claim ownership of your Contributions; you retain ownership but grant us this
            comprehensive license.
          </p>
        </section>

        <section id="third-party" className="space-y-4">
          <h2 className="text-2xl font-bold">11. THIRD-PARTY WEBSITES AND CONTENT</h2>
          <p>
            Our Services may contain links to third-party websites or display third-party content. PlainWrite does not
            control or endorse any third-party websites or content, and we are not responsible for their accuracy,
            legality, or content. All interactions with third-party websites or services are solely between you and the
            third party. You acknowledge that these legal terms no longer govern third-party websites or content once you
            leave our Services.
          </p>
        </section>

        <section id="advertisers" className="space-y-4">
          <h2 className="text-2xl font-bold">12. ADVERTISERS</h2>
          <p>
            Advertisers may display their advertisements in our Services. PlainWrite provides the space for such
            advertisements and has no responsibility for the content or practices of advertisers. Your interactions with
            advertisers are solely between you and the advertiser.
          </p>
        </section>

        <section id="services-management" className="space-y-4">
          <h2 className="text-2xl font-bold">13. SERVICES MANAGEMENT</h2>
          <p>PlainWrite reserves the right to:</p>
          <ul className="list-decimal list-inside ml-4 space-y-2">
            <li>Monitor the Services for violations of these legal terms;</li>
            <li>
              Take appropriate legal action against any user who violates these legal terms, including notifying law
              enforcement authorities;
            </li>
            <li>
              Refuse, restrict, or disable access to any part of the Services at our sole discretion;
            </li>
            <li>
              Remove or disable content that is excessively large or burdens our systems;
            </li>
            <li>
              Otherwise manage and maintain the Services as necessary to protect our rights and ensure proper functioning.
            </li>
          </ul>
        </section>

        <section id="privacy-policy" className="space-y-4">
          <h2 className="text-2xl font-bold">14. PRIVACY POLICY</h2>
          <p>
            Your privacy is important to us. Please read our Privacy Policy, which describes how we collect, use, store,
            and share your information. By using our Services, you agree that our Privacy Policy governs our use of your
            personal data. All data processing is conducted in accordance with applicable data protection laws.
          </p>
        </section>

        <section id="copyright" className="space-y-4">
          <h2 className="text-2xl font-bold">15. COPYRIGHT INFRINGEMENTS</h2>
          <p>
            We respect the intellectual property rights of others. If you believe that material provided through our
            Services infringes a copyright that you own or control, please notify us promptly using the contact
            information provided below. Any notification must contain sufficient detail for us to evaluate the alleged
            infringement. Please note that under applicable law, you may be held liable for damages if you make false
            statements regarding an infringement claim.
          </p>
        </section>

        <section id="term-termination" className="space-y-4">
          <h2 className="text-2xl font-bold">16. TERM AND TERMINATION</h2>
          <p>
            These legal terms remain in full force and effect while you use our Services. PlainWrite reserves the right,
            at its sole discretion and without notice or liability, to deny access or terminate your account if you
            violate any provision of these legal terms or applicable law or regulation. If your account is terminated,
            you are not permitted to create a new account under another name or on behalf of another person or organization.
          </p>
          <p>PlainWrite may also take appropriate legal action against you if necessary.</p>
        </section>

        <section id="modifications" className="space-y-4">
          <h2 className="text-2xl font-bold">17. MODIFICATIONS AND INTERRUPTIONS</h2>
          <p>
            PlainWrite may change, modify, or remove the content of the Services at any time without notice. We are not
            obligated to update the information provided in our Services. We do not guarantee that our Services will be
            available at all times, and we may experience interruptions, delays, or errors from time to time. Under no
            circumstances is PlainWrite liable for losses, damages, or inconveniences caused by unavailability or
            interruption of the Services.
          </p>
        </section>

        <section id="governing-law" className="space-y-4">
          <h2 className="text-2xl font-bold">18. GOVERNING LAW</h2>
          <p>
            These legal terms and your use of the Services are governed by and construed in accordance with the laws of
            the jurisdiction in which PlainWrite operates, without regard to conflict of law provisions.
          </p>
        </section>

        <section id="dispute-resolution" className="space-y-4">
          <h2 className="text-2xl font-bold">19. DISPUTE RESOLUTION</h2>
          <p>
            <span className="font-semibold">Informal Negotiations</span>
            <br />
            Before initiating a formal dispute resolution procedure, you and PlainWrite agree to attempt to resolve all
            disputes informally for at least thirty (30) days after one party has notified the other party in writing.
          </p>
          <p>
            <span className="font-semibold">Binding Arbitration</span>
            <br />
            If a dispute cannot be resolved informally, any unresolved dispute will be settled through binding arbitration
            in accordance with generally applicable rules. Arbitration will be conducted on an individual basis, and
            neither party may participate in a class, consolidated, or representative action. Should you initiate or
            participate in a class or representative proceeding, PlainWrite may immediately terminate your access to our
            Services. Furthermore, any claim must be brought within two (2) years from the date on which the cause of
            action arose. Should any part of the arbitration clause be found invalid or unenforceable, the remainder
            shall remain in full force and effect.
          </p>
        </section>

        <section id="corrections" className="space-y-4">
          <h2 className="text-2xl font-bold">20. CORRECTIONS</h2>
          <p>
            There may be errors, inaccuracies, or omissions in the information provided through our Services. PlainWrite
            reserves the right to correct errors or update information at its sole discretion without prior notice.
          </p>
        </section>

        <section id="disclaimer" className="space-y-4">
          <h2 className="text-2xl font-bold">21. DISCLAIMER</h2>
          <p>
            THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES
            IS AT YOUR OWN RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, PlainWrite DISCLAIMS ALL WARRANTIES, EXPRESS
            OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>
          <p>
            PlainWrite DOES NOT GUARANTEE THAT THE SERVICES OR ANY CONTENT WILL BE ACCURATE, COMPLETE, OR UNINTERRUPTED,
            AND WE ARE NOT RESPONSIBLE FOR ERRORS, MISTAKES, OR INACCURACIES IN CONTENT. ANY RELIANCE ON THE SERVICES
            IS AT YOUR OWN RISK.
          </p>
        </section>

        <section id="limitations" className="space-y-4">
          <h2 className="text-2xl font-bold">22. LIMITATIONS OF LIABILITY</h2>
          <p>
            IN NO EVENT SHALL PlainWrite, ITS OFFICERS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR
            USE OF THE SERVICES, REGARDLESS OF WHETHER SUCH LIABILITY IS BASED ON CONTRACT, TORT, STRICT LIABILITY, OR
            OTHERWISE, EVEN IF PlainWrite HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p>
            YOUR TOTAL LIABILITY, WHETHER UNDER CONTRACT, WARRANTY, TORT, OR OTHERWISE, SHALL NOT EXCEED THE AMOUNT YOU
            PAID, IF ANY, FOR ACCESS TO THE SERVICES. SOME LAWS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN
            DAMAGES, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
          </p>
        </section>

        <section id="indemnification" className="space-y-4">
          <h2 className="text-2xl font-bold">23. INDEMNIFICATION</h2>
          <p>
            You agree to defend, indemnify, and hold harmless PlainWrite, its subsidiaries, affiliates, officers, agents,
            and employees from all claims, liabilities, damages, losses, and expenses (including reasonable attorneys'
            fees and costs) arising out of or in any way connected with your access to or use of the Services, your
            Contributions, your breach of these legal terms, or your violation of the rights of third parties.
          </p>
        </section>

        <section id="user-data" className="space-y-4">
          <h2 className="text-2xl font-bold">24. USER DATA</h2>
          <p>
            PlainWrite maintains data that you transmit through our Services solely for the administration and operation
            of the Services and for analytical purposes. While we regularly perform routine data backups, you are
            responsible for all data you provide. PlainWrite is not liable for any loss or damage to your data.
          </p>
        </section>

        <section id="electronic" className="space-y-4">
          <h2 className="text-2xl font-bold">25. ELECTRONIC COMMUNICATIONS, TRANSACTIONS AND SIGNATURES</h2>
          <p>
            All communications, transactions, and signatures exchanged electronically between you and PlainWrite are
            treated as if they were in writing. By using our Services, you agree to receive electronic communications,
            and you agree that all such communications satisfy any legal requirement that such communications be in writing.
          </p>
          <p>
            <span className="font-semibold">Marketing and Communication</span>
            <br />
            By using our Services, you agree to receive marketing, billing, and service-related communications from
            PlainWrite using the email address and contact information you provide. If you wish to unsubscribe from
            marketing communications, you may do so by following the instructions in those communications. Please note
            that unsubscribing from marketing communications does not affect your receipt of billing or essential
            service-related communications.
          </p>
        </section>

        <section id="california" className="space-y-4">
          <h2 className="text-2xl font-bold">26. CALIFORNIA USERS AND RESIDENTS</h2>
          <p>
            If you are a California resident and have concerns regarding unresolved issues with our Services, you may
            contact the appropriate consumer support unit as provided by the relevant state authorities.
          </p>
        </section>

        <section id="miscellaneous" className="space-y-4">
          <h2 className="text-2xl font-bold">27. MISCELLANEOUS</h2>
          <p>
            These legal terms, together with any additional policies we publish on the Services, constitute the entire
            agreement between you and PlainWrite. Our failure to enforce any provision of these legal terms does not
            constitute a waiver of that provision. We may assign or transfer our rights and obligations herein without
            notice to you.
          </p>
          <p>
            Should any provision of these legal terms be found invalid or unenforceable, that provision will be severed
            from these legal terms, and the remaining provisions will remain in full force and effect. These legal terms
            do not create any joint venture, partnership, employment, or agency relationship.
          </p>
        </section>

        <section id="refunds" className="space-y-4">
          <h2 className="text-2xl font-bold">28. REFUNDS</h2>
          <p>
            By subscribing to our Services, you acknowledge that PlainWrite grants you immediate access to digital
            features and that usage begins immediately after purchase. This means that you waive your right to the
            standard 14-day withdrawal period. Due to the high costs of operating AI models and server resources, all
            payments are non-refundable, as resources are allocated and costs are incurred as soon as you begin using
            the Service.
          </p>
          <p>
            PlainWrite operates on a subscription model that is available monthly or annually. Subscriptions
            automatically renew for the same period unless you cancel before the renewal date. You can manage or cancel
            your subscription at any time through the billing section of our website. Please note that cancellation does
            not entitle you to a refund or credit for payments already made.
          </p>
          <p>
            We reserve the right to adjust prices, features (such as available credits or models), or service offerings
            at any time. Price changes for subscription plans will only take effect at your next renewal.
          </p>
          <p>
            Unless otherwise stated, subscription fees do not include taxes or levies. You are responsible for paying
            all taxes incurred in connection with your purchase. We may require proof of payment or other documentation
            for tax compliance purposes. In the event of overdue payments, your access to the Service may be suspended
            after written notice.
          </p>
          <p>
            You are not permitted to create multiple accounts to take advantage of free usage. If we detect abuse or
            bad faith behavior, we may suspend your account or charge standard fees accordingly.
          </p>
        </section>

        <section id="marketing-communications" className="space-y-4">
          <h2 className="text-2xl font-bold">29. MARKETING COMMUNICATIONS</h2>
          <p>
            By creating an account or providing your email address, you agree to receive marketing communications from
            PlainWrite, including newsletters, promotions, and product updates.
          </p>
          <p>
            You may unsubscribe from these communications at any time by clicking the "Unsubscribe" link in a marketing
            email or by contacting us at{' '}
            <a href="mailto:PlainWrite@gmail.com" className="text-blue-600 hover:underline">
              PlainWrite@gmail.com
            </a>
            . Please note that you will continue to receive essential service-related emails that are necessary for the
            operation of your account.
          </p>
        </section>

        <section id="contact-us" className="space-y-4">
          <h2 className="text-2xl font-bold">30. CONTACT US</h2>
          <p>
            For questions, concerns, or further information regarding these legal terms or the Services, please contact
            us by email at{' '}
            <a href="mailto:PlainWrite@gmail.com" className="text-blue-600 hover:underline">
              PlainWrite@gmail.com
            </a>
            .
          </p>
          <p>
            Please note: This website contains an accessibility system. Press Ctrl-F11 to adjust the website for people
            with visual impairments who are using a screen reader; press Ctrl-F10 to open the accessibility menu. For
            accessibility options for blind users who rely on screen readers, or for keyboard navigation, please follow
            the accessibility instructions provided on the website.
          </p>
        </section>
      </main>

        <div className="max-w-4xl text-sm text-gray-500 space-y-1 mb-4 mt-4">
          <p>PlainWrite</p>
          <p>Operated by: Alexis Matzopoulos</p>
          <p>
            This document serves as a legally binding agreement between you and PlainWrite regarding the use of our
            Services.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
