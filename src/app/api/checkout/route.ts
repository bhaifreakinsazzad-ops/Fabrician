import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getProductBySlug } from "@/lib/products";
import { getStripeServerClient } from "@/lib/stripe";
import { checkoutPayloadSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const stripe = getStripeServerClient();

  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured yet. Add STRIPE_SECRET_KEY before going live.",
      },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = checkoutPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Checkout data is invalid.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const lineItems = parsed.data.items.map((line) => {
    const product = getProductBySlug(line.slug);
    if (!product) {
      return null;
    }

    return {
      quantity: line.quantity,
      price_data: {
        currency: "usd",
        unit_amount: product.price * 100,
        product_data: {
          name: product.name,
          description: `${product.description} · Size ${line.size}`,
          metadata: {
            slug: product.slug,
            size: line.size,
          },
        },
      },
    };
  });

  if (lineItems.some((line) => line === null)) {
    return NextResponse.json(
      { error: "One or more products are no longer available." },
      { status: 409 },
    );
  }

  const safeLineItems = lineItems.filter(
    (line): line is NonNullable<(typeof lineItems)[number]> => line !== null,
  );

  const headersStore = await headers();
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    headersStore.get("origin") ||
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: safeLineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      customer_creation: "always",
      customer_email: parsed.data.customer.email,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR"],
      },
      metadata: {
        customer_name: parsed.data.customer.name,
        phone: parsed.data.customer.phone || "",
        address_line_1: parsed.data.customer.addressLine1 || "",
        city: parsed.data.customer.city || "",
        country: parsed.data.customer.country || "",
        note: parsed.data.customer.note || "",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Unable to create checkout link." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Stripe checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
