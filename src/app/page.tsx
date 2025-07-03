'use client';

import { useState } from 'react';
import { DividendCard } from '@/types/dividend';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import DividendCardComponent from '@/components/DividendCard';
import TotalCalculation from '@/components/TotalCalculation';

export default function Home() {
  const [cards, setCards] = useState<DividendCard[]>([]);
  const { exchangeRate, isLoading: isLoadingRate } = useExchangeRate();

  const addCard = () => {
    const newCard: DividendCard = {
      id: Date.now().toString(),
      name: `종목 ${cards.length + 1}`,
      amountPerPayment: 0,
      frequency: 'quarterly',
      shares: 0,
      stockPrice: 0,
    };
    setCards([...cards, newCard]);
  };

  const updateCard = (updatedCard: DividendCard) => {
    setCards(cards.map(card => card.id === updatedCard.id ? updatedCard : card));
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">Dividender</h1>
                  </div>

        {/* 카드 추가 버튼 */}
        <div className="mb-8 text-center">
          <button
            onClick={addCard}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            종목 추가
          </button>
        </div>

        {/* 배당금 카드들 */}
        {cards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">보유 종목</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map(card => (
                <DividendCardComponent
                  key={card.id}
                  card={card}
                  onUpdate={updateCard}
                  onDelete={deleteCard}
                />
              ))}
            </div>
          </div>
        )}

        {/* 총 계산 결과 */}
        <TotalCalculation
          cards={cards}
          exchangeRate={exchangeRate}
          isLoadingRate={isLoadingRate}
        />

        {/* 빈 상태 */}
        {cards.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">아직 추가된 종목이 없습니다</h3>
            <p className="text-gray-400 dark:text-gray-500 mb-6">위의 &quot;종목 추가&quot; 버튼을 클릭하여 배당 주식을 추가해보세요</p>
          </div>
        )}

        {/* 다크모드 토글 삭제됨 */}
      </div>
    </div>
  );
}
