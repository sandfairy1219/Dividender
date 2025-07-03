'use client';

import { useState, useEffect } from 'react';

export function useExchangeRate() {
  const [exchangeRate, setExchangeRate] = useState<number>(1300); // 기본값
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setIsLoading(true);
        // 실제 환율 API 사용 (예: exchangerate-api.com)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        
        if (data.rates && data.rates.KRW) {
          setExchangeRate(data.rates.KRW);
        } else {
          throw new Error('환율 데이터를 찾을 수 없습니다');
        }
      } catch (err) {
        console.error('환율 가져오기 실패:', err);
        setError('환율을 가져오는데 실패했습니다');
        // 기본값 사용
        setExchangeRate(1300);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
    
    // 30분마다 환율 업데이트
    const interval = setInterval(fetchExchangeRate, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { exchangeRate, isLoading, error };
}
