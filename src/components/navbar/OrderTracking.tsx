import React, { useMemo } from 'react';
import { useOrderTracking, OrderStatus } from '@/hooks/useOrderTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, CookingPot, Bike, Ban } from 'lucide-react';

const statusConfig: Record<OrderStatus, { step: number; label: string; icon: React.ReactNode }> = {
  pending: { step: 1, label: 'Pending', icon: <Circle className="h-5 w-5" /> },
  preparing: { step: 2, label: 'Preparing', icon: <CookingPot className="h-5 w-5" /> },
  out_for_delivery: { step: 3, label: 'Out for Delivery', icon: <Bike className="h-5 w-5" /> },
  delivered: { step: 4, label: 'Delivered', icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
  cancelled: { step: 0, label: 'Cancelled', icon: <Ban className="h-5 w-5 text-red-500" /> },
};

const OrderTracking = () => {
  const { orders, activeOrderId } = useOrderTracking();
  const activeOrder = useMemo(() => orders.find(o => o.id === activeOrderId), [orders, activeOrderId]);

  if (!activeOrder) {
    return <p>No active order selected.</p>;
  }

  const { status, estimatedDelivery, items } = activeOrder;
  const { step, label } = statusConfig[status];
  const progress = (step / 4) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-semibold">Status: {label}</h3>
          <Progress value={progress} className="mt-2" />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Pending</span>
          <span>Preparing</span>
          <span>Out for Delivery</span>
          <span>Delivered</span>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Estimated Delivery:</p>
          <p>{new Date(estimatedDelivery).toLocaleTimeString()}</p>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Items:</p>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item.name} x {item.quantity}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracking;
