import { useState, useMemo } from 'react';
import { BOND_DATA, WEDB_PREMATURE_RATES } from '@/data/bondData';

interface PrematureEncashmentResult {
  period: string;
  rate: number;
  interest: number;
  total: number;
  lossVsMaturity: number;
}

export const WEDBCalculator = () => {
  const [amount, setAmount] = useState<string>('');
  const bondInfo = BOND_DATA.WEDB;

  const formatBDT = (num: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getInterestRate = (investAmount: number, minMonths: number): number => {
    const rateData = WEDB_PREMATURE_RATES.find(
      (r) => r.minMonths === minMonths
    );
    if (!rateData || !rateData.reducedRates) return rateData?.baseRate || 0;

    for (const tier of rateData.reducedRates) {
      if (investAmount <= tier.maxAmount) {
        return tier.rate;
      }
    }
    return rateData.baseRate;
  };

  const calculations = useMemo((): PrematureEncashmentResult[] | null => {
    const investAmount = parseFloat(amount.replace(/,/g, ''));
    if (isNaN(investAmount) || investAmount <= 0) return null;

    const maturityRate = getInterestRate(investAmount, 60);
    const maturityInterest = investAmount * (maturityRate / 100) * 5;

    return WEDB_PREMATURE_RATES.map((period) => {
      const rate = getInterestRate(investAmount, period.minMonths);
      const years = period.minMonths / 12;
      const interest = investAmount * (rate / 100) * years;
      const total = investAmount + interest;
      
      let potentialMaturityInterest = investAmount * (maturityRate / 100) * 5;
      const lossVsMaturity = potentialMaturityInterest - interest;

      return {
        period: period.period,
        rate,
        interest: Math.round(interest),
        total: Math.round(total),
        lossVsMaturity: Math.round(lossVsMaturity),
      };
    });
  }, [amount]);

  const handleAmountChange = (value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (cleanValue === '') {
      setAmount('');
      return;
    }
    const numValue = parseInt(cleanValue);
    setAmount(numValue.toLocaleString());
  };

  return (
    <div className="card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
          <span className="text-brand-700 font-display font-bold">WE</span>
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-neutral-900">
            Wage Earner Development Bond
          </h2>
          <p className="text-sm text-neutral-500">
            5-Year Bond • Up to 12% Interest • Tax Free
          </p>
        </div>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Investment Amount (BDT)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">
            ৳
          </span>
          <input
            type="text"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="Enter amount"
            className="input-lg pl-10 font-mono text-lg"
          />
        </div>
      </div>

      {/* Quick Denominations */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {bondInfo.denominations.map((denom) => (
            <button
              key={denom}
              onClick={() => setAmount(denom.toLocaleString())}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
            >
              ৳{denom.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Interest Rate Tiers */}
      <div className="mb-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
        <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Interest Rate Tiers
        </h4>
        <p className="text-sm text-amber-700 mb-3">
          WEDB interest rates vary based on investment amount:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <div className="font-bold text-amber-900">≤15 Lacs</div>
            <div className="text-amber-700">12%</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <div className="font-bold text-amber-900">15-30 Lacs</div>
            <div className="text-amber-700">11%</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <div className="font-bold text-amber-900">30-50 Lacs</div>
            <div className="text-amber-700">10%</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <div className="font-bold text-amber-900">&gt;50 Lacs</div>
            <div className="text-amber-700">9%</div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      {calculations && (
        <div className="animate-fade-in">
          <h3 className="font-display font-semibold text-neutral-900 mb-4">
            Returns at Different Encashment Periods
          </h3>
          
          <div className="overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Encashment Period</th>
                  <th className="text-right">Rate</th>
                  <th className="text-right">Interest</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {calculations.map((calc, index) => (
                  <tr 
                    key={index}
                    className={index === calculations.length - 1 ? 'bg-brand-50' : ''}
                  >
                    <td className="font-medium">
                      {calc.period}
                      {index === calculations.length - 1 && (
                        <span className="ml-2 badge badge-success text-xs">Best</span>
                      )}
                    </td>
                    <td className="text-right font-mono text-brand-600 font-semibold">
                      {calc.rate}%
                    </td>
                    <td className="text-right font-mono">
                      {formatBDT(calc.interest)}
                    </td>
                    <td className="text-right font-mono font-semibold">
                      {formatBDT(calc.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Card */}
          <div className="mt-6 p-6 bg-brand-50 rounded-xl border border-brand-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-brand-600 font-medium">Principal</div>
                <div className="text-2xl font-display font-bold text-brand-900">
                  {formatBDT(parseFloat(amount.replace(/,/g, '')))}
                </div>
              </div>
              <div>
                <div className="text-sm text-brand-600 font-medium">Interest at Maturity</div>
                <div className="text-2xl font-display font-bold text-brand-900">
                  {formatBDT(calculations[calculations.length - 1].interest)}
                </div>
              </div>
              <div>
                <div className="text-sm text-brand-600 font-medium">Total at Maturity</div>
                <div className="text-2xl font-display font-bold text-brand-900">
                  {formatBDT(calculations[calculations.length - 1].total)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WEDBCalculator;
