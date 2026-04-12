"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, ChevronRight, CreditCard, Loader2, QrCode, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PaymentMethod = "Cash" | "QRIS" | "Transfer Bank";
export default function CheckoutPage() {
  const router = useRouter();
  const { cartCount, subTotal } = useCart();
  const tax = subTotal * 0.11;
  const total = subTotal + tax;
  const [method, setMethod] = useState<PaymentMethod>("QRIS");
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQrisCode, setShowQrisCode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    if (cartCount === 0 && !isProcessing && !showQrisCode) {
      router.push("/menu");
    }
  }, [cartCount, router, isProcessing, showQrisCode]);
  const handleProcessPayment = () => {
    setErrorMsg("");
    if (!formData.name || !formData.email || !formData.address) {
      setErrorMsg("Mohon lengkapi semua data pengiriman.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (method === "QRIS") {
        setShowQrisCode(true); 
      } else {
        router.push("/checkout/success");
      }
    }, 1500);
  };
  const handleCompleteQris = () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push("/checkout/success");
    }, 1000);
  };
  const methods = [
    { id: "QRIS", label: "QRIS", icon: QrCode, desc: "Gopay, OVO, Dana, ShopeePay" },
    { id: "Transfer Bank", label: "Virtual Account", icon: CreditCard, desc: "BCA, Mandiri, BNI, BRI" },
    { id: "Cash", label: "Bayar di Kasir", icon: Wallet, desc: "Bayar tunai di kedai kami" },
  ];
  if (cartCount === 0 && !isProcessing && !showQrisCode) {
    return null; 
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cart" className="p-2 -ml-2 text-muted-foreground hover:bg-secondary rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-8">
          <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm">
            <h2 className="text-xl font-bold mb-6">Informasi Pemesan</h2>
            {errorMsg && (
              <div className="p-4 bg-destructive/10 text-destructive text-sm font-medium rounded-xl mb-6">
                {errorMsg}
              </div>
            )}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">Email</label>
                <input
                  type="email"
                  required
                  placeholder="budi@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">Alamat Pengiriman / Catatan</label>
                <textarea
                  required
                  placeholder="Lokasi spesifik pengantaran"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm h-24 resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                />
              </div>
            </div>
          </div>
          <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm">
            <h2 className="text-xl font-bold mb-6">Metode Pembayaran</h2>
            <div className="flex flex-col gap-3">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id as PaymentMethod)}
                  className={`flex flex-row items-center gap-4 p-4 rounded-xl border-2 transition-all w-full text-left ${method === m.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/50 text-muted-foreground"}`}
                >
                  <div className={`p-3 bg-background rounded-xl border border-border shadow-sm ${method === m.id ? "text-primary" : ""}`}>
                    <m.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="font-bold text-foreground text-sm">{m.label}</span>
                    <span className="text-xs text-muted-foreground">{m.desc}</span>
                  </div>
                  {method === m.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Ringkasan Checkout</h2>
            <div className="flex flex-col gap-4 text-sm font-medium text-muted-foreground border-b border-border pb-6">
              <div className="flex justify-between">
                <span>Subtotal Pesanan</span>
                <span className="text-foreground">{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Pajak (PPN)</span>
                <span className="text-foreground">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Layanan</span>
                <span className="text-primary italic">Gratis</span>
              </div>
            </div>
            <div className="flex justify-between text-xl font-bold mt-6 mb-8">
              <span>Total Tagihan</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
            <button
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md mt-2 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div key="pay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    Bayar Sekarang
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
      {showQrisCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-card border border-border rounded-3xl shadow-xl overflow-hidden flex flex-col"
          >
            <div className="bg-[#1E2E4A] p-6 flex flex-col items-center justify-center text-white relative">
              <button 
                onClick={() => setShowQrisCode(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                Batal
              </button>
              <h3 className="font-bold text-xl drop-shadow-sm mb-1 tracking-tight">QRIS Simulation</h3>
              <p className="opacity-80 text-sm">Scan untuk membayar KopiCepat</p>
              <div className="mt-8 bg-white p-4 rounded-xl shadow-lg border-4 border-white">
                <div className="h-56 w-56 border border-gray-200 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] rounded-md flex items-center justify-center bg-gray-50 relative overflow-hidden">
                   <div className="absolute inset-2 bg-white flex flex-col items-center justify-center">
                      <QrCode className="h-24 w-24 text-black animate-pulse" />
                      <span className="text-black font-bold mt-2">QRIS MOCK</span>
                   </div>
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm font-bold border-b border-border pb-4">
                <span className="text-muted-foreground">Total Tagihan:</span>
                <span className="text-lg text-primary">{formatCurrency(total)}</span>
              </div>
              <p className="text-xs text-center text-muted-foreground italic mb-2">Pura-pura scan QR ini menggunakan aplikasi e-wallet Anda. Lalu klik tombol di bawah.</p>
              <button
                onClick={handleCompleteQris}
                disabled={isProcessing}
                className="w-full h-12 bg-[#1E2E4A] text-white rounded-xl font-bold shadow-md disabled:opacity-70 flex items-center justify-center"
              >
                 {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : "Selesai Scan (Simulasi)"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
