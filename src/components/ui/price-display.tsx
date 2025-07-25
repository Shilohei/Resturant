import React, { useEffect, useState } from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  originalCurrency?: 'NPR' | 'USD' | 'JPY';
  className?: string;
  showOriginal?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalCurrency = 'USD',
  className,
  showOriginal = false,
  size = 'md'
}) => {
  const { formatPrice, currency } = useCurrency();
  const [displayPrice, setDisplayPrice] = useState(formatPrice(price, originalCurrency));

  useEffect(() => {
    const updatePrice = () => {
      setDisplayPrice(formatPrice(price, originalCurrency));
    };

    // Update immediately
    updatePrice();

    // Listen for currency changes
    const handleCurrencyChange = () => updatePrice();
    window.addEventListener('currencyChanged', handleCurrencyChange);

    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange);
    };
  }, [price, originalCurrency, formatPrice]);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <span className={cn('font-semibold transition-all duration-300', sizeClasses[size], className)}>
      {displayPrice}
      {showOriginal && currency !== originalCurrency && (
        <span className="text-xs text-muted-foreground ml-1">
          (orig. {formatPrice(price, originalCurrency)})
        </span>
      )}
    </span>
  );
};

export default PriceDisplay;