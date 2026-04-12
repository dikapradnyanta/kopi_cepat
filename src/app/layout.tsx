import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
export const metadata: Metadata = {
  title: "Kopi Cepat",
  description: "Platform pemesanan kopi yang cepat dan cerdas.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 w-full">
                {children}
              </main>
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
