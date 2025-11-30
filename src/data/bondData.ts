// NRB Bond Data - Updated November 2025
// Source: Bangladesh Bank, National Savings Directorate

export type BondType = 'WEDB' | 'USDIB' | 'USDPB';

export interface BondInfo {
  id: BondType;
  name: string;
  fullName: string;
  currency: 'BDT' | 'USD';
  tenure: number; // in years
  interestRate: number; // percentage
  denominations: number[];
  maxInvestmentLimit: string;
  principalReceipt: string;
  interestReceipt: string;
  repatriation: string;
  taxStatus: string;
  eligibility: string[];
  deathBenefit: {
    percentage: string;
    maxAmount: string;
    ageLimit: number;
  };
  features: string[];
  prematureEncashmentRates: PrematureEncashmentRate[];
  description: string;
  officialLink: string;
}

export interface PrematureEncashmentRate {
  period: string;
  minMonths: number;
  maxMonths: number;
  baseRate: number;
  reducedRates?: { maxAmount: number; rate: number }[];
}

export const WEDB_PREMATURE_RATES: PrematureEncashmentRate[] = [
  {
    period: 'After 6 months but not later than 1 year',
    minMonths: 6,
    maxMonths: 12,
    baseRate: 8.70,
    reducedRates: [
      { maxAmount: 1500000, rate: 8.70 },
      { maxAmount: 3000000, rate: 7.98 },
      { maxAmount: 5000000, rate: 7.25 },
      { maxAmount: Infinity, rate: 6.53 },
    ],
  },
  {
    period: 'After 1 year but not later than 1.5 years',
    minMonths: 12,
    maxMonths: 18,
    baseRate: 9.45,
    reducedRates: [
      { maxAmount: 1500000, rate: 9.45 },
      { maxAmount: 3000000, rate: 8.66 },
      { maxAmount: 5000000, rate: 7.88 },
      { maxAmount: Infinity, rate: 7.09 },
    ],
  },
  {
    period: 'After 1.5 years but not later than 2 years',
    minMonths: 18,
    maxMonths: 24,
    baseRate: 10.20,
    reducedRates: [
      { maxAmount: 1500000, rate: 10.20 },
      { maxAmount: 3000000, rate: 9.35 },
      { maxAmount: 5000000, rate: 8.50 },
      { maxAmount: Infinity, rate: 7.65 },
    ],
  },
  {
    period: 'After 2 years but not later than 5 years',
    minMonths: 24,
    maxMonths: 60,
    baseRate: 11.20,
    reducedRates: [
      { maxAmount: 1500000, rate: 11.20 },
      { maxAmount: 3000000, rate: 10.27 },
      { maxAmount: 5000000, rate: 9.33 },
      { maxAmount: Infinity, rate: 8.40 },
    ],
  },
  {
    period: 'On Maturity (5 years)',
    minMonths: 60,
    maxMonths: Infinity,
    baseRate: 12.00,
    reducedRates: [
      { maxAmount: 1500000, rate: 12.00 },
      { maxAmount: 3000000, rate: 11.00 },
      { maxAmount: 5000000, rate: 10.00 },
      { maxAmount: Infinity, rate: 9.00 },
    ],
  },
];

export const USD_PREMATURE_RATES: PrematureEncashmentRate[] = [
  {
    period: 'After 1 year but before maturity',
    minMonths: 12,
    maxMonths: 36,
    baseRate: 5.00,
  },
  {
    period: 'On Maturity (3 years)',
    minMonths: 36,
    maxMonths: Infinity,
    baseRate: 6.50, // For USDIB, 7.50 for USDPB
  },
];

export const BOND_DATA: Record<BondType, BondInfo> = {
  WEDB: {
    id: 'WEDB',
    name: 'Wage Earner Development Bond',
    fullName: 'Wage Earner Development Bond (WEDB)',
    currency: 'BDT',
    tenure: 5,
    interestRate: 12,
    denominations: [25000, 50000, 100000, 200000, 500000, 1000000, 5000000],
    maxInvestmentLimit: 'BDT 1 Crore (10 Million)',
    principalReceipt: 'In BDT',
    interestReceipt: 'In BDT',
    repatriation: 'Principal only (after maturity)',
    taxStatus: 'Tax Exempted (Principal & Interest)',
    eligibility: [
      'Any Bangladeshi Wage Earner living abroad',
      'Government employees working in Bangladesh High Commission/Embassy abroad',
      'Employees of statutory/autonomous bodies working abroad on lien',
    ],
    deathBenefit: {
      percentage: '40-50%',
      maxAmount: 'BDT 20 Lacs',
      ageLimit: 55,
    },
    features: [
      'Highest interest rate among NRB bonds (12%)',
      'Tax-free returns',
      'Death risk benefit coverage',
      'Premature encashment allowed after 6 months',
      'Reinvestment permitted',
      'Principal repatriation after maturity',
    ],
    prematureEncashmentRates: WEDB_PREMATURE_RATES,
    description:
      'WEDB is the most popular diaspora bond offering the highest interest rate of 12% annually. It is issued in BDT against foreign remittance sent by wage earners employed abroad.',
    officialLink: 'https://www.bb.org.bd/en/index.php/investfacility/wedbond',
  },
  USDIB: {
    id: 'USDIB',
    name: 'US Dollar Investment Bond',
    fullName: 'US Dollar Investment Bond (USDIB)',
    currency: 'USD',
    tenure: 3,
    interestRate: 6.5,
    denominations: [500, 1000, 5000, 10000, 50000],
    maxInvestmentLimit: 'USD equivalent to BDT 1 Crore',
    principalReceipt: 'In USD',
    interestReceipt: 'In USD or BDT',
    repatriation: 'Both Principal & Interest',
    taxStatus: 'Tax Exempted (Principal & Interest)',
    eligibility: [
      'Bangladeshi Nationals residing abroad',
      'Bangladeshi-origin foreign nationals residing abroad',
    ],
    deathBenefit: {
      percentage: '15-25%',
      maxAmount: 'BDT 5 Lacs',
      ageLimit: 55,
    },
    features: [
      'Full repatriation of principal and interest in USD',
      'Tax-free returns',
      'Hedge against BDT depreciation',
      'Death risk benefit coverage',
      'Premature encashment allowed after 1 year',
      'Reinvestment permitted',
    ],
    prematureEncashmentRates: [
      {
        period: 'After 1 year but before maturity',
        minMonths: 12,
        maxMonths: 36,
        baseRate: 5.0,
      },
      {
        period: 'On Maturity (3 years)',
        minMonths: 36,
        maxMonths: Infinity,
        baseRate: 6.5,
      },
    ],
    description:
      'USDIB is the only Bangladeshi savings scheme that allows full repatriation of both principal and interest in USD. Ideal for those who want to maintain their savings in USD.',
    officialLink: 'https://www.bb.org.bd/en/index.php/investfacility/investbond',
  },
  USDPB: {
    id: 'USDPB',
    name: 'US Dollar Premium Bond',
    fullName: 'US Dollar Premium Bond (USDPB)',
    currency: 'USD',
    tenure: 3,
    interestRate: 7.5,
    denominations: [500, 1000, 5000, 10000, 50000],
    maxInvestmentLimit: 'USD equivalent to BDT 1 Crore',
    principalReceipt: 'In USD',
    interestReceipt: 'In Equivalent BDT',
    repatriation: 'Principal only (after maturity)',
    taxStatus: 'Tax Exempted (Principal & Interest)',
    eligibility: [
      'Bangladeshi Nationals residing abroad',
      'Bangladeshi-origin foreign nationals residing abroad',
    ],
    deathBenefit: {
      percentage: '15-25%',
      maxAmount: 'BDT 5 Lacs',
      ageLimit: 55,
    },
    features: [
      'Higher interest rate than USDIB (7.5% vs 6.5%)',
      'Principal in USD, interest in BDT',
      'Tax-free returns',
      'Death risk benefit coverage',
      'Premature encashment allowed after 1 year',
      'Reinvestment permitted',
    ],
    prematureEncashmentRates: [
      {
        period: 'After 1 year but before maturity',
        minMonths: 12,
        maxMonths: 36,
        baseRate: 5.5,
      },
      {
        period: 'On Maturity (3 years)',
        minMonths: 36,
        maxMonths: Infinity,
        baseRate: 7.5,
      },
    ],
    description:
      'USDPB offers a higher interest rate (7.5%) than USDIB but the interest is paid in BDT equivalent. Principal can still be repatriated in USD after maturity.',
    officialLink: 'https://www.bb.org.bd/en/index.php/investfacility/premibond',
  },
};

export const FAQ_DATA = [
  {
    question: 'Who can invest in NRB Bonds?',
    answer:
      'Bangladeshi wage earners working abroad, Bangladeshi nationals residing abroad, and Bangladeshi-origin foreign nationals are eligible. Government employees working in embassies/high commissions abroad are also eligible.',
  },
  {
    question: 'What is the maximum investment limit?',
    answer:
      'The total combined investment limit across all three bond types is BDT 1 Crore (10 Million) or equivalent in foreign currency.',
  },
  {
    question: 'Are the returns tax-free?',
    answer:
      'Yes, both principal and interest income from all NRB bonds are completely tax-exempted in Bangladesh.',
  },
  {
    question: 'Can I repatriate my money?',
    answer:
      'USDIB allows full repatriation of both principal and interest in USD. USDPB and WEDB allow principal repatriation only after maturity.',
  },
  {
    question: 'What happens if I need the money before maturity?',
    answer:
      'Premature encashment is allowed - after 6 months for WEDB and after 1 year for USD bonds. However, the interest rate will be lower than the maturity rate.',
  },
  {
    question: 'Is there any death benefit?',
    answer:
      'Yes, WEDB offers 40-50% death benefit up to BDT 20 Lacs, while USD bonds offer 15-25% up to BDT 5 Lacs. The wage earner must be under 55 years at the time of death.',
  },
  {
    question: 'What documents are required?',
    answer:
      'NID copy, passport copy, work permit/visa, job ID or pay slip, photographs, and bond application forms are typically required.',
  },
  {
    question: 'How do I purchase bonds from abroad?',
    answer:
      'You can purchase through authorized dealer banks in Bangladesh. Many banks now offer online/remote purchase facilities. You need a Non-Resident Foreign Currency (NRFC) account or Non-Resident Taka (NRT) account.',
  },
];

export const REQUIRED_DOCUMENTS = [
  'Copy of National ID (NID) of wage earner',
  'Copy of NID of nominee and beneficiary (if applicable)',
  'Passport copy with valid visa/work permit',
  'Photograph of bondholder and nominee',
  'Job ID / Employee ID / Pay slip',
  'Bond application form (DIB-I / DPB-I / DB-I)',
  'Diaspora Bond Investor Investment Form',
  'Declaration Form',
  'FATCA Form',
  'Debit Authority (for WEDB with remittance incentive)',
];

export const ISSUING_BANKS = [
  { name: 'Sonali Bank Limited', type: 'State-owned' },
  { name: 'Janata Bank Limited', type: 'State-owned' },
  { name: 'Agrani Bank Limited', type: 'State-owned' },
  { name: 'Rupali Bank Limited', type: 'State-owned' },
  { name: 'Bangladesh Krishi Bank', type: 'Specialized' },
  { name: 'Standard Chartered Bank', type: 'Private' },
  { name: 'Prime Bank Limited', type: 'Private' },
  { name: 'City Bank Limited', type: 'Private' },
  { name: 'NCC Bank Limited', type: 'Private' },
  { name: 'BRAC Bank Limited', type: 'Private' },
];
