import React from 'react';
import { useCurrency } from '@/context/currency-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface PaymentFormProps {
  amount: number;
  onPaymentComplete: (paymentDetails: any) => void;
}

export function PaymentForm({ amount, onPaymentComplete }: PaymentFormProps) {
  const { formatPrice } = useCurrency();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock payment processing
    // In a real app, you would integrate with a payment gateway
    setTimeout(() => {
      onPaymentComplete({
        id: `payment_${Date.now()}`,
        amount,
        status: 'completed',
        timestamp: new Date()
      });
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your card information to complete your purchase.</CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardName">Name on Card</Label>
            <Input id="cardName" placeholder="Name as appears on card" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" required />
            </div>
          </div>
          
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total Payment:</span>
              <span>{formatPrice(amount)}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full">Pay {formatPrice(amount)}</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
