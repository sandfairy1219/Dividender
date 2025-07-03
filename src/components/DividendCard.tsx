'use client';

import { useState } from 'react';
import { DividendCard } from '@/types/dividend';
import { calculateAnnualDividend, formatCurrency, getFrequencyLabel, calculateCardYieldRate } from '@/utils/calculations';

interface DividendCardProps {
  card: DividendCard;
  onUpdate: (card: DividendCard) => void;
  onDelete: (id: string) => void;
}

function DividendCardComponent({ card, onUpdate, onDelete }: DividendCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (name: string) => {
    onUpdate({ ...card, name });
  };

  const handleFieldChange = (field: keyof DividendCard, value: string | number) => {
    onUpdate({ ...card, [field]: value });
  };

  const annualDividend = calculateAnnualDividend(card);
  const yieldRate = calculateCardYieldRate(card);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      {/* 카드 헤더 */}
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <input
            type="text"
            value={card.name}
            onChange={(e) => handleNameChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
            className="text-lg font-semibold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-800 dark:text-gray-200"
            autoFocus
          />
        ) : (
          <h3
            className="text-lg font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setIsEditing(true)}
          >
            {card.name}
          </h3>
        )}
        <button
          onClick={() => onDelete(card.id)}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
          title="카드 삭제"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 입력 필드들 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            1회당 배당금 (USD)
          </label>
          <input
            type="number"
            step="0.01"
            value={card.amountPerPayment}
            onChange={(e) => handleFieldChange('amountPerPayment', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            배당 주기
          </label>
          <select
            value={card.frequency}
            onChange={(e) => handleFieldChange('frequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="weekly">주간</option>
            <option value="monthly">월간</option>
            <option value="quarterly">분기</option>
            <option value="yearly">연간</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            주식 수량
          </label>
          <input
            type="number"
            value={card.shares}
            onChange={(e) => handleFieldChange('shares', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="0"
          />
        </div>
      </div>

      {/* 계산 결과 */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">연간 예상 배당금:</span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {formatCurrency(annualDividend, 'USD')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">세전 수익률:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {yieldRate.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {getFrequencyLabel(card.frequency)} × {card.shares}주
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DividendCardComponent;
