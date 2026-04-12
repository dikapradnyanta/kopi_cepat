"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Check, Receipt, Star, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const [invoiceId, setInvoiceId] = useState("");
  
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setInvoiceId(`KPC-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`);
    clearCart();
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full bg-card border border-border rounded-3xl shadow-lg p-8 md:p-10 flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-primary" />
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md">
            <Check className="h-8 w-8" strokeWidth={3} />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Pembayaran Berhasil!</h1>
        <p className="text-muted-foreground mb-8">
          Pesanan simulasi Anda berhasil diproses. Terima kasih!
        </p>

        <div className="w-full bg-secondary/50 rounded-2xl p-6 mb-8 flex flex-col gap-3">
          <div className="flex justify-between items-center text-sm border-b border-border/50 pb-3">
            <span className="text-muted-foreground">Status</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Lunas</span>
          </div>
          <div className="flex justify-between items-center text-sm pt-1">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Receipt className="h-4 w-4" />
              ID Pesanan
            </span>
            <span className="font-mono font-bold tracking-tight">{invoiceId || "KPC-XXXX"}</span>
          </div>
        </div>


        <div className="w-full mb-8 pt-6 border-t border-border">
           <AnimatePresence mode="wait">
             {!isSubmitted ? (
               <motion.form 
                  key="review-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleSubmitReview}
                  className="flex flex-col gap-4"
               >
                 <h3 className="font-bold text-lg">Bagaimana pesanan Anda?</h3>
                 <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star} 
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                         <Star className={`h-8 w-8 ${star <= rating ? "text-accent fill-accent shadow-sm" : "text-border fill-background"}`} />
                      </button>
                    ))}
                 </div>
                 
                 {rating > 0 && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex flex-col gap-3 mt-2">
                     <textarea
                        required
                        rows={3}
                        maxLength={150}
                        placeholder="Tulis ulasan tentang minuman kami..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm resize-none"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? "Mengirim..." : <><Send className="h-4 w-4" /> Kirim Ulasan</>}
                      </button>
                   </motion.div>
                 )}
               </motion.form>
             ) : (
               <motion.div 
                 key="review-success"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-yellow-100 dark:bg-yellow-950/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/50 flex flex-col items-center justify-center gap-2"
               >
                 <span className="text-xl">🌟</span>
                 <p className="text-sm font-bold text-yellow-950 dark:text-yellow-500 text-center">Terima kasih atas ulasan Anda!</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        <Link href="/menu" className="w-full">
          <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow transition-transform hover:scale-[1.02] active:scale-[0.98]">
            Pesan Lagi
          </button>
        </Link>
        <Link href="/" className="mt-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:underline transition-colors">
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
