import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
interface ProductCardProps {
  product: Product;
  featured?: boolean;
}
export function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <Link 
      href={`/menu/${product.slug}`} 
      className={`group relative block rounded-2xl p-4 shadow-sm ring-1 transition-all hover:shadow-md dark:shadow-none
        ${featured 
          ? "bg-primary text-primary-foreground ring-primary-foreground/20 hover:bg-primary/90" 
          : "bg-card ring-border dark:hover:bg-accent/10"}
      `}
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-secondary/50">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">No Image</div>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 z-10 bg-secondary/20"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100 z-10" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium ${featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{product.category}</p>
        </div>
        <h3 className={`font-bold text-lg leading-tight line-clamp-1 transition-colors ${featured ? "text-primary-foreground" : "group-hover:text-primary"}`}>
          {product.name}
        </h3>
        <p className={`font-semibold mt-1 ${featured ? "text-white dark:text-green-900" : "text-primary"}`}>
          {formatCurrency(product.price)}
        </p>
      </div>
      <div className={`absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full opacity-0 shadow-sm transition-all group-hover:opacity-100 group-hover:-translate-y-1 ${featured ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
        <ShoppingBag className="h-4 w-4" />
      </div>
    </Link>
  );
}
