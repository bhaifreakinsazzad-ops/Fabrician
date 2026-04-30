"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/currency";

type CheckoutStatus = "idle" | "loading" | "error";

export function CheckoutForm() {
  const { lines, items, subtotal } = useCart();
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("United States");
  const [note, setNote] = useState("");

  const total = useMemo(() => (subtotal >= 120 ? subtotal : subtotal + 8), [subtotal]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (lines.length === 0) {
      setStatus("error");
      setErrorMessage("Your cart is empty.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: lines,
          customer: {
            name,
            email,
            phone,
            addressLine1,
            city,
            country,
            note,
          },
        }),
      });

      const data: { url?: string; error?: string } = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unexpected checkout error.",
      );
    }
  }

  if (items.length === 0) {
    return (
      <section className="container-shell py-16">
        <div className="rounded-3xl border border-dashed border-[var(--line)] bg-white p-12 text-center">
          <p className="serif text-3xl text-[var(--ink)]">No items to checkout</p>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Add products first, then come back.
          </p>
          <Link href="/shop" className="fabric-btn mt-6 inline-flex">
            Go to Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell space-y-8 py-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Checkout
        </p>
        <h1 className="serif mt-2 text-4xl text-[var(--ink)]">Complete your order</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-3xl border border-[var(--line)] bg-white p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-[var(--muted)]">
              Full name
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--sand)] px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--ink)]"
              />
            </label>
            <label className="text-sm font-semibold text-[var(--muted)]">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--sand)] px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--ink)]"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-[var(--muted)]">
              Phone
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--sand)] px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--ink)]"
              />
            </label>
            <label className="text-sm font-semibold text-[var(--muted)]">
              Country
              <input
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--sand)] px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--ink)]"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-[var(--muted)]">
              Address
              <input
                value={addressLine1}
                onChange={(event) => setAddressLine1(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--sand)] px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--ink)]"
              />
            </label>
            <label className="text-sm font-semibold text-[var(--muted)]">
              City
              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--sand)] px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--ink)]"
              />
            </label>
          </div>

          <label className="text-sm font-semibold text-[var(--muted)]">
            Order note (optional)
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--sand)] px-4 py-2 text-[var(--ink)] outline-none focus:border-[var(--ink)]"
              placeholder="Anything we should know before shipping?"
            />
          </label>

          {status === "error" ? (
            <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "loading"}
            className="fabric-btn w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? "Connecting to checkout..." : "Pay with Stripe"}
          </button>
        </form>

        <aside className="h-fit rounded-3xl border border-[var(--line)] bg-white p-6">
          <h2 className="text-xl font-bold text-[var(--ink)]">Summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.key} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-semibold text-[var(--ink)]">{item.product.name}</p>
                  <p className="text-[var(--muted)]">
                    {item.size} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-[var(--ink)]">
                  {formatPrice(item.lineTotal)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-[var(--line)] pt-4 text-sm">
            <div className="flex justify-between text-[var(--muted)]">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between text-[var(--muted)]">
              <span>Shipping</span>
              <span>{subtotal >= 120 ? "Free" : formatPrice(8)}</span>
            </div>
            <div className="mt-3 flex justify-between text-base font-bold text-[var(--ink)]">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
