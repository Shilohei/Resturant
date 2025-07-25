import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CurrencyState {
  currency: 'NPR' | 'USD' | 'JPY';
  rates: {
    NPR: number;
    USD: number;
    JPY: number;
  };
  lastUpdated: Date;
  setCurrency: (currency: 'NPR' | 'USD' | 'JPY') => void;
  updateRates: (rates: Partial<CurrencyState['rates']>) => void;
  convertPrice: (price: number, fromCurrency?: 'NPR' | 'USD' | 'JPY') => number;
  formatPrice: (price: number, fromCurrency?: 'NPR' | 'USD' | 'JPY') => string;
}

const currencySymbols = {
  USD: '$',
  NPR: 'Rs.',
  JPY: '¥'
};

export const useCurrency = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'USD',
      rates: {
        USD: 1,
        NPR: 133.5,
        JPY: 157.7,
      },
      lastUpdated: new Date(),
      setCurrency: (currency) => {
        set({ currency });
        // Trigger a custom event for real-time updates across components
        window.dispatchEvent(new CustomEvent('currencyChanged', { 
          detail: { currency, rates: get().rates } 
        }));
      },
      updateRates: (newRates) => set((state) => ({ 
        rates: { ...state.rates, ...newRates },
        lastUpdated: new Date()
      })),
      convertPrice: (price: number, fromCurrency: 'NPR' | 'USD' | 'JPY' = 'USD') => {
        const { currency, rates } = get();
        if (fromCurrency === currency) return price;
        
        // Convert to USD first, then to target currency
        const usdPrice = price / rates[fromCurrency];
        return usdPrice * rates[currency];
      },
      formatPrice: (price: number, fromCurrency: 'NPR' | 'USD' | 'JPY' = 'USD') => {
        const { currency } = get();
        const convertedPrice = get().convertPrice(price, fromCurrency);
        const symbol = currencySymbols[currency];
        
        // Format based on currency
        switch (currency) {
          case 'JPY':
            return `${symbol}${Math.round(convertedPrice).toLocaleString()}`;
          case 'NPR':
            return `${symbol} ${convertedPrice.toFixed(2)}`;
          default:
            return `${symbol}${convertedPrice.toFixed(2)}`;
        }
      }
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ 
        currency: state.currency, 
        rates: state.rates,
        lastUpdated: state.lastUpdated 
      }),
    }
  )
);
