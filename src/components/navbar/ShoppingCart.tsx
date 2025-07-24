import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCartIcon } from 'lucide-react';
import { useShoppingCart } from '@/hooks/useShoppingCart';

const ShoppingCart = () => {
  const { items, removeItem, updateItemQuantity } = useShoppingCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCartIcon className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id} className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value, 10))}
                      className="w-12 text-center border rounded-md"
                    />
                    <Button variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
