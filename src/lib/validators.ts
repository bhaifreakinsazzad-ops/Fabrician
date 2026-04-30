import { z } from "zod";

export const cartLineSchema = z.object({
  slug: z.string().min(1),
  size: z.string().min(1).max(20),
  quantity: z.number().int().min(1).max(20),
});

export const checkoutPayloadSchema = z.object({
  items: z.array(cartLineSchema).min(1).max(20),
  customer: z.object({
    name: z.string().min(2).max(80),
    email: z.string().email(),
    phone: z.string().max(40).optional(),
    addressLine1: z.string().max(120).optional(),
    city: z.string().max(80).optional(),
    country: z.string().max(80).optional(),
    note: z.string().max(300).optional(),
  }),
});
