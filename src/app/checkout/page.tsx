import type { Metadata } from "next";

import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout for Fabrician orders.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
