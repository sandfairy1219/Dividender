'use client';

import { DividendCard } from '@/types/dividend';
import { calculateTotalDividends, convertUSDToKRW, formatCurrency } from '@/utils/calculations';

interface TotalCalculationProps {
  cards: DividendCard[];
  exchangeRate: number;
  isLoadingRate: boolean;
}

function TotalCalculation({ cards, exchangeRate, isLoadingRate }: TotalCalculationProps) {
  const { preTaxUSD, postTaxUSD, yieldRate } = calculateTotalDividends(cards);
  const preTaxKRW = convertUSDToKRW(preTaxUSD, exchangeRate);
  const postTaxKRW = convertUSDToKRW(postTaxUSD, exchangeRate);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-blue-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">총 배당금 계산</h2>
      {/* 환율 정보 */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">현재 환율 (USD/KRW):</span>
          {isLoadingRate ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            </div>
          ) : (
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {exchangeRate.toLocaleString('ko-KR', { maximumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>
      {/* 계산 결과 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* USD 결과 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-2">
            USD 기준
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
              <span className="text-gray-700 dark:text-gray-300">세전 총액:</span>
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                {formatCurrency(preTaxUSD, 'USD')}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
              <span className="text-gray-700 dark:text-gray-300">세후 총액:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                {formatCurrency(postTaxUSD, 'USD')}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
              <span className="text-gray-700 dark:text-gray-300">세전 수익률:</span>
              <span className="font-bold text-purple-600 dark:text-purple-400 text-lg">
                {yieldRate.toFixed(2)}%
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              (배당소득세 15% 적용)
            </div>
          </div>
        </div>
        {/* KRW 결과 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-2">
            KRW 기준
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
              <span className="text-gray-700 dark:text-gray-300">세전 총액:</span>
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                {formatCurrency(preTaxKRW, 'KRW')}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
              <span className="text-gray-700 dark:text-gray-300">세후 총액:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                {formatCurrency(postTaxKRW, 'KRW')}
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              환율: {exchangeRate.toLocaleString('ko-KR')} KRW/USD
            </div>
          </div>
        </div>
      </div>
      {/* 통계 정보 */}
      <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{cards.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">보유 종목</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {cards.reduce((sum, card) => sum + card.shares, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">총 주식 수</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {preTaxUSD > 0 ? ((postTaxUSD / preTaxUSD) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">세후 수익률</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalCalculation;