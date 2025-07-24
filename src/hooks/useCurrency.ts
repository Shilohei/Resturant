import { create } from 'zustand';

interface CurrencyState {
  currency: 'NPR' | 'USD' | 'JPY';
  rates: {
    NPR: number;
    USD: number;
    JPY: number;
  };
  setCurrency: (currency: 'NPR' | 'USD' | 'JPY') => void;
}

export const useCurrency = create<CurrencyState>((set) => ({
  currency: 'USD',
  rates: {
    USD: 1,
    NPR: 133.5,
    JPY: 157.7,
  },
  setCurrency: (currency) => set({ currency }),
}));
