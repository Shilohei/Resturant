import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Order, OrderItem } from '@/types/ai.types';

const getOrderFromStorage = (): Order => {
  const storedOrder = localStorage.getItem('currentOrder');
  if (storedOrder) {
    const parsed = JSON.parse(storedOrder);
    return { ...parsed, createdAt: new Date(parsed.createdAt) };
  }
  return {
    id: `ord_${Date.now()}`,
    items: [],
    total: 0,
    status: 'pending',
    createdAt: new Date(),
  };
};

const saveOrderToStorage = (order: Order) => {
  localStorage.setItem('currentOrder', JSON.stringify(order));
};

export const useOrder = () => {
  const queryClient = useQueryClient();

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ['currentOrder'],
    queryFn: getOrderFromStorage,
    staleTime: Infinity,
  });

  const updateOrder = useMutation({
    mutationFn: async (newOrder: Order) => {
      saveOrderToStorage(newOrder);
      return newOrder;
    },
    onSuccess: (newOrder) => {
      queryClient.setQueryData(['currentOrder'], newOrder);
    },
  });

  const addItem = (item: Omit<OrderItem, 'id'>) => {
    if (!order) return;

    const existingItem = order.items.find(i => i.dishId === item.dishId && i.notes === (item.notes || ''));
    let newItems;

    if (existingItem) {
      newItems = order.items.map(i =>
        i.id === existingItem.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      newItems = [...order.items, { ...item, id: `item_${Date.now()}` }];
    }

    const newTotal = newItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    updateOrder.mutate({ ...order, items: newItems, total: newTotal });
  };

  const removeItem = (itemId: string) => {
    if (!order) return;
    const newItems = order.items.filter(i => i.id !== itemId);
    const newTotal = newItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    updateOrder.mutate({ ...order, items: newItems, total: newTotal });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (!order) return;
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    const newItems = order.items.map(i => (i.id === itemId ? { ...i, quantity } : i));
    const newTotal = newItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    updateOrder.mutate({ ...order, items: newItems, total: newTotal });
  };

  const clearOrder = () => {
    if (!order) return;
    const newOrder: Order = {
        id: `ord_${Date.now()}`,
        items: [],
        total: 0,
        status: 'pending',
        createdAt: new Date(),
    };
    updateOrder.mutate(newOrder);
  };

  return {
    order,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearOrder,
    isUpdating: updateOrder.isPending,
  };
};
