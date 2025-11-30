import { Layout } from '@/layouts/Layout';
import { useState } from 'react';

// Glossary of financial terms with simple explanations
const GLOSSARY: Record<string, { definition: string; example?: string }> = {
  'tenure': {
    definition: 'The length of time you must keep your money invested in the bond before it matures.',
    example: 'A 5-year tenure means you invest today and get your full returns after 5 years.',
  },
  'maturity': {
    definition: 'The date when your bond investment period ends and you receive your principal plus all interest.',
    example: 'If you invest in January 2024 in a 3-year bond, maturity is January 2027.',
  },
  'principal': {
    definition: 'The original amount of money you invest, before any interest is added.',
    example: 'If you invest ৳5 Lakh, that ৳5 Lakh is your principal.',
  },
  'interest rate': {
    definition: 'The percentage of your investment you earn as profit each year.',
    example: '12% interest on ৳1 Lakh means you earn ৳12,000 per year.',
  },
  'repatriation': {
    definition: 'Sending your money back to the country where you live/work abroad.',
    example: 'If you work in USA and want to transfer your bond earnings there, that\'s repatriation.',
  },
  'premature encashment': {
    definition: 'Withdrawing your money before the bond\'s tenure ends (before maturity date).',
    example: 'Cashing out a 5-year bond after 2 years is premature encashment.',
  },
  'encashment': {
    definition: 'Converting your bond into cash - withdrawing your money.',
    example: 'When you go to the bank to get your bond money, you\'re encashing it.',
  },
  'denomination': {
    definition: 'The fixed amounts in which bonds are available for purchase.',
    example: 'If denominations are ৳25,000 and ৳50,000, you can only buy in those amounts.',
  },
  'nominee': {
    definition: 'The person you choose to receive your bond money if something happens to you.',
    example: 'You can nominate your spouse or children to receive the bond.',
  },
  'nrfc account': {
    definition: 'Non-Resident Foreign Currency Account - a bank account for Bangladeshis abroad to hold foreign currency.',
    example: 'You deposit USD/GBP/EUR in this account and can convert to BDT when needed.',
  },
  'nrt account': {
    definition: 'Non-Resident Taka Account - a bank account for Bangladeshis abroad to hold Bangladeshi Taka.',
    example: 'Your foreign remittance converted to Taka is kept in NRT account.',
  },
  'remittance': {
    definition: 'Money sent by someone working abroad to their home country (Bangladesh).',
    example: 'When you send your salary from abroad to family in Bangladesh, that\'s remittance.',
  },
  'tax exempt': {
    definition: 'You don\'t have to pay any income tax on this money.',
    example: 'NRB Bond interest is tax exempt - you keep 100% of your earnings.',
  },
  'death benefit': {
    definition: 'Extra money paid to your family if you pass away while holding the bond.',
    example: 'WEDB pays up to 50% extra (max ৳20 Lakh) to your nominee if you die.',
  },
  'sovereign bond': {
    definition: 'A bond issued and guaranteed by the government - extremely safe investment.',
    example: 'NRB Bonds are sovereign bonds backed by Bangladesh government.',
  },
  'compound interest': {
    definition: 'Earning interest on your interest - your money grows faster over time.',
    example: '৳1 Lakh at 10% becomes ৳1.1 Lakh in year 1, then interest is calculated on ৳1.1 Lakh.',
  },
  'simple interest': {
    definition: 'Interest calculated only on your original investment, not on accumulated interest.',
    example: '৳1 Lakh at 10% simple interest earns ৳10,000 every year.',
  },
  'bdt': {
    definition: 'Bangladeshi Taka - the official currency of Bangladesh.',
    example: '৳100 BDT is approximately $1 USD (rates vary).',
  },
  'usd': {
    definition: 'United States Dollar - the currency of America, widely used internationally.',
    example: 'USD bonds let you keep your money in dollars.',
  },
  'lakh': {
    definition: 'A South Asian numbering unit equal to 100,000 (one hundred thousand).',
    example: '5 Lakh = 500,000 (five hundred thousand).',
  },
  'crore': {
    definition: 'A South Asian numbering unit equal to 10,000,000 (ten million).',
    example: '1 Crore = 100 Lakh = 10,000,000 (ten million).',
  },
  'yield': {
    definition: 'The total return you get from your investment, expressed as a percentage.',
    example: 'A bond with 12% yield gives you ৳12,000 profit per year on ৳1 Lakh.',
  },
  'diaspora': {
    definition: 'People who have moved away from their home country but maintain connections to it.',
    example: 'Bangladeshis living in USA, UK, Middle East are part of the Bangladeshi diaspora.',
  },
};

export const GlossaryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const sortedTerms = Object.entries(GLOSSARY)
    .sort(([a], [b]) => a.localeCompare(b))
    .filter(([term, data]) => 
      term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Group by first letter
  const groupedTerms = sortedTerms.reduce((acc, [term, data]) => {
    const firstLetter = term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push({ term, ...data });
    return acc;
  }, {} as Record<string, Array<{ term: string; definition: string; example?: string }>>);

  return (
    <Layout
      title="Bond Terms Glossary"
      description="Simple explanations of financial terms used in NRB Bonds. Understand tenure, maturity, repatriation, principal, interest rates, and more in plain language."
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <svg className="w-5 h-5 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-purple-200 text-sm font-medium">Learn the Terms</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Bond Terms <span className="text-purple-200">Glossary</span>
            </h1>
            <p className="text-lg text-purple-100 leading-relaxed max-w-2xl mx-auto">
              Don't let complicated financial jargon confuse you. Here's every term explained 
              in simple, everyday language that anyone can understand.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 border-b border-neutral-200 dark:border-neutral-800 sticky top-16 md:top-18 bg-white dark:bg-neutral-950 z-40">
        <div className="container-wide">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for a term..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-12 w-full"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mt-3">
              {sortedTerms.length} terms found
            </p>
          </div>
        </div>
      </section>

      {/* Glossary List */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            {Object.keys(groupedTerms).length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">No terms found</h3>
                <p className="text-neutral-500 dark:text-neutral-400">Try a different search term</p>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(groupedTerms).map(([letter, terms]) => (
                  <div key={letter}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-xl font-display font-bold text-brand-600 dark:text-brand-400">
                        {letter}
                      </span>
                      <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                    </div>
                    
                    <div className="space-y-4">
                      {terms.map(({ term, definition, example }) => (
                        <div key={term} className="card p-6" id={term.toLowerCase().replace(/\s+/g, '-')}>
                          <h3 className="font-display font-semibold text-lg text-neutral-900 dark:text-white mb-2 capitalize">
                            {term}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                            {definition}
                          </p>
                          {example && (
                            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                              <p className="text-sm">
                                <span className="font-medium text-brand-600 dark:text-brand-400">Example: </span>
                                <span className="text-neutral-600 dark:text-neutral-400">{example}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="section bg-neutral-50 dark:bg-neutral-900">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-3 mb-4">Quick Reference</h2>
            <p className="subheading max-w-2xl mx-auto">
              Common abbreviations you'll see when dealing with NRB Bonds
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="card p-4 text-center">
              <span className="text-2xl font-display font-bold text-brand-600 dark:text-brand-400">WEDB</span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Wage Earner Development Bond</p>
            </div>
            <div className="card p-4 text-center">
              <span className="text-2xl font-display font-bold text-blue-600 dark:text-blue-400">USDIB</span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">US Dollar Investment Bond</p>
            </div>
            <div className="card p-4 text-center">
              <span className="text-2xl font-display font-bold text-purple-600 dark:text-purple-400">USDPB</span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">US Dollar Premium Bond</p>
            </div>
            <div className="card p-4 text-center">
              <span className="text-2xl font-display font-bold text-amber-600 dark:text-amber-400">NRB</span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Non-Resident Bangladeshi</p>
            </div>
            <div className="card p-4 text-center">
              <span className="text-2xl font-display font-bold text-green-600 dark:text-green-400">NRFC</span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Non-Resident Foreign Currency</p>
            </div>
            <div className="card p-4 text-center">
              <span className="text-2xl font-display font-bold text-red-600 dark:text-red-400">NRT</span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Non-Resident Taka</p>
            </div>
            <div className="card p-4 text-center">
              <span className="text-2xl font-display font-bold text-cyan-600 dark:text-cyan-400">BDT</span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Bangladeshi Taka</p>
            </div>
            <div className="card p-4 text-center">
              <span className="text-2xl font-display font-bold text-indigo-600 dark:text-indigo-400">NSD</span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">National Savings Directorate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tip */}
    </Layout>
  );
};

export default GlossaryPage;
