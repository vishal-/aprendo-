export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-300 mb-4">
            By accessing and using Aprendo, you accept and agree to be bound by
            the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            2. Use License
          </h2>
          <p className="text-gray-300 mb-4">
            Permission is granted to temporarily use Aprendo for personal,
            non-commercial transitory viewing only.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            3. User Accounts
          </h2>
          <p className="text-gray-300 mb-4">
            Users are responsible for maintaining the confidentiality of their
            account credentials and for all activities under their account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            4. Prohibited Uses
          </h2>
          <p className="text-gray-300 mb-4">
            You may not use Aprendo for any unlawful purpose or to solicit
            others to perform unlawful acts.
          </p>
        </section>

        {/* <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Information</h2>
          <p className="text-gray-300">
            If you have any questions about these Terms & Conditions, please contact us at legal@aprendo.com
          </p>
        </section> */}
      </div>
    </div>
  );
}
