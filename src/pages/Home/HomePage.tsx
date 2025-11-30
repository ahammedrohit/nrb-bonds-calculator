import { useState } from 'react';
import { Layout } from '@/layouts/Layout';
import { BondCalculator } from '@/components/Calculator/BondCalculator';
import { WEDBCalculator } from '@/components/Calculator/WEDBCalculator';
import { USDCalculator } from '@/components/Calculator/USDCalculator';
import { BOND_DATA, BondType } from '@/data/bondData';
import { NavLink } from 'react-router-dom';

type CalculatorView = 'quick' | 'WEDB' | 'USDIB' | 'USDPB';

export const HomePage = () => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorView>('quick');

  const calculatorTabs = [
    { id: 'quick' as const, label: 'Quick Calculate', icon: '⚡' },
    { id: 'WEDB' as const, label: 'WEDB', icon: '🇧🇩' },
    { id: 'USDIB' as const, label: 'US$ Investment', icon: '💵' },
    { id: 'USDPB' as const, label: 'US$ Premium', icon: '💹' },
  ];

  return (
    <Layout
      title="Calculator"
      description="Calculate returns on Bangladesh NRB Bonds including WEDB, USDIB, and USDPB with official rates."
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100 dark:bg-brand-900/30 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="relative container-wide py-12 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Updated November 2025
            </div>
            
            <h1 className="heading-1 mb-4">
              Bangladesh Diaspora
              <span className="text-brand-600 dark:text-brand-400"> Bond Calculator</span>
            </h1>
            
            <p className="subheading mb-8 max-w-2xl">
              Calculate your investment returns on NRB Bonds. Get up to <span className="font-semibold text-brand-600 dark:text-brand-400">12% tax-free</span> returns on Wage Earner Development Bond.
            </p>

            <div className="flex flex-wrap gap-3">
              <NavLink to="/guidelines" className="btn-secondary">
                Investment Guide
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </NavLink>
              <NavLink to="/bonds" className="btn-ghost">
                Compare Bonds
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-8 md:-mt-10 z-10">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { value: '12%', label: 'Max WEDB Rate', color: 'text-brand-600 dark:text-brand-400' },
              { value: '7.5%', label: 'USD Premium Rate', color: 'text-purple-600 dark:text-purple-400' },
              { value: '6.5%', label: 'USD Investment Rate', color: 'text-blue-600 dark:text-blue-400' },
              { value: '100%', label: 'Tax Exempt', color: 'text-amber-600 dark:text-amber-400' },
            ].map((stat, i) => (
              <div key={i} className="card p-4 md:p-6 text-center">
                <div className={`text-2xl md:text-3xl font-display font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section">
        <div className="container-wide">
          {/* Calculator Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {calculatorTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCalculator(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCalculator === tab.id
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-lg'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Calculator Content */}
          <div className="max-w-4xl mx-auto">
            {activeCalculator === 'quick' && <BondCalculator />}
            {activeCalculator === 'WEDB' && <WEDBCalculator />}
            {activeCalculator === 'USDIB' && <USDCalculator bondType="USDIB" />}
            {activeCalculator === 'USDPB' && <USDCalculator bondType="USDPB" />}
          </div>
        </div>
      </section>

      {/* Bond Comparison Section */}
      <section className="section bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Compare All NRB Bonds</h2>
            <p className="subheading max-w-2xl mx-auto">
              Choose the right bond based on your investment goals and currency preference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.keys(BOND_DATA) as BondType[]).map((bondType) => {
              const bond = BOND_DATA[bondType];
              const colors = {
                WEDB: { bg: 'bg-brand-50 dark:bg-brand-950/50', border: 'border-brand-200 dark:border-brand-800', text: 'text-brand-700 dark:text-brand-400', badge: 'badge-success' },
                USDIB: { bg: 'bg-blue-50 dark:bg-blue-950/50', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-400', badge: 'badge-info' },
                USDPB: { bg: 'bg-purple-50 dark:bg-purple-950/50', border: 'border-purple-200 dark:border-purple-800', text: 'text-purple-700 dark:text-purple-400', badge: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' },
              }[bondType];

              return (
                <div key={bondType} className="card-interactive p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`badge ${colors.badge} mb-2`}>{bond.currency}</span>
                      <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white">
                        {bond.name}
                      </h3>
                    </div>
                    <div className={`text-3xl font-display font-bold ${colors.text}`}>
                      {bond.interestRate}%
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                    {bond.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500 dark:text-neutral-400">Tenure</span>
                      <span className="font-medium dark:text-neutral-200">{bond.tenure} Years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500 dark:text-neutral-400">Repatriation</span>
                      <span className="font-medium text-xs dark:text-neutral-200">{bond.repatriation.split('(')[0]}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500 dark:text-neutral-400">Tax Status</span>
                      <span className="font-medium text-brand-600 dark:text-brand-400">Exempt</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveCalculator(bondType)}
                    className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${colors.bg} ${colors.text} hover:opacity-80`}
                  >
                    Calculate {bondType}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <NavLink to="/bonds" className="btn-outline">
              View Detailed Comparison
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-narrow text-center">
          <h2 className="heading-3 mb-4">Ready to Invest?</h2>
          <p className="subheading mb-8">
            Learn about the investment process, required documents, and authorized banks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NavLink to="/guidelines" className="btn-primary">
              Read Investment Guide
            </NavLink>
            <a
              href="https://www.bb.org.bd/en/index.php/Investfacility/nrbbond"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Visit Bangladesh Bank
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

export default HomePage;
