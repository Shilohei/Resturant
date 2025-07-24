import React from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{currency}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setCurrency('USD')}>USD</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrency('NPR')}>NPR</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrency('JPY')}>JPY</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
