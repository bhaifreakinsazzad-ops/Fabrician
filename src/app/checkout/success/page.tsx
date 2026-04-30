import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Success",
  description: "Your payment was completed successfully.",
};

export default function CheckoutSuccessPage() {
  return (
    <section className="container-shell py-16">
      <div className="rounded-3xl border border-[var(--line)] bg-white p-12 text-center">
        <p className="serif text-4xl text-[var(--ink)]">Thank you for your order</p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--muted)]">
          Your payment has been processed successfully. You can track fulfillment
          and payments in your Stripe dashboard.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/shop" className="fabric-btn inline-flex">
            Keep Shopping
          </Link>
          <Link
            href="/admin"
            className="inline-flex rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--ink)]"
          >
            Open Admin
          </Link>
        </div>
      </div>
    </section>
  );
}
