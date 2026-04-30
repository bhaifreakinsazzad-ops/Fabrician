import type { Metadata } from "next";

import { CartPageView } from "@/components/cart-page-view";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your selected products and continue to secure checkout.",
};

export default function CartPage() {
  return <CartPageView />;
}
