import { Layout } from '@/layouts/Layout';
import { BOND_DATA, BondType } from '@/data/bondData';

export const BondsPage = () => {
  const bondOrder: BondType[] = ['WEDB', 'USDIB', 'USDPB'];

  const getBondColors = (bondType: BondType) => ({
    WEDB: { 
      gradient: 'from-brand-500 to-brand-700',
      light: 'bg-brand-50 border-brand-200 text-brand-700',
      text: 'text-brand-600'
    },
    USDIB: { 
      gradient: 'from-blue-500 to-blue-700',
      light: 'bg-blue-50 border-blue-200 text-blue-700',
      text: 'text-blue-600'
    },
    USDPB: { 
      gradient: 'from-purple-500 to-purple-700',
      light: 'bg-purple-50 border-purple-200 text-purple-700',
      text: 'text-purple-600'
    },
  }[bondType]);

  return (
    <Layout
      title="Bond Types"
      description="Compare all Bangladesh NRB Bonds - WEDB, US Dollar Investment Bond, and US Dollar Premium Bond. Features, rates, and eligibility."
    >
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="heading-1 text-white mb-4">
              NRB Bond Types
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Bangladesh offers three types of Diaspora Bonds for Non-Resident Bangladeshis. 
              Each bond has unique features catering to different investment needs.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Comparison */}
      <section className="section">
        <div className="container-wide">
          <h2 className="heading-3 text-center mb-8">Quick Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="table-modern w-full">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="text-center">WEDB</th>
                  <th className="text-center">USDIB</th>
                  <th className="text-center">USDPB</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Currency</td>
                  <td className="text-center">
                    <span className="badge badge-success">BDT</span>
                  </td>
                  <td className="text-center">
                    <span className="badge badge-info">USD</span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-purple-100 text-purple-700 border-purple-200">USD</span>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Tenure</td>
                  <td className="text-center font-mono">5 Years</td>
                  <td className="text-center font-mono">3 Years</td>
                  <td className="text-center font-mono">3 Years</td>
                </tr>
                <tr>
                  <td className="font-medium">Interest Rate</td>
                  <td className="text-center font-mono font-bold text-brand-600">Up to 12%</td>
                  <td className="text-center font-mono font-bold text-blue-600">6.5%</td>
                  <td className="text-center font-mono font-bold text-purple-600">7.5%</td>
                </tr>
                <tr>
                  <td className="font-medium">Principal Receipt</td>
                  <td className="text-center">BDT</td>
                  <td className="text-center">USD</td>
                  <td className="text-center">USD</td>
                </tr>
                <tr>
                  <td className="font-medium">Interest Receipt</td>
                  <td className="text-center">BDT</td>
                  <td className="text-center">USD or BDT</td>
                  <td className="text-center">BDT Equivalent</td>
                </tr>
                <tr>
                  <td className="font-medium">Repatriation</td>
                  <td className="text-center text-sm">Principal only</td>
                  <td className="text-center text-sm font-medium text-blue-600">Principal + Interest</td>
                  <td className="text-center text-sm">Principal only</td>
                </tr>
                <tr>
                  <td className="font-medium">Death Benefit (Max)</td>
                  <td className="text-center">BDT 20 Lacs</td>
                  <td className="text-center">BDT 5 Lacs</td>
                  <td className="text-center">BDT 5 Lacs</td>
                </tr>
                <tr>
                  <td className="font-medium">Tax Status</td>
                  <td className="text-center text-brand-600">Exempt</td>
                  <td className="text-center text-blue-600">Exempt</td>
                  <td className="text-center text-purple-600">Exempt</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Bond Sections */}
      {bondOrder.map((bondType, index) => {
        const bond = BOND_DATA[bondType];
        const colors = getBondColors(bondType);
        
        return (
          <section 
            key={bondType} 
            id={bondType.toLowerCase()}
            className={`section ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}
          >
            <div className="container-wide">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Info Column */}
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.light} text-sm font-medium mb-4`}>
                    {bond.currency} Bond • {bond.tenure} Years
                  </div>
                  
                  <h2 className="heading-2 mb-4">{bond.fullName}</h2>
                  <p className="body-text mb-6">{bond.description}</p>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 rounded-xl bg-neutral-100">
                      <div className={`text-2xl font-display font-bold ${colors.text}`}>
                        {bond.interestRate}%
                      </div>
                      <div className="text-xs text-neutral-500">Interest Rate</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-neutral-100">
                      <div className="text-2xl font-display font-bold text-neutral-900">
                        {bond.tenure}Y
                      </div>
                      <div className="text-xs text-neutral-500">Tenure</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-neutral-100">
                      <div className="text-2xl font-display font-bold text-amber-600">
                        0%
                      </div>
                      <div className="text-xs text-neutral-500">Tax</div>
                    </div>
                  </div>

                  {/* Features */}
                  <h4 className="font-display font-semibold text-neutral-900 mb-3">Key Features</h4>
                  <ul className="space-y-2 mb-6">
                    {bond.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                        <svg className={`w-5 h-5 flex-shrink-0 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Official Link */}
                  <a
                    href={bond.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-medium ${colors.text} hover:underline`}
                  >
                    View Official Information
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Details Column */}
                <div className="card p-6">
                  {/* Denominations */}
                  <div className="mb-6">
                    <h4 className="font-medium text-neutral-900 mb-3">Available Denominations</h4>
                    <div className="flex flex-wrap gap-2">
                      {bond.denominations.map((denom) => (
                        <span key={denom} className="px-3 py-1.5 bg-neutral-100 rounded-lg text-sm font-mono">
                          {bond.currency === 'USD' ? '$' : '৳'}{denom.toLocaleString()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="divider" />

                  {/* Eligibility */}
                  <div className="mb-6">
                    <h4 className="font-medium text-neutral-900 mb-3">Eligibility</h4>
                    <ul className="space-y-2">
                      {bond.eligibility.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="divider" />

                  {/* Death Benefit */}
                  <div className="mb-6">
                    <h4 className="font-medium text-neutral-900 mb-3">Death Risk Benefit</h4>
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-amber-700">Benefit %</span>
                          <p className="font-medium text-amber-900">{bond.deathBenefit.percentage}</p>
                        </div>
                        <div>
                          <span className="text-amber-700">Maximum</span>
                          <p className="font-medium text-amber-900">{bond.deathBenefit.maxAmount}</p>
                        </div>
                      </div>
                      <p className="text-xs text-amber-600 mt-2">
                        *Applicable if wage earner is under {bond.deathBenefit.ageLimit} years at time of death
                      </p>
                    </div>
                  </div>

                  <div className="divider" />

                  {/* Premature Encashment */}
                  <div>
                    <h4 className="font-medium text-neutral-900 mb-3">Premature Encashment Rates</h4>
                    <div className="space-y-2">
                      {bond.prematureEncashmentRates.map((rate, i) => (
                        <div key={i} className="flex justify-between items-center text-sm py-2 border-b border-neutral-100 last:border-0">
                          <span className="text-neutral-600">{rate.period}</span>
                          <span className={`font-mono font-medium ${colors.text}`}>{rate.baseRate}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="section bg-neutral-900 text-white">
        <div className="container-narrow text-center">
          <h2 className="heading-3 text-white mb-4">Ready to Calculate Your Returns?</h2>
          <p className="text-neutral-300 mb-8">
            Use our calculator to see exactly how much you can earn with each bond type.
          </p>
          <a href="/" className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100">
            Go to Calculator
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default BondsPage;
