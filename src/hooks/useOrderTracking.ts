import { create } from 'zustand';

export type OrderStatus = 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  status: OrderStatus;
  items: { name: string; quantity: number }[];
  estimatedDelivery: Date;
  deliveryAddress: string;
}

interface OrderTrackingState {
  orders: Order[];
  activeOrderId: string | null;
  setActiveOrderId: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const mockOrders: Order[] = [
  {
    id: 'ORD12345',
    status: 'out_for_delivery',
    items: [
      { name: 'Margherita Pizza', quantity: 1 },
      { name: 'Coke', quantity: 2 },
    ],
    estimatedDelivery: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    deliveryAddress: '123 Main St, Anytown, USA',
  },
  {
    id: 'ORD67890',
    status: 'preparing',
    items: [{ name: 'Sushi Platter', quantity: 1 }],
    estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    deliveryAddress: '456 Oak Ave, Anytown, USA',
  },
];

export const useOrderTracking = create<OrderTrackingState>((set) => ({
  orders: mockOrders,
  activeOrderId: 'ORD12345',
  setActiveOrderId: (orderId) => set({ activeOrderId: orderId }),
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    })),
}));
