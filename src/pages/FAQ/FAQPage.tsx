import { useState } from 'react';
import { Layout } from '@/layouts/Layout';
import { FAQ_DATA } from '@/data/bondData';

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout
      title="Frequently Asked Questions"
      description="Common questions about Bangladesh NRB Bonds including eligibility, investment process, repatriation, and more."
    >
      {/* Hero */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-4">
              Frequently Asked <span className="text-brand-600">Questions</span>
            </h1>
            <p className="subheading">
              Find answers to common questions about NRB Bonds, investment process, 
              eligibility, and more.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section">
        <div className="container-narrow">
          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <div 
                key={index} 
                className={`card overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'ring-2 ring-brand-500/20' : ''
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-start justify-between text-left"
                >
                  <span className="font-display font-semibold text-neutral-900 pr-8">
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-brand-100 text-brand-600 rotate-180' 
                      : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="px-6 pb-5">
                    <div className="pt-2 border-t border-neutral-100">
                      <p className="text-neutral-600 pt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="section bg-neutral-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-3 mb-4">Still Have Questions?</h2>
            <p className="subheading max-w-2xl mx-auto">
              Here are some additional resources that might help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a
              href="https://www.bb.org.bd/en/index.php/Investfacility/nrbbond"
              target="_blank"
              rel="noopener noreferrer"
              className="card-interactive p-6 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-200 transition-colors">
                <svg className="w-7 h-7 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-neutral-900 mb-2">
                Bangladesh Bank
              </h3>
              <p className="text-sm text-neutral-600">
                Official NRB Bond information and guidelines
              </p>
            </a>

            <a
              href="https://www.bb.org.bd/investfacility/wedbond.php"
              target="_blank"
              rel="noopener noreferrer"
              className="card-interactive p-6 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-neutral-900 mb-2">
                Bond Features PDF
              </h3>
              <p className="text-sm text-neutral-600">
                Download official bond feature documents
              </p>
            </a>

            <a
              href="/guidelines"
              className="card-interactive p-6 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-neutral-900 mb-2">
                Investment Guide
              </h3>
              <p className="text-sm text-neutral-600">
                Step-by-step investment process guide
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="section">
        <div className="container-wide">
          <h2 className="heading-3 text-center mb-8">Quick Reference</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6">
              <h4 className="font-display font-semibold text-neutral-900 mb-3">
                Investment Limit
              </h4>
              <p className="text-3xl font-display font-bold text-brand-600 mb-2">
                ৳1 Crore
              </p>
              <p className="text-sm text-neutral-500">
                Combined maximum across all bonds
              </p>
            </div>

            <div className="card p-6">
              <h4 className="font-display font-semibold text-neutral-900 mb-3">
                Highest Rate
              </h4>
              <p className="text-3xl font-display font-bold text-brand-600 mb-2">
                12%
              </p>
              <p className="text-sm text-neutral-500">
                WEDB for amounts ≤15 Lacs
              </p>
            </div>

            <div className="card p-6">
              <h4 className="font-display font-semibold text-neutral-900 mb-3">
                WEDB Tenure
              </h4>
              <p className="text-3xl font-display font-bold text-brand-600 mb-2">
                5 Years
              </p>
              <p className="text-sm text-neutral-500">
                Early encashment after 6 months
              </p>
            </div>

            <div className="card p-6">
              <h4 className="font-display font-semibold text-neutral-900 mb-3">
                USD Bond Tenure
              </h4>
              <p className="text-3xl font-display font-bold text-blue-600 mb-2">
                3 Years
              </p>
              <p className="text-sm text-neutral-500">
                Early encashment after 1 year
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section bg-brand-600 text-white">
        <div className="container-narrow text-center">
          <h2 className="heading-3 text-white mb-4">
            Need Personalized Help?
          </h2>
          <p className="text-brand-100 mb-8 max-w-xl mx-auto">
            Contact your nearest authorized bank or Bangladesh Bank's customer service 
            for specific questions about your investment.
          </p>
          <a
            href="https://www.bb.org.bd/en/index.php/Investfacility/nrbbond"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-white text-brand-700 hover:bg-brand-50"
          >
            Visit Bangladesh Bank
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;
