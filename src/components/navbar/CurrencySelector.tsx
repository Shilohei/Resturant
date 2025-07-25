import React from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { DollarSign, TrendingUp, Globe } from 'lucide-react';

const CurrencySelector = () => {
  const { currency, setCurrency, rates, lastUpdated } = useCurrency();

  const currencyOptions = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'NPR', name: 'Nepalese Rupee', symbol: 'Rs.', flag: '🇳🇵' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' }
  ] as const;

  const currentOption = currencyOptions.find(opt => opt.code === currency);
  const formatLastUpdated = () => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60));
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return lastUpdated.toLocaleDateString();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 min-w-[80px] justify-between"
        >
          <div className="flex items-center gap-1">
            <span className="text-sm">{currentOption?.flag}</span>
            <span className="font-medium">{currency}</span>
          </div>
          <DollarSign className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Select Currency
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {currencyOptions.map((option) => (
          <DropdownMenuItem 
            key={option.code}
            onClick={() => setCurrency(option.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{option.flag}</span>
              <div>
                <div className="font-medium">{option.code}</div>
                <div className="text-xs text-muted-foreground">{option.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currency === option.code && (
                <Badge variant="secondary" className="text-xs">Current</Badge>
              )}
              <span className="text-sm font-mono">
                {option.symbol}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Exchange Rates
            </span>
            <span>Updated {formatLastUpdated()}</span>
          </div>
          <div className="mt-1 space-y-1">
            {Object.entries(rates).map(([code, rate]) => (
              <div key={code} className="flex justify-between text-xs">
                <span>1 USD =</span>
                <span className="font-mono">{rate} {code}</span>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
