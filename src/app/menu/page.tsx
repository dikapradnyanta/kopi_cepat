"use client";
import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | "Coffee" | "Non-Coffee" | "Food">("All");
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const categories = ["All", "Coffee", "Non-Coffee", "Food"];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 py-8 md:py-12 min-h-[80vh]">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Eksplorasi Rasa</h1>
        <p className="text-muted-foreground text-lg">Temukan menu favorit yang pas untuk menemanimu hari ini.</p>
      </div>
      <div className="sticky top-16 z-40 flex flex-col sm:flex-row items-center gap-4 justify-between bg-background/80 backdrop-blur-xl p-4 rounded-2xl shadow-md border border-border ring-1 ring-border/50">
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Cari minuman/makanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as "All" | "Coffee" | "Non-Coffee" | "Food")}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-border bg-card/50">
          <SlidersHorizontal className="h-10 w-10 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-lg font-bold">Produk tidak ditemukan</h3>
          <p className="text-muted-foreground text-sm">Coba gunakan kata kunci lain atau ubah kategori.</p>
        </div>
      )}
    </div>
  );
}
