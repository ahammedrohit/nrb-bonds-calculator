import { Layout } from '@/layouts/Layout';
import { REQUIRED_DOCUMENTS, ISSUING_BANKS } from '@/data/bondData';

export const GuidelinesPage = () => {
  const steps = [
    {
      number: '01',
      title: 'Open Required Account',
      description: 'Open a Non-Resident Foreign Currency (NRFC) account or Non-Resident Taka (NRT) account with an authorized bank in Bangladesh.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Send Foreign Remittance',
      description: 'Remit foreign currency to your NRFC/NRT account. The remittance must be from your legitimate foreign earnings.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Collect Application Forms',
      description: 'Download or collect the bond application forms from your bank. Different forms are required for different bond types.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Submit Documents',
      description: 'Submit completed forms with all required documents. For remote purchase, send scanned copies first, then courier originals.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
    },
    {
      number: '05',
      title: 'Receive Bond Certificate',
      description: 'Once processed, receive your bond advice copy/certificate. Keep it safe - you\'ll need it for encashment or transfer.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
  ];

  const notEligible = [
    'Remittances earned from pension benefits against employment abroad',
    'Remittance received for post-death service benefits from abroad',
    'Bangladeshi crew members/pilots of overseas shipping companies',
    'Crew members of Bangladeshi shipping companies posted abroad',
  ];

  return (
    <Layout
      title="Investment Guidelines"
      description="Complete guide to investing in Bangladesh NRB Bonds. Learn about eligibility, required documents, and step-by-step process."
    >
      {/* Hero */}
      <section className="bg-brand-600 text-white py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="heading-1 text-white mb-4">
              Investment Guidelines
            </h1>
            <p className="text-lg text-brand-100 leading-relaxed">
              Everything you need to know about investing in Bangladesh Diaspora Bonds. 
              From eligibility requirements to step-by-step purchase process.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">How to Invest</h2>
            <p className="subheading max-w-2xl mx-auto">
              Follow these steps to purchase NRB Bonds from abroad or within Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector Line (hidden on mobile, last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-neutral-200 dark:bg-neutral-700" />
                )}
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400 mb-2">STEP {step.number}</span>
                  <h3 className="font-display font-semibold text-neutral-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="section bg-neutral-50 dark:bg-neutral-900">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-3 mb-6">Required Documents</h2>
              <p className="body-text mb-8">
                Ensure you have all necessary documents ready before applying. 
                Missing documents can delay the bond issuance process.
              </p>
              
              <div className="space-y-3">
                {REQUIRED_DOCUMENTS.map((doc, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{index + 1}</span>
                    </div>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300 pt-1.5">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading-3 mb-6">Important Notes</h2>
              
              {/* Eligibility Note */}
              <div className="card p-6 mb-6">
                <h4 className="font-display font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Eligible Remittances
                </h4>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                    Salary/wages from employment abroad
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                    Business income earned abroad
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                    Professional service fees from abroad
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                    Any legitimate foreign currency earnings
                  </li>
                </ul>
              </div>

              {/* Not Eligible */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                <h4 className="font-display font-semibold text-red-900 dark:text-red-300 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Not Eligible for Investment
                </h4>
                <ul className="space-y-2">
                  {notEligible.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-red-700 dark:text-red-300">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Limits */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-3 mb-4">Investment Limits</h2>
            <p className="subheading max-w-2xl mx-auto">
              There are limits on how much you can invest in NRB Bonds.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="card p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-100 dark:bg-brand-900/50 mb-4">
                  <span className="text-3xl font-display font-bold text-brand-600 dark:text-brand-400">১</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">
                  BDT 1 Crore
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Maximum combined investment limit across all three bond types
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-brand-50 dark:bg-brand-900/30 rounded-xl text-center">
                  <span className="text-sm font-medium text-brand-700 dark:text-brand-300">WEDB</span>
                  <p className="text-xs text-brand-600 dark:text-brand-400 mt-1">Up to ৳1 Crore</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center">
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">USDIB</span>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">USD equivalent to ৳1 Crore</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-center">
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">USDPB</span>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">USD equivalent to ৳1 Crore</p>
                </div>
              </div>

              <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
                Note: The limit is combined across all bond types, not per bond type.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Authorized Banks */}
      <section className="section bg-neutral-50 dark:bg-neutral-900">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-3 mb-4">Authorized Issuing Banks</h2>
            <p className="subheading max-w-2xl mx-auto">
              NRB Bonds can be purchased through these authorized banks in Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ISSUING_BANKS.map((bank, index) => (
              <div key={index} className="card p-4 text-center">
                <span className="text-sm font-medium text-neutral-900 dark:text-white">{bank.name}</span>
                <span className={`block text-xs mt-1 ${
                  bank.type === 'State-owned' ? 'text-brand-600 dark:text-brand-400' : 
                  bank.type === 'Specialized' ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'
                }`}>
                  {bank.type}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-8">
            Contact your preferred bank for specific procedures and remote purchase options.
          </p>
        </div>
      </section>

      {/* Encashment Info */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-3 mb-8 text-center">Encashment & Maturity</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h4 className="font-display font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Premature Encashment
                </h4>
                <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-neutral-900 dark:text-white">WEDB:</span>
                    After 6 months at reduced rates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-neutral-900 dark:text-white">USD Bonds:</span>
                    After 1 year at 5% interest
                  </li>
                  <li className="text-xs text-neutral-500 dark:text-neutral-400 pt-2">
                    Physical presence at bank required with original bond certificate
                  </li>
                </ul>
              </div>

              <div className="card p-6">
                <h4 className="font-display font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Maturity Encashment
                </h4>
                <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-neutral-900 dark:text-white">WEDB:</span>
                    Principal + Interest in BDT; Principal repatriable
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-neutral-900 dark:text-white">USDIB:</span>
                    Principal + Interest fully repatriable in USD
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-neutral-900 dark:text-white">USDPB:</span>
                    Principal in USD, Interest in BDT equivalent
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-neutral-900 text-white">
        <div className="container-narrow text-center">
          <h2 className="heading-3 text-white mb-4">Have Questions?</h2>
          <p className="text-neutral-300 mb-8">
            Check our FAQ section or visit Bangladesh Bank's official page for more information.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/faq" className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100">
              View FAQ
            </a>
            <a
              href="https://www.bb.org.bd/en/index.php/Investfacility/nrbbond"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark"
            >
              Bangladesh Bank
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GuidelinesPage;
