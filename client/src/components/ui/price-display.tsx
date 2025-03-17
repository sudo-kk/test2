import React from 'react';
import { useCurrency } from '@/context/currency-context';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  amount: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  originalPrice?: number;
}

export function PriceDisplay({ 
  amount, 
  className, 
  size = 'md',
  showDiscount = false,
  originalPrice
}: PriceDisplayProps) {
  const { formatPrice } = useCurrency();

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl font-semibold',
  };

  const discountPercentage = originalPrice && showDiscount
    ? Math.round(100 - (amount / originalPrice * 100))
    : null;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className={cn(sizeClasses[size])}>
        {formatPrice(amount)}
      </span>
      
      {showDiscount && originalPrice && originalPrice > amount && (
        <>
          <span className="text-muted-foreground line-through text-sm">
            {formatPrice(originalPrice)}
          </span>
          <span className="text-green-600 text-sm font-medium">
            {discountPercentage}% off
          </span>
        </>
      )}
    </div>
  );
}
