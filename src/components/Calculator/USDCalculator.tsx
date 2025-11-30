import { useState, useMemo } from 'react';
import { BOND_DATA, BondType } from '@/data/bondData';

interface USDCalculatorProps {
  bondType: 'USDIB' | 'USDPB';
}

export const USDCalculator = ({ bondType }: USDCalculatorProps) => {
  const [amount, setAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<string>('119.50'); // Approximate rate
  const bondInfo = BOND_DATA[bondType];

  const formatUSD = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatBDT = (num: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const calculations = useMemo(() => {
    const investAmount = parseFloat(amount.replace(/,/g, ''));
    const rate = parseFloat(exchangeRate.replace(/,/g, ''));
    
    if (isNaN(investAmount) || investAmount <= 0 || isNaN(rate) || rate <= 0) {
      return null;
    }

    const tenure = bondInfo.tenure;
    const interestRate = bondInfo.interestRate;
    const prematureRate = 5.0; // After 1 year but before maturity

    // Maturity calculations
    const maturityInterestUSD = investAmount * (interestRate / 100) * tenure;
    const maturityTotalUSD = investAmount + maturityInterestUSD;

    // Premature encashment (after 1 year)
    const prematureInterestUSD = investAmount * (prematureRate / 100) * 1;
    const prematureTotalUSD = investAmount + prematureInterestUSD;

    // BDT equivalents
    const principalBDT = investAmount * rate;
    const maturityInterestBDT = maturityInterestUSD * rate;
    const maturityTotalBDT = maturityTotalUSD * rate;

    return {
      principal: {
        usd: investAmount,
        bdt: principalBDT,
      },
      maturity: {
        rate: interestRate,
        interestUSD: maturityInterestUSD,
        interestBDT: maturityInterestBDT,
        totalUSD: maturityTotalUSD,
        totalBDT: maturityTotalBDT,
      },
      premature: {
        rate: prematureRate,
        interestUSD: prematureInterestUSD,
        totalUSD: prematureTotalUSD,
      },
      exchangeRate: rate,
    };
  }, [amount, exchangeRate, bondInfo]);

  const handleAmountChange = (value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (cleanValue === '') {
      setAmount('');
      return;
    }
    const numValue = parseInt(cleanValue);
    setAmount(numValue.toLocaleString());
  };

  const isUSDIB = bondType === 'USDIB';

  return (
    <div className="card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isUSDIB ? 'bg-blue-100' : 'bg-purple-100'
        }`}>
          <span className={`font-display font-bold ${
            isUSDIB ? 'text-blue-700' : 'text-purple-700'
          }`}>
            {isUSDIB ? 'DIB' : 'DPB'}
          </span>
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-neutral-900">
            {bondInfo.name}
          </h2>
          <p className="text-sm text-neutral-500">
            3-Year Bond • {bondInfo.interestRate}% Interest • Tax Free
          </p>
        </div>
      </div>

      {/* Key Differentiator */}
      <div className={`mb-6 p-4 rounded-xl border ${
        isUSDIB ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200'
      }`}>
        <h4 className={`font-medium mb-2 ${
          isUSDIB ? 'text-blue-800' : 'text-purple-800'
        }`}>
          {isUSDIB ? '💵 Full USD Repatriation' : '💹 Higher Interest Rate'}
        </h4>
        <p className={`text-sm ${isUSDIB ? 'text-blue-700' : 'text-purple-700'}`}>
          {isUSDIB 
            ? 'Both principal and interest can be repatriated in USD. Best for maintaining USD savings.'
            : 'Higher interest rate (7.5% vs 6.5%) but interest paid in BDT equivalent. Principal repatriable in USD.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Investment Amount (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">
              $
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

        {/* Exchange Rate Input */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Exchange Rate (BDT per USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">
              ৳
            </span>
            <input
              type="text"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              placeholder="119.50"
              className="input-lg pl-10 font-mono text-lg"
            />
          </div>
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
              ${denom.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {calculations && (
        <div className="animate-fade-in">
          <h3 className="font-display font-semibold text-neutral-900 mb-4">
            Investment Returns
          </h3>

          {/* Comparison Table */}
          <div className="overflow-x-auto mb-6">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th className="text-right">Rate</th>
                  <th className="text-right">Interest (USD)</th>
                  <th className="text-right">Total (USD)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Premature (After 1 Year)</td>
                  <td className="text-right font-mono text-amber-600 font-semibold">
                    {calculations.premature.rate}%
                  </td>
                  <td className="text-right font-mono">
                    {formatUSD(calculations.premature.interestUSD)}
                  </td>
                  <td className="text-right font-mono">
                    {formatUSD(calculations.premature.totalUSD)}
                  </td>
                </tr>
                <tr className={isUSDIB ? 'bg-blue-50' : 'bg-purple-50'}>
                  <td className="font-medium">
                    At Maturity (3 Years)
                    <span className={`ml-2 badge text-xs ${
                      isUSDIB ? 'badge-info' : 'bg-purple-100 text-purple-700 border-purple-200'
                    }`}>
                      Best
                    </span>
                  </td>
                  <td className={`text-right font-mono font-semibold ${
                    isUSDIB ? 'text-blue-600' : 'text-purple-600'
                  }`}>
                    {calculations.maturity.rate}%
                  </td>
                  <td className="text-right font-mono">
                    {formatUSD(calculations.maturity.interestUSD)}
                  </td>
                  <td className="text-right font-mono font-semibold">
                    {formatUSD(calculations.maturity.totalUSD)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Cards */}
          <div className={`p-6 rounded-xl border ${
            isUSDIB ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className={`text-sm font-medium ${
                  isUSDIB ? 'text-blue-600' : 'text-purple-600'
                }`}>Principal</div>
                <div className={`text-xl font-display font-bold ${
                  isUSDIB ? 'text-blue-900' : 'text-purple-900'
                }`}>
                  {formatUSD(calculations.principal.usd)}
                </div>
                <div className="text-xs text-neutral-500">
                  ≈ {formatBDT(calculations.principal.bdt)}
                </div>
              </div>
              <div>
                <div className={`text-sm font-medium ${
                  isUSDIB ? 'text-blue-600' : 'text-purple-600'
                }`}>Interest at Maturity</div>
                <div className={`text-xl font-display font-bold ${
                  isUSDIB ? 'text-blue-900' : 'text-purple-900'
                }`}>
                  {formatUSD(calculations.maturity.interestUSD)}
                </div>
                {!isUSDIB && (
                  <div className="text-xs text-neutral-500">
                    Paid in BDT: ≈ {formatBDT(calculations.maturity.interestBDT)}
                  </div>
                )}
              </div>
              <div>
                <div className={`text-sm font-medium ${
                  isUSDIB ? 'text-blue-600' : 'text-purple-600'
                }`}>Total at Maturity</div>
                <div className={`text-xl font-display font-bold ${
                  isUSDIB ? 'text-blue-900' : 'text-purple-900'
                }`}>
                  {formatUSD(calculations.maturity.totalUSD)}
                </div>
              </div>
              <div>
                <div className={`text-sm font-medium ${
                  isUSDIB ? 'text-blue-600' : 'text-purple-600'
                }`}>Repatriation</div>
                <div className={`text-sm font-medium ${
                  isUSDIB ? 'text-blue-900' : 'text-purple-900'
                }`}>
                  {isUSDIB ? 'Principal + Interest in USD' : 'Principal in USD only'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default USDCalculator;
