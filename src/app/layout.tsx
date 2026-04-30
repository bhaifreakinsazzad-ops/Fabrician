import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";

import "./globals.css";

import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fabrician",
    template: "%s | Fabrician",
  },
  description:
    "Fabrician premium clothing store with secure checkout and admin controls.",
  keywords: [
    "Fabrician",
    "clothing brand",
    "streetwear",
    "online fashion store",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <CartProvider>
          <SiteHeader />
          <main className="min-h-[calc(100vh-72px)]">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
