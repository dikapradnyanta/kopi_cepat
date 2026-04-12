"use client";
import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCart, SizeOption, SugarOption, IceOption } from "@/context/CartContext";
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Star, User } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  { id: "1", name: "Rizky Firmansyah", rating: 5, text: "Kopi terbaik yang pernah kubeli! Gelasnya gede dan kopinya strong banget.", date: "2 Hari yang lalu" },
  { id: "2", name: "Anisa Putri", rating: 4, text: "Enak, tapi nunggu antrean offline nya lumayan lama karena selalu rame. Overall recommended.", date: "1 Minggu yang lalu" }
];

export default function ProductDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const product = products.find((p) => p.slug === slug);
  
  const [size, setSize] = useState<SizeOption>("Regular");
  const [sugar, setSugar] = useState<SugarOption>("Normal");
  const [ice, setIce] = useState<IceOption>("Normal");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold">Produk tidak ditemukan</h1>
        <Link href="/menu" className="text-primary hover:underline">
          Kembali ke Menu
        </Link>
      </div>
    );
  }

  const additionalPrice = size === "Large" ? 5000 : 0;
  const finalItemPrice = product.price + additionalPrice;
  const totalPrice = finalItemPrice * quantity;
  const isDrink = product.category === "Coffee" || product.category === "Non-Coffee";

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: finalItemPrice,
      image: product.image,
      quantity,
      size,
      sugar,
      ice,
      notes,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      router.push("/cart");
    }, 1000); 
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <Link href="/menu" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Menu
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square w-full rounded-3xl overflow-hidden bg-secondary/50 shadow-md ring-1 ring-border"
        >
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">No Image</div>
          <Image
             src={product.image}
             alt={product.name}
             fill
             className="object-cover z-10"
             priority
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">{product.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mt-2 mb-2">
               <div className="flex items-center justify-center bg-green-100 dark:bg-green-900/30 px-4 py-1.5 rounded-[1.5rem] shadow-sm border border-green-200 dark:border-green-800 w-max shrink-0">
                 <Star className="h-4 w-4 fill-accent text-accent mr-2" />
                 <span className="text-base font-extrabold text-green-800 dark:text-green-200">{avgRating}</span>
               </div>
               <span className="text-sm text-muted-foreground underline cursor-pointer hover:text-primary transition-colors">({reviews.length} Ulasan)</span>
            </div>

            <p className="text-2xl font-semibold text-primary/80 mt-2">{formatCurrency(product.price)}</p>
            <p className="text-muted-foreground mt-4 leading-relaxed">{product.description}</p>
          </div>
          <div className="h-px w-full bg-border" />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-foreground">Ukuran</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSize("Regular")}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${size === "Regular" ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/50 text-muted-foreground"}`}
                >
                  <span className="font-medium">Regular</span>
                  {size === "Regular" && <Check className="h-4 w-4 text-primary" />}
                </button>
                <button
                  onClick={() => setSize("Large")}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${size === "Large" ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/50 text-muted-foreground"}`}
                >
                  <span className="font-medium">Large</span>
                  <span className="text-xs">+ Rp 5rb</span>
                  {size === "Large" && <Check className="h-4 w-4 text-primary" />}
                </button>
              </div>
            </div>
            {isDrink && (
              <>
                <div className="flex flex-col gap-3">
                  <h3 className="font-semibold text-foreground">Level Gula</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Normal", "Less", "No Sugar"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSugar(opt as SugarOption)}
                        className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${sugar === opt ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary text-muted-foreground"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-semibold text-foreground">Level Es</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Normal", "Less", "No Ice"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setIce(opt as IceOption)}
                        className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${ice === opt ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary text-muted-foreground"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-foreground">Catatan Tambahan</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: jangan terlalu panas, dll."
                className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary h-24 resize-none"
              />
            </div>
          </div>
          <div className="h-px w-full bg-border" />
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-2 pb-12">
            <div className="flex items-center justify-between w-full sm:w-auto bg-card rounded-xl border border-border p-1">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-bold text-lg">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={added}
              className="w-full flex-1 flex items-center justify-between px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-md transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                {added ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                {added ? "Ditambahkan!" : "Tambah ke Keranjang"}
              </span>
              <span>{formatCurrency(totalPrice)}</span>
            </button>
          </div>
        </motion.div>
      </div>


      <div className="mt-16 md:mt-24 mx-auto border-t border-border pt-16">
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-center">Ulasan Pelanggan</h2>
        
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <AnimatePresence>
            {reviews.map((rv, index) => (
              <motion.div 
                key={rv.id} 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-4 hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center text-primary border border-border/50">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{rv.name}</p>
                      <p className="text-xs text-muted-foreground">{rv.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`h-4 w-4 ${star <= rv.rating ? "text-accent fill-accent" : "text-border fill-background"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">&ldquo;{rv.text}&rdquo;</p>
              </motion.div>
            ))}
          </AnimatePresence>
          {reviews.length === 0 && (
            <div className="text-center p-8 bg-secondary/30 rounded-2xl border border-dashed border-border text-muted-foreground text-sm">
              Belum ada ulasan untuk produk ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
