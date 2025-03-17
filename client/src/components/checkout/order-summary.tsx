import React from 'react';
import { useCurrency } from '@/context/currency-context';
import { cn } from '@/lib/utils';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount?: number;
  tax?: number;
  total: number;
  className?: string;
}

export function OrderSummary({ 
  subtotal, 
  shipping, 
  discount = 0, 
  tax = 0, 
  total,
  className
}: OrderSummaryProps) {
  const { formatPrice } = useCurrency();
  
  return (
    <div className={cn("rounded-lg border bg-card p-5", className)}>
      <h3 className="text-lg font-medium mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        
        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatPrice(tax)}</span>
          </div>
        )}
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
