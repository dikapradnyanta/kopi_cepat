"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Coffee, ShieldCheck, Sparkles, Dices, RefreshCw, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products, Product } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

export default function Home() {
  const featuredProducts = products.filter(p => p.category === "Coffee").slice(0, 3);
  const [shuffledProduct, setShuffledProduct] = useState<Product | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    setShuffledProduct(products[Math.floor(Math.random() * products.length)]);
  }, []);

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * products.length);
      setShuffledProduct(products[randomIdx]);
      setIsShuffling(false);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-12 pb-16 overflow-hidden">
      <>

        <section className="relative pt-12 pb-10 md:pt-16 md:pb-16 overflow-hidden">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
          <div className="absolute right-[-5%] top-0 bottom-0 flex items-center justify-center opacity-[0.03] dark:opacity-5 pointer-events-none -z-10 select-none hidden md:flex">
            <h2 className="text-[180px] font-black text-primary" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>KOPICEPAT</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 text-center md:text-left z-10 mt-8 md:mt-0">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit mx-auto md:mx-0 backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span>Kopi Premium. Harga Mahasiswa.</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight"
              >
                MAU NGOPI <br /> <span className="text-primary relative inline-block text-6xl md:text-7xl lg:text-8xl italic">
                  APA?
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-1 left-0 h-3 rounded-full -z-10 opacity-80"
                    style={{ backgroundColor: "#FFB300" }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto md:mx-0"
              >
                Rasakan sensasi perpaduan krimer yang lembut dan espresso pekat. Setiap tegukan membawa cerita.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center md:items-start gap-6 pt-4"
              >
                <Link
                  href="/menu"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-10 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:-translate-y-1 hover:shadow-primary/40 focus:ring-4 focus:ring-primary/20 outline-none"
                >
                  PESAN SEKARANG
                </Link>
                <div className="flex items-center gap-3">
                  {["/product/coffee/americano.jpg", "/product/coffee/kopi-susu-gula-aren.jpg", "/product/coffee/caramel-macchiato.jpg"].map((src, i) => (
                    <div key={i} className="relative w-12 h-12 rounded-full overflow-hidden border-[3px] border-background shadow-md hover:scale-110 transition-transform cursor-pointer">
                      <Image src={src} alt="Variant" fill className="object-cover" sizes="48px" />
                    </div>
                  ))}
                  <Link href="/menu" className="text-sm text-primary font-bold ml-2 underline underline-offset-4 cursor-pointer hover:text-accent">
                    Lihat Semua Varian
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex justify-center items-center h-[380px] md:h-[550px]"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />

              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-sm h-full z-10"
              >
                <div className="relative w-full h-full aspect-[3/4]">
                  <Image
                    src="/product/coffee/latte.jpg"
                    alt="Caffe Latte Signature"
                    fill
                    className="object-cover rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-6 bottom-12 md:-left-12 md:bottom-20 bg-background border border-border rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md p-4 flex items-center gap-3 backdrop-blur-xl"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.07)" }}
                >
                  <div className="bg-primary p-2.5 rounded-full text-primary-foreground">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-sm text-foreground">Rating ★ 4.9</p>
                    <p className="text-xs text-muted-foreground font-medium">Latte Delight</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>


          <div className="w-[110%] -ml-[5%] bg-primary transform -skew-y-2 py-3 mt-16 shadow-xl border-y-4 border-accent relative z-20">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex w-max"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="text-primary-foreground font-black tracking-widest text-lg mx-6 shrink-0 whitespace-nowrap">
                  &bull; KOPI CEPAT &bull; DISKON 20%
                </span>
              ))}
            </motion.div>
          </div>
        </section>


        <section className="py-20 px-4 max-w-7xl mx-auto border-t border-border/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Sederhana. Cepat. Nikmat.</h2>
            <p className="text-base text-muted-foreground mt-3">Cara baru pesan kopi favoritmu tanpa ribet dan bebas antre.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Eksplor Menu", desc: "Temukan beragam varian kopi andalan dan minuman segar lainnya dari katalog kami." },
              { step: "2", title: "Sesuaikan Selera", desc: "Atur sendiri tingkat kemanisan, pilihan susu, hingga porsi es batu sesukamu." },
              { step: "3", title: "Bayar & Ambil", desc: "Selesaikan pembayaran secara digital. Barista kami akan meracik pesananmu agar siap diambil!" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + (i * 0.1) }}
                className="flex flex-col items-center text-center group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border bg-card text-foreground font-bold mb-5 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-sm transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </>


      <section className="flex flex-col gap-8 pt-6 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center flex flex-col items-center">
          <div className="inline-block bg-accent px-4 py-1 font-black text-accent-foreground transform -skew-x-12 mb-4 shadow-sm">
            TERPOPULER MINGGU INI
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground uppercase">Kualitas Tanpa Batas</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-3 py-10 px-4">
          {featuredProducts.map((product, index) => {
            const isCenter = index === 1;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative w-full max-w-sm shrink-0 transition-all duration-500 rounded-2xl
                  ${isCenter
                    ? "lg:w-[340px] z-30 shadow-2xl shadow-primary/40 ring-4 ring-background bg-primary py-4"
                    : "lg:w-[300px] z-10 opacity-90 hover:opacity-100 hover:z-20 ring-1 ring-border"}`}
              >
                {isCenter && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg z-40 rotate-12 flex items-center gap-1 border border-accent/20">
                    <Sparkles className="w-3 h-3" /> Rekomendasi
                  </div>
                )}
                <div className="h-full rounded-2xl overflow-hidden">
                  <ProductCard product={product} featured={isCenter} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-2">
          <Link href="/menu" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-primary bg-background px-10 text-sm font-bold shadow-sm transition-all hover:bg-primary hover:text-primary-foreground">
            Lihat Semua Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>


      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl bg-secondary/40 dark:bg-secondary/20 border border-border overflow-hidden p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
            <div className="flex flex-col gap-5">
              <span className="text-sm font-bold text-primary uppercase tracking-widest">KEBINGUNGAN?</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                Minum Apa <br />
                <span className="text-primary italic">Hari Ini?</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Biarkan takdir yang memilihkan minuman paling tepat untuk menemani harimu. Tarik nafas, dan tekan tombol acak di bawah ini!
              </p>
              <button
                onClick={handleShuffle}
                disabled={isShuffling}
                className="inline-flex h-14 w-fit items-center gap-3 rounded-2xl bg-foreground text-background px-8 font-bold text-base shadow-lg transition-all hover:opacity-90 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isShuffling
                  ? <><RefreshCw className="h-5 w-5 animate-spin" /> Mengacak...</>
                  : <><Dices className="h-5 w-5" /> Acak Menu Sekarang</>
                }
              </button>
            </div>

            <div className="flex justify-center items-center min-h-[340px]">
              <AnimatePresence mode="wait">
                {shuffledProduct && !isShuffling && (
                  <motion.div
                    key={shuffledProduct.id}
                    initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-[260px] relative"
                  >
                    <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground text-[10px] font-black px-3 py-1 rounded-full z-10 shadow-md uppercase tracking-widest rotate-3 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Pilihan Hari Ini
                    </div>
                    <ProductCard product={shuffledProduct} />
                  </motion.div>
                )}
                {isShuffling && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-4 text-muted-foreground"
                  >
                    <Dices className="w-16 h-16 animate-bounce" />
                    <p className="font-medium">Memilihkan untukmu...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
