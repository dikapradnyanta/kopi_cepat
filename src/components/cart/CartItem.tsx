import { useCart, CartItemType } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart();
  const handleDecrease = () => updateQuantity(item.cartItemId, item.quantity - 1);
  const handleIncrease = () => updateQuantity(item.cartItemId, item.quantity + 1);
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-b border-border">
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-xl overflow-hidden bg-secondary shrink-0">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-[10px]">No Image</div>
        <Image src={item.image} alt={item.name} fill className="object-cover z-10" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h4 className="font-semibold text-foreground line-clamp-1">{item.name}</h4>
            <div className="text-sm text-muted-foreground mt-1 flex flex-wrap gap-1">
              <span className="bg-secondary px-2 rounded-md">{item.size}</span>
              {item.sugar && <span className="bg-secondary px-2 rounded-md">Sugar: {item.sugar}</span>}
              {item.ice && <span className="bg-secondary px-2 rounded-md">Ice: {item.ice}</span>}
            </div>
            {item.notes && <p className="text-xs text-muted-foreground mt-1 italic">Note: {item.notes}</p>}
          </div>
          <p className="font-semibold text-primary whitespace-nowrap">{formatCurrency(item.price * item.quantity)}</p>
        </div>
        <div className="flex items-center justify-between mt-4 sm:mt-0">
          <div className="flex items-center gap-1 bg-card border border-border rounded-lg shadow-sm">
            <button
              onClick={handleDecrease}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md"
              aria-label="Kurangi kuantitas"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={handleIncrease}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md"
              aria-label="Tambah kuantitas"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.cartItemId)}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            aria-label="Hapus produk"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
