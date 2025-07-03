export interface DividendCard {
  id: string;
  name: string;
  amountPerPayment: number; // 1회당 배당금 (USD)
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly'; // 배당 주기
  shares: number; // 주식 수량
  stockPrice: number; // 주식 가격 (USD)
}

export interface ExchangeRate {
  usdToKrw: number;
}

export interface CalculationResult {
  preTaxUSD: number;
  postTaxUSD: number;
  preTaxKRW: number;
  postTaxKRW: number;
  yieldRate: number; // 세전 수익률 (%)
}
