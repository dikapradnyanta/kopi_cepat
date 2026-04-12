"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/components/cart/CartItem";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
export default function CartPage() {
  const { cart, subTotal, cartCount } = useCart();
  const tax = subTotal * 0.11; 
  const total = subTotal + tax;
  if (cartCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div className="p-6 bg-secondary rounded-full text-muted-foreground mb-4">
          <ShoppingBag className="h-16 w-16" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Keranjang Kosong</h1>
        <p className="text-muted-foreground max-w-md">
          Sepertinya kamu belum memilih minuman. Yuk, jelajahi menu kami dan temukan kopi favoritmu hari ini!
        </p>
        <Link 
          href="/menu"
          className="mt-4 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
        >
          Eksplorasi Menu
        </Link>
      </div>
    );
  }
  return (
    <div className="py-8 md:py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/menu" className="p-2 -ml-2 text-muted-foreground hover:bg-secondary rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Keranjang Pesanan</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 flex flex-col gap-2">
          {cart.map((item, index) => (
            <motion.div
              key={item.cartItemId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CartItem item={item} />
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border border-border rounded-3xl p-6 lg:p-8 flex flex-col gap-6 shadow-sm sticky top-24"
        >
          <h2 className="text-xl font-bold">Ringkasan Pesanan</h2>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal ({cartCount} item)</span>
              <span className="text-foreground font-medium">{formatCurrency(subTotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Pajak (PPN 11%)</span>
              <span className="text-foreground font-medium">{formatCurrency(tax)}</span>
            </div>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total Akhir</span>
            <span className="text-primary">{formatCurrency(total)}</span>
          </div>
          <Link href="/checkout" className="w-full">
            <button className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md mt-2 group">
              Lanjut Pembayaran
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Dengan melanjutkan, kamu menyetujui syarat & ketentuan KopiCepat.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
