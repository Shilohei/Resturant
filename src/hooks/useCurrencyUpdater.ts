import { useEffect } from 'react';
import { useCurrency } from './useCurrency';
import { currencyService } from '@/services/currencyService';

/**
 * Hook to automatically update exchange rates
 */
export const useCurrencyUpdater = () => {
  const { updateRates, lastUpdated } = useCurrency();

  useEffect(() => {
    const updateExchangeRates = async () => {
      try {
        // Check if rates are older than 1 hour
        const now = new Date();
        const hoursSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);

        if (hoursSinceUpdate >= 1) {
          const newRates = await currencyService.getExchangeRates(true);
          updateRates(newRates);
          console.log('Exchange rates updated:', newRates);
        }
      } catch (error) {
        console.error('Failed to update exchange rates:', error);
      }
    };

    // Update rates on mount
    updateExchangeRates();

    // Set up interval to check for updates every 30 minutes
    const interval = setInterval(updateExchangeRates, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [updateRates, lastUpdated]);
};

/**
 * Hook for manual currency rate refresh
 */
export const useManualCurrencyRefresh = () => {
  const { updateRates } = useCurrency();

  const refreshRates = async () => {
    try {
      const newRates = await currencyService.getExchangeRates(true);
      updateRates(newRates);
      return { success: true, rates: newRates };
    } catch (error) {
      console.error('Failed to refresh exchange rates:', error);
      return { success: false, error: error.message };
    }
  };

  return { refreshRates };
};