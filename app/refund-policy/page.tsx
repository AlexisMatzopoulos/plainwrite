
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function RefundPolicy() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header  />
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4 mt-10 mb-10">
      <h1 className="text-4xl font-extrabold">Refund Policy</h1>
      <div className="max-w-4xl">
        <p className="text-sm text-gray-500">
          Last updated <time dateTime="2025-08-17">August 17, 2025</time>
        </p>
      </div>

      <main className="max-w-4xl space-y-8">
        <section className="space-y-4">
          <p>
            This refund policy describes EchtSchreib's policies regarding refunds, cancellations, and subscription management.
            By subscribing to our Services, you acknowledge and agree to the terms outlined below.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Non-Refundable Policy</h2>
          <p>
            By subscribing to our Services, you acknowledge that EchtSchreib grants you immediate access to digital
            features and that usage begins immediately after purchase. This means that you waive your right to the
            standard 14-day withdrawal period. Due to the high costs of operating AI models and server resources, all
            payments are non-refundable, as resources are allocated and costs are incurred as soon as you begin using
            the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Subscription Management</h2>
          <p>
            EchtSchreib operates on a subscription model that is available monthly or annually. Subscriptions
            automatically renew for the same period unless you cancel before the renewal date. You can manage or cancel
            your subscription at any time through the billing section of our website. Please note that cancellation does
            not entitle you to a refund or credit for payments already made.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Price Changes</h2>
          <p>
            We reserve the right to adjust prices, features (such as available credits or models), or service offerings
            at any time. Price changes for subscription plans will only take effect at your next renewal.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Taxes and Fees</h2>
          <p>
            Unless otherwise stated, subscription fees do not include taxes or levies. You are responsible for paying
            all taxes incurred in connection with your purchase. We may require proof of payment or other documentation
            for tax compliance purposes. In the event of overdue payments, your access to the Service may be suspended
            after written notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Account Abuse</h2>
          <p>
            You are not permitted to create multiple accounts to take advantage of free usage. If we detect abuse or
            bad faith behavior, we may suspend your account or charge standard fees accordingly.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p>
            If you have any questions or concerns about this refund policy, please contact us at{' '}
            <a href="mailto:echtschreib@gmail.com" className="text-blue-600 hover:underline">
              echtschreib@gmail.com
            </a>
            .
          </p>
        </section>
      </main>

        <div className="max-w-4xl text-sm text-gray-500 space-y-1 mb-4 mt-4">
          <p>EchtSchreib</p>
          <p>Operated by: Alexis Matzopoulos</p>
          <p>
            This policy is effective as of the date stated above and forms part of our terms of service.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
