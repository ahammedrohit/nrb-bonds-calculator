import { useState, useMemo } from 'react';
import { BondType, BOND_DATA } from '@/data/bondData';

interface CalculatorResult {
  principal: number;
  interestRate: number;
  tenure: string;
  totalInterest: number;
  maturityValue: number;
  monthlyEquivalent: number;
}

interface BondCalculatorProps {
  defaultBondType?: BondType;
}

export const BondCalculator = ({ defaultBondType = 'WEDB' }: BondCalculatorProps) => {
  const [selectedBond, setSelectedBond] = useState<BondType>(defaultBondType);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [selectedDenomination, setSelectedDenomination] = useState<number | null>(null);

  const bondInfo = BOND_DATA[selectedBond];

  const formatNumber = (num: number, currency: 'BDT' | 'USD' = 'BDT') => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(num);
    }
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getWEDBInterestRate = (amount: number, months: number): number => {
    let baseRate = 0;
    
    if (months <= 6) return 0;
    
    if (months > 6 && months <= 12) {
      if (amount <= 1500000) baseRate = 8.70;
      else if (amount <= 3000000) baseRate = 7.98;
      else if (amount <= 5000000) baseRate = 7.25;
      else baseRate = 6.53;
    } else if (months > 12 && months <= 18) {
      if (amount <= 1500000) baseRate = 9.45;
      else if (amount <= 3000000) baseRate = 8.66;
      else if (amount <= 5000000) baseRate = 7.88;
      else baseRate = 7.09;
    } else if (months > 18 && months <= 24) {
      if (amount <= 1500000) baseRate = 10.20;
      else if (amount <= 3000000) baseRate = 9.35;
      else if (amount <= 5000000) baseRate = 8.50;
      else baseRate = 7.65;
    } else if (months > 24 && months <= 60) {
      if (amount <= 1500000) baseRate = 11.20;
      else if (amount <= 3000000) baseRate = 10.27;
      else if (amount <= 5000000) baseRate = 9.33;
      else baseRate = 8.40;
    } else {
      if (amount <= 1500000) baseRate = 12.00;
      else if (amount <= 3000000) baseRate = 11.00;
      else if (amount <= 5000000) baseRate = 10.00;
      else baseRate = 9.00;
    }
    
    return baseRate;
  };

  const calculateResults = useMemo((): CalculatorResult | null => {
    const amount = parseFloat(investmentAmount.replace(/,/g, ''));
    if (isNaN(amount) || amount <= 0) return null;

    let interestRate: number;
    let tenureMonths: number;
    let tenureLabel: string;

    if (selectedBond === 'WEDB') {
      tenureMonths = 60;
      tenureLabel = '5 Years';
      interestRate = getWEDBInterestRate(amount, tenureMonths);
    } else {
      tenureMonths = 36;
      tenureLabel = '3 Years';
      interestRate = bondInfo.interestRate;
    }

    const totalInterest = amount * (interestRate / 100) * (tenureMonths / 12);
    const maturityValue = amount + totalInterest;
    const monthlyEquivalent = totalInterest / tenureMonths;

    return {
      principal: amount,
      interestRate,
      tenure: tenureLabel,
      totalInterest,
      maturityValue,
      monthlyEquivalent,
    };
  }, [investmentAmount, selectedBond, bondInfo.interestRate]);

  const handleAmountChange = (value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (cleanValue === '') {
      setInvestmentAmount('');
      setSelectedDenomination(null);
      return;
    }
    const numValue = parseInt(cleanValue);
    setInvestmentAmount(numValue.toLocaleString());
    setSelectedDenomination(null);
  };

  const handleDenominationClick = (amount: number) => {
    const currentAmount = parseInt(investmentAmount.replace(/,/g, '') || '0');
    const newAmount = currentAmount + amount;
    setInvestmentAmount(newAmount.toLocaleString());
    setSelectedDenomination(amount);
  };

  const clearAmount = () => {
    setInvestmentAmount('');
    setSelectedDenomination(null);
  };

  return (
    <div className="card p-6 md:p-8">
      {/* Bond Type Selector */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          Select Bond Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.keys(BOND_DATA) as BondType[]).map((bondType) => {
            const bond = BOND_DATA[bondType];
            const isSelected = selectedBond === bondType;
            return (
              <button
                key={bondType}
                onClick={() => {
                  setSelectedBond(bondType);
                  clearAmount();
                }}
                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/50'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 bg-white dark:bg-neutral-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      {bondType}
                    </span>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mt-1 text-sm leading-tight">
                      {bond.name}
                    </h3>
                  </div>
                  <span className={`badge ${
                    bond.currency === 'USD' ? 'badge-info' : 'badge-success'
                  }`}>
                    {bond.currency}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-display font-bold text-brand-600 dark:text-brand-400">
                    {bond.interestRate}%
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    / {bond.tenure} {bond.tenure === 1 ? 'year' : 'years'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Investment Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          Investment Amount ({bondInfo.currency})
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 font-medium">
            {bondInfo.currency === 'USD' ? '$' : '৳'}
          </span>
          <input
            type="text"
            value={investmentAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="Enter amount"
            className="input-lg pl-10 pr-20 font-mono text-lg"
          />
          {investmentAmount && (
            <button
              onClick={clearAmount}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          Quick Add Denomination
        </label>
        <div className="flex flex-wrap gap-2">
          {bondInfo.denominations.map((amount) => (
            <button
              key={amount}
              onClick={() => handleDenominationClick(amount)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                selectedDenomination === amount
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300'
                  : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700'
              }`}
            >
              {bondInfo.currency === 'USD' ? '$' : '৳'}
              {amount.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {calculateResults && (
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700 animate-fade-in">
          <h3 className="font-display font-semibold text-neutral-900 dark:text-white mb-4">
            Investment Returns
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="stat-card">
              <div className="stat-label">Principal</div>
              <div className="stat-value text-xl md:text-2xl">
                {formatNumber(calculateResults.principal, bondInfo.currency)}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Interest Rate</div>
              <div className="stat-value text-xl md:text-2xl text-brand-600 dark:text-brand-400">
                {calculateResults.interestRate}%
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Interest</div>
              <div className="stat-value text-xl md:text-2xl">
                {formatNumber(calculateResults.totalInterest, bondInfo.currency)}
              </div>
            </div>
            <div className="stat-card bg-brand-50 dark:bg-brand-950/50 border-brand-200 dark:border-brand-800">
              <div className="stat-label text-brand-600 dark:text-brand-400">Maturity Value</div>
              <div className="stat-value text-xl md:text-2xl text-brand-700 dark:text-brand-300">
                {formatNumber(calculateResults.maturityValue, bondInfo.currency)}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between sm:flex-col sm:gap-1">
                <span className="text-neutral-500 dark:text-neutral-400">Tenure</span>
                <span className="font-medium text-neutral-900 dark:text-white">{calculateResults.tenure}</span>
              </div>
              <div className="flex justify-between sm:flex-col sm:gap-1">
                <span className="text-neutral-500 dark:text-neutral-400">Monthly Equivalent</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  ~{formatNumber(calculateResults.monthlyEquivalent, bondInfo.currency)}/mo
                </span>
              </div>
              <div className="flex justify-between sm:flex-col sm:gap-1">
                <span className="text-neutral-500 dark:text-neutral-400">Tax Status</span>
                <span className="font-medium text-brand-600 dark:text-brand-400">Tax Exempt</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bond Features */}
      <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <h4 className="font-medium text-neutral-900 dark:text-white mb-3">Key Features</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {bondInfo.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <svg className="w-5 h-5 text-brand-500 dark:text-brand-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BondCalculator;
