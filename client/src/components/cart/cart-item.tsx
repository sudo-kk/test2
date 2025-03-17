// ...existing code...
import { useCurrency } from '@/context/currency-context';
// ...existing code...

interface CartItemProps {
  item: {
    price: number;
    quantity: number;
    // add other properties of item if needed
  };
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const { formatPrice } = useCurrency();
  
  // ...existing code...
  
  return (
    <div className="flex items-center py-4 border-b">
      {/* ...existing code... */}
      
      <div className="ml-auto text-right">
        <div className="font-medium">
          {formatPrice(item.price * item.quantity)}
        </div>
        {item.quantity > 1 && (
          <div className="text-sm text-muted-foreground">
            {formatPrice(item.price)} each
          </div>
        )}
      </div>
      
      {/* ...existing code... */}
    </div>
  );
}
