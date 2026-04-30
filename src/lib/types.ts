export type ProductCategory = "Tops" | "Bottoms" | "Outerwear" | "Accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  image: string;
  gallery: string[];
  sizes: string[];
  inventory: number;
  tags: string[];
  featured: boolean;
};

export type CartLine = {
  slug: string;
  size: string;
  quantity: number;
};

export type CheckoutPayload = {
  items: CartLine[];
  customer: {
    name: string;
    email: string;
    phone?: string;
    addressLine1?: string;
    city?: string;
    country?: string;
    note?: string;
  };
};
