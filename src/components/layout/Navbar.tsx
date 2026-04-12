"use client";
import Link from "next/link";
import Image from "next/image";
import { Coffee, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
export default function Navbar() {
  const { cartCount } = useCart();
  const pathname = usePathname();
  const links = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
            <Image src="/logo-light.svg" alt="Kopi Cepat Logo" width={140} height={32} className="h-8 w-auto block dark:hidden" />
            <Image src="/logo-dark.svg" alt="Kopi Cepat Logo" width={140} height={32} className="h-8 w-auto hidden dark:block" />
          </Link>
          <nav className="hidden md:flex gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary"
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Link href="/cart">
            <button className="relative flex items-center justify-center p-2 rounded-md hover:bg-secondary text-foreground transition-colors group">
              <ShoppingBag className="h-5 w-5 group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-[0.4rem] py-[0.1rem] text-[0.65rem] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
