import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/layouts/Layout';

// Bond selector quiz data
const quizQuestions = [
  {
    id: 'currency_preference',
    question: 'Do you prefer to receive your returns in USD or BDT?',
    options: [
      { label: 'USD (want to protect against currency fluctuation)', value: 'usd', points: { USDIB: 3, USDPB: 2, WEDB: 0 } },
      { label: 'BDT (planning to use money in Bangladesh)', value: 'bdt', points: { USDIB: 0, USDPB: 1, WEDB: 3 } },
      { label: 'No strong preference', value: 'neutral', points: { USDIB: 1, USDPB: 1, WEDB: 1 } },
    ],
  },
  {
    id: 'repatriation',
    question: 'Do you need to repatriate (send back) your interest earnings abroad?',
    options: [
      { label: 'Yes, I need both principal and interest back in USD', value: 'full', points: { USDIB: 3, USDPB: 0, WEDB: 0 } },
      { label: 'Only principal repatriation is enough', value: 'principal', points: { USDIB: 1, USDPB: 2, WEDB: 2 } },
      { label: 'No, I want to keep/spend money in Bangladesh', value: 'none', points: { USDIB: 0, USDPB: 1, WEDB: 3 } },
    ],
  },
  {
    id: 'investment_horizon',
    question: 'How long can you keep your money invested?',
    options: [
      { label: 'Up to 3 years', value: 'short', points: { USDIB: 2, USDPB: 2, WEDB: 0 } },
      { label: '5 years or more', value: 'long', points: { USDIB: 0, USDPB: 0, WEDB: 3 } },
      { label: 'Flexible (might need to withdraw early)', value: 'flexible', points: { USDIB: 1, USDPB: 1, WEDB: 2 } },
    ],
  },
  {
    id: 'priority',
    question: 'What\'s most important to you?',
    options: [
      { label: 'Highest interest rate possible', value: 'returns', points: { USDIB: 0, USDPB: 1, WEDB: 3 } },
      { label: 'Currency protection (USD)', value: 'protection', points: { USDIB: 3, USDPB: 2, WEDB: 0 } },
      { label: 'Death benefit for family protection', value: 'family', points: { USDIB: 1, USDPB: 1, WEDB: 3 } },
    ],
  },
  {
    id: 'amount',
    question: 'How much are you planning to invest?',
    options: [
      { label: 'Up to 15 Lacs BDT (for maximum WEDB rates)', value: 'small', points: { USDIB: 0, USDPB: 0, WEDB: 3 } },
      { label: '15-50 Lacs BDT', value: 'medium', points: { USDIB: 2, USDPB: 2, WEDB: 1 } },
      { label: 'More than 50 Lacs BDT', value: 'large', points: { USDIB: 2, USDPB: 2, WEDB: 0 } },
    ],
  },
];

const bondRecommendations = {
  WEDB: {
    name: 'Wage Earner Development Bond (WEDB)',
    tagline: 'Best for Maximum Returns in BDT',
    color: 'brand',
    reasons: [
      'Highest interest rate up to 12% for amounts ≤15 Lacs',
      'Best death benefit coverage (40-50%, up to ৳20 Lacs)',
      '5-year tenure with flexible early withdrawal after 6 months',
      'Perfect if you plan to use money in Bangladesh',
    ],
  },
  USDIB: {
    name: 'US Dollar Investment Bond (USDIB)',
    tagline: 'Best for Full USD Repatriation',
    color: 'blue',
    reasons: [
      'Both principal and interest can be repatriated in USD',
      'Protection against BDT currency depreciation',
      '3-year tenure - shorter commitment period',
      'Ideal for expats who may return to their host country',
    ],
  },
  USDPB: {
    name: 'US Dollar Premium Bond (USDPB)',
    tagline: 'Best Balance of USD & Returns',
    color: 'purple',
    reasons: [
      'Higher rate (7.5%) than USDIB (6.5%)',
      'Principal repatriable in USD',
      'Interest in BDT equivalent - good if you have BDT expenses',
      'Best for those who want some USD protection with better returns',
    ],
  },
};

export const AboutPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const [scores, setScores] = useState({ USDIB: 0, USDPB: 0, WEDB: 0 });

  const handleAnswer = (questionId: string, optionValue: string, points: { USDIB: number; USDPB: number; WEDB: number }) => {
    setAnswers({ ...answers, [questionId]: optionValue });
    setScores({
      USDIB: scores.USDIB + points.USDIB,
      USDPB: scores.USDPB + points.USDPB,
      WEDB: scores.WEDB + points.WEDB,
    });

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setScores({ USDIB: 0, USDPB: 0, WEDB: 0 });
  };

  const getRecommendation = () => {
    const maxScore = Math.max(scores.WEDB, scores.USDIB, scores.USDPB);
    if (scores.WEDB === maxScore) return 'WEDB';
    if (scores.USDIB === maxScore) return 'USDIB';
    return 'USDPB';
  };

  return (
    <Layout
      title="About NRB Bonds"
      description="Learn everything about Bangladesh NRB Bonds - what they are, why invest, and which bond is right for you. Complete guide for Non-Resident Bangladeshis."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white py-20 md:py-28">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-brand-200 text-sm font-medium">For Non-Resident Bangladeshis</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              What are <span className="text-brand-200">NRB Bonds?</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-100 leading-relaxed max-w-3xl mx-auto">
              Government-backed savings instruments designed exclusively for Bangladeshi expatriates 
              and diaspora. Secure your foreign earnings with attractive returns while contributing 
              to Bangladesh's development.
            </p>
          </div>
        </div>
      </section>

      {/* What are NRB Bonds */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand-600 dark:text-brand-400 font-medium text-sm uppercase tracking-wider">Understanding NRB Bonds</span>
              <h2 className="heading-2 mt-2 mb-6">A Safe Haven for Your Foreign Earnings</h2>
              <p className="body-text mb-6">
                NRB Bonds are <strong className="text-neutral-900 dark:text-white">government-guaranteed savings bonds</strong> issued by 
                the Internal Resources Division (IRD) and supervised by the National Savings Directorate (NSD) 
                under Bangladesh's Ministry of Finance.
              </p>
              <p className="body-text mb-6">
                These bonds were specifically created to help <strong className="text-neutral-900 dark:text-white">Non-Resident Bangladeshis (NRBs)</strong> invest 
                their hard-earned foreign currency in their homeland while enjoying attractive interest rates, 
                tax benefits, and the security of government backing.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="badge badge-brand">Government Backed</span>
                <span className="badge badge-blue">Tax Exempt</span>
                <span className="badge badge-purple">High Returns</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-neutral-900 dark:text-white mb-2">100% Secure</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Government guaranteed principal & interest</p>
              </div>
              
              <div className="card p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-neutral-900 dark:text-white mb-2">Up to 12%</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Annual interest rate on WEDB</p>
              </div>
              
              <div className="card p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-neutral-900 dark:text-white mb-2">Tax Free</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Income tax exempted on returns</p>
              </div>
              
              <div className="card p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-neutral-900 dark:text-white mb-2">Repatriable</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Send principal back abroad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="section bg-neutral-50 dark:bg-neutral-900">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-brand-600 dark:text-brand-400 font-medium text-sm uppercase tracking-wider">Benefits</span>
            <h2 className="heading-2 mt-2 mb-4">Why Should You Invest?</h2>
            <p className="subheading max-w-2xl mx-auto">
              NRB Bonds offer unique advantages that make them an attractive option for overseas Bangladeshis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Benefit 1 */}
            <div className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-neutral-900 dark:text-white mb-2">Higher Returns Than Banks</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                WEDB offers up to 12% annual interest - significantly higher than most bank fixed deposits 
                in Bangladesh or savings accounts abroad.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-neutral-900 dark:text-white mb-2">Zero Default Risk</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                These are sovereign bonds backed by the Government of Bangladesh. Your principal and 
                interest are 100% guaranteed - no risk of losing your money.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-neutral-900 dark:text-white mb-2">Complete Tax Exemption</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Both principal and interest income from NRB Bonds are fully exempted from Bangladesh 
                income tax - your returns are 100% yours.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-neutral-900 dark:text-white mb-2">Family Protection</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                WEDB offers death-risk benefit of 40-50% of investment (up to ৳20 Lacs) for family 
                protection if the wage earner passes away.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-neutral-900 dark:text-white mb-2">Repatriation Facility</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                USD bonds allow you to repatriate your principal (and interest for USDIB) back to your 
                country of residence in US Dollars.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-neutral-900 dark:text-white mb-2">Contribute to Bangladesh</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Your investment helps fund national development projects - earn returns while 
                contributing to your homeland's growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bond Comparison - Which to Choose */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-brand-600 dark:text-brand-400 font-medium text-sm uppercase tracking-wider">Comparison</span>
            <h2 className="heading-2 mt-2 mb-4">Which Bond is Right for You?</h2>
            <p className="subheading max-w-2xl mx-auto">
              Each bond serves different needs. Here's a quick comparison to help you decide.
            </p>
          </div>

          {/* Quick Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* WEDB Card */}
            <div className="card p-6 border-t-4 border-brand-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center">
                  <span className="text-lg font-bold text-brand-600 dark:text-brand-400">৳</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-neutral-900 dark:text-white">WEDB</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">BDT Bond</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Interest Rate</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">Up to 12%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Tenure</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">5 Years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Repatriation</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">Principal Only</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Death Benefit</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">Up to ৳20 Lacs</span>
                </div>
              </div>
              <div className="p-3 bg-brand-50 dark:bg-brand-900/30 rounded-lg">
                <p className="text-sm text-brand-700 dark:text-brand-300">
                  <strong>Best for:</strong> Maximum returns, long-term investment, family protection
                </p>
              </div>
            </div>

            {/* USDIB Card */}
            <div className="card p-6 border-t-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">$</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-neutral-900 dark:text-white">USDIB</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">USD Investment Bond</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Interest Rate</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">6.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Tenure</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">3 Years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Repatriation</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Principal + Interest</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Death Benefit</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">Up to ৳5 Lacs</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Best for:</strong> Full USD repatriation, currency protection, shorter term
                </p>
              </div>
            </div>

            {/* USDPB Card */}
            <div className="card p-6 border-t-4 border-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">$</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-neutral-900 dark:text-white">USDPB</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">USD Premium Bond</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Interest Rate</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">7.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Tenure</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">3 Years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Repatriation</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">Principal Only</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Death Benefit</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">Up to ৳5 Lacs</span>
                </div>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  <strong>Best for:</strong> Better USD returns, hybrid (USD principal, BDT interest)
                </p>
              </div>
            </div>
          </div>

          {/* Scenario-based recommendations */}
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-8">
            <h3 className="heading-4 mb-6 text-center">Choose Based on Your Situation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center">
                    <span className="text-brand-600 dark:text-brand-400 font-bold">1</span>
                  </div>
                  <h4 className="font-display font-semibold text-neutral-900 dark:text-white">Planning to Settle in Bangladesh</h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  If you're planning to return to Bangladesh or build a house/start a business there, 
                  you'll need BDT. WEDB gives you the highest returns in Taka.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Recommended: WEDB
                </span>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                  </div>
                  <h4 className="font-display font-semibold text-neutral-900 dark:text-white">Staying Abroad Long-term</h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  If you'll continue living abroad and want to eventually bring your money back, 
                  USDIB lets you repatriate both principal and interest in USD.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Recommended: USDIB
                </span>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                  </div>
                  <h4 className="font-display font-semibold text-neutral-900 dark:text-white">Want Best of Both Worlds</h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  If you want USD protection for principal but don't mind receiving interest in BDT 
                  (maybe to support family in Bangladesh), USDPB offers higher rates than USDIB.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Recommended: USDPB
                </span>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">4</span>
                  </div>
                  <h4 className="font-display font-semibold text-neutral-900 dark:text-white">Worried About Currency Depreciation</h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  If you're concerned about BDT losing value against USD, USD bonds protect your 
                  principal. Even if BDT depreciates, your USD remains intact.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Recommended: USDIB or USDPB
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bond Selector Quiz */}
      <section className="section bg-gradient-to-br from-brand-50 to-blue-50 dark:from-neutral-900 dark:to-neutral-800">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="text-brand-600 dark:text-brand-400 font-medium text-sm uppercase tracking-wider">Interactive Tool</span>
            <h2 className="heading-2 mt-2 mb-4">Find Your Ideal Bond</h2>
            <p className="subheading">
              Answer a few quick questions and we'll recommend the best bond for your situation
            </p>
          </div>

          <div className="card p-8 max-w-2xl mx-auto">
            {!showResult ? (
              <>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                    <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-600 transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-xl font-display font-semibold text-neutral-900 dark:text-white mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option.value, option.points)}
                      className="w-full p-4 text-left rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
                    >
                      <span className="text-neutral-900 dark:text-white font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Result */}
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                    getRecommendation() === 'WEDB' ? 'bg-brand-100 dark:bg-brand-900/50' :
                    getRecommendation() === 'USDIB' ? 'bg-blue-100 dark:bg-blue-900/50' :
                    'bg-purple-100 dark:bg-purple-900/50'
                  }`}>
                    <svg className={`w-10 h-10 ${
                      getRecommendation() === 'WEDB' ? 'text-brand-600 dark:text-brand-400' :
                      getRecommendation() === 'USDIB' ? 'text-blue-600 dark:text-blue-400' :
                      'text-purple-600 dark:text-purple-400'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">
                    We Recommend
                  </h3>
                  <p className={`text-xl font-semibold mb-2 ${
                    getRecommendation() === 'WEDB' ? 'text-brand-600 dark:text-brand-400' :
                    getRecommendation() === 'USDIB' ? 'text-blue-600 dark:text-blue-400' :
                    'text-purple-600 dark:text-purple-400'
                  }`}>
                    {bondRecommendations[getRecommendation()].name}
                  </p>
                  <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                    {bondRecommendations[getRecommendation()].tagline}
                  </p>

                  <div className="text-left bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6 mb-6">
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Why this bond?</h4>
                    <ul className="space-y-2">
                      {bondRecommendations[getRecommendation()].reasons.map((reason, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/" className="btn-primary">
                      Calculate Returns
                    </Link>
                    <button onClick={resetQuiz} className="btn-outline">
                      Take Quiz Again
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-brand-600 dark:text-brand-400 font-medium text-sm uppercase tracking-wider">Eligibility</span>
            <h2 className="heading-2 mt-2 mb-4">Who Can Invest?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Eligible */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-neutral-900 dark:text-white">Eligible Investors</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  Bangladeshi nationals residing abroad
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  Bangladeshi-origin foreign nationals living abroad
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  Government employees working in Bangladesh missions abroad
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  Employees of statutory/autonomous bodies working abroad on lien
                </li>
              </ul>
            </div>

            {/* Not Eligible */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-neutral-900 dark:text-white">Not Eligible</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  Pension earnings from employment abroad
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  Post-death service benefits from abroad
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  Bangladeshi crew/pilots of overseas shipping companies
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  Crew of Bangladeshi shipping companies posted abroad
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-brand-600 text-white">
        <div className="container-narrow text-center">
          <h2 className="heading-3 text-white mb-4">Ready to Start Investing?</h2>
          <p className="text-brand-100 mb-8 max-w-xl mx-auto">
            Use our calculator to see exactly how much you can earn, then follow our step-by-step 
            guide to purchase your bonds.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary bg-white text-brand-700 hover:bg-brand-50">
              Calculate Returns
            </Link>
            <Link to="/guidelines" className="btn-outline-dark">
              Investment Guide
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
