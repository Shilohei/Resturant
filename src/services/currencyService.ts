import axios from 'axios';

export interface ExchangeRates {
  USD: number;
  NPR: number;
  JPY: number;
}

export interface CurrencyApiResponse {
  success: boolean;
  rates: Record<string, number>;
  timestamp: number;
}

class CurrencyService {
  private readonly API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
  private readonly BASE_URL = 'https://api.exchangerate-api.com/v4/latest';
  private readonly FALLBACK_RATES: ExchangeRates = {
    USD: 1,
    NPR: 133.5,
    JPY: 157.7,
  };

  /**
   * Fetch current exchange rates from external API
   */
  async fetchExchangeRates(): Promise<ExchangeRates> {
    try {
      // Try primary API
      const response = await axios.get<CurrencyApiResponse>(`${this.BASE_URL}/USD`, {
        timeout: 5000,
      });

      if (response.data.success && response.data.rates) {
        return {
          USD: 1,
          NPR: response.data.rates.NPR || this.FALLBACK_RATES.NPR,
          JPY: response.data.rates.JPY || this.FALLBACK_RATES.JPY,
        };
      }
    } catch (error) {
      console.warn('Primary exchange rate API failed, using fallback rates:', error);
    }

    // Return fallback rates if API fails
    return this.FALLBACK_RATES;
  }

  /**
   * Get cached rates or fetch new ones
   */
  async getExchangeRates(forceRefresh = false): Promise<ExchangeRates> {
    const cacheKey = 'exchange_rates_cache';
    const cacheTimeKey = 'exchange_rates_timestamp';
    const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

    if (!forceRefresh) {
      try {
        const cachedRates = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(cacheTimeKey);

        if (cachedRates && cachedTime) {
          const timestamp = parseInt(cachedTime);
          const now = Date.now();

          if (now - timestamp < CACHE_DURATION) {
            return JSON.parse(cachedRates);
          }
        }
      } catch (error) {
        console.warn('Failed to load cached exchange rates:', error);
      }
    }

    // Fetch fresh rates
    const rates = await this.fetchExchangeRates();

    // Cache the rates
    try {
      localStorage.setItem(cacheKey, JSON.stringify(rates));
      localStorage.setItem(cacheTimeKey, Date.now().toString());
    } catch (error) {
      console.warn('Failed to cache exchange rates:', error);
    }

    return rates;
  }

  /**
   * Convert amount between currencies
   */
  convertCurrency(
    amount: number,
    fromCurrency: keyof ExchangeRates,
    toCurrency: keyof ExchangeRates,
    rates: ExchangeRates
  ): number {
    if (fromCurrency === toCurrency) return amount;

    // Convert to USD first, then to target currency
    const usdAmount = amount / rates[fromCurrency];
    return usdAmount * rates[toCurrency];
  }

  /**
   * Format currency with proper symbols and locale
   */
  formatCurrency(amount: number, currency: keyof ExchangeRates): string {
    const formatters = {
      USD: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      NPR: new Intl.NumberFormat('ne-NP', {
        style: 'currency',
        currency: 'NPR',
        minimumFractionDigits: 2,
      }),
      JPY: new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
        minimumFractionDigits: 0,
      }),
    };

    try {
      return formatters[currency].format(amount);
    } catch (error) {
      // Fallback formatting
      const symbols = { USD: '$', NPR: 'Rs.', JPY: '¥' };
      const symbol = symbols[currency];
      
      if (currency === 'JPY') {
        return `${symbol}${Math.round(amount).toLocaleString()}`;
      }
      return `${symbol}${amount.toFixed(2)}`;
    }
  }

  /**
   * Validate currency code
   */
  isValidCurrency(currency: string): currency is keyof ExchangeRates {
    return ['USD', 'NPR', 'JPY'].includes(currency);
  }

  /**
   * Get currency info
   */
  getCurrencyInfo(currency: keyof ExchangeRates) {
    const info = {
      USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸', locale: 'en-US' },
      NPR: { name: 'Nepalese Rupee', symbol: 'Rs.', flag: '🇳🇵', locale: 'ne-NP' },
      JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', locale: 'ja-JP' },
    };

    return info[currency];
  }
}

export const currencyService = new CurrencyService();
export default currencyService;