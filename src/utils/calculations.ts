import { DividendCard } from '@/types/dividend';

// 배당 주기별 연간 계수
const FREQUENCY_MULTIPLIERS = {
  weekly: 52,
  monthly: 12,
  quarterly: 4,
  yearly: 1,
} as const;

// 세율 (예: 15% 배당소득세)
const TAX_RATE = 0.15;

/**
 * 개별 카드의 연간 배당금 계산
 */
export function calculateAnnualDividend(card: DividendCard): number {
  return card.amountPerPayment * card.shares * FREQUENCY_MULTIPLIERS[card.frequency];
}

/**
 * 개별 카드의 수익률 계산
 */

/**
 * 전체 카드들의 총 배당금 계산
 */
export function calculateTotalDividends(cards: DividendCard[]) {
  const totalPreTaxUSD = cards.reduce((sum: number, card: DividendCard) => sum + calculateAnnualDividend(card), 0);
  const totalPostTaxUSD = totalPreTaxUSD * (1 - TAX_RATE);
  return {
    preTaxUSD: totalPreTaxUSD,
    postTaxUSD: totalPostTaxUSD,
  };
}

/**
 * USD를 KRW로 변환
 */
export function convertUSDToKRW(usd: number, exchangeRate: number): number {
  return usd * exchangeRate;
}

/**
 * 숫자를 통화 형식으로 포맷
 */
export function formatCurrency(amount: number, currency: 'USD' | 'KRW'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  } else {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  }
}

/**
 * 배당 주기를 한국어로 변환
 */
export function getFrequencyLabel(frequency: DividendCard['frequency']): string {
  const labels = {
    weekly: '주간',
    monthly: '월간',
    quarterly: '분기',
    yearly: '연간',
  };
  return labels[frequency];
}
