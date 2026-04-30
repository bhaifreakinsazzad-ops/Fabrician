import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "FAB-TSH-001",
    slug: "heritage-loom-tee-ivory",
    name: "Heritage Loom Tee",
    description: "Heavyweight cotton tee with a relaxed vintage cut.",
    longDescription:
      "The Heritage Loom Tee is cut from 240gsm combed cotton with reinforced shoulder taping and enzyme wash finishing. It is built for daily wear while keeping a premium silhouette that pairs with denim, cargos, and relaxed tailoring.",
    category: "Tops",
    price: 38,
    compareAtPrice: 52,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1280&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1280&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    inventory: 29,
    tags: ["premium cotton", "everyday", "relaxed fit"],
    featured: true,
  },
  {
    id: "FAB-TSH-002",
    slug: "linework-graphic-tee-black",
    name: "Linework Graphic Tee",
    description: "Statement street tee with soft-touch water-based print.",
    longDescription:
      "A signature Fabrician graphic on a jet-black base. Printed with breathable, eco-safe ink, this piece keeps color depth after repeated washes while staying soft against the skin.",
    category: "Tops",
    price: 44,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1280&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1618677366787-9727aacca7ea?auto=format&fit=crop&w=1280&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    inventory: 18,
    tags: ["graphic", "streetwear", "drop shoulder"],
    featured: true,
  },
  {
    id: "FAB-BTM-001",
    slug: "utility-cargo-olive",
    name: "Utility Cargo Pant",
    description: "Tapered cargos with articulated knees and deep pockets.",
    longDescription:
      "Made with durable cotton twill and garment dyed for a broken-in look. Designed with a modern tapered leg, hidden adjusters at the hem, and enough pocket space for daily carry.",
    category: "Bottoms",
    price: 72,
    compareAtPrice: 89,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1280&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506629905607-d9f4b70b7dbf?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1280&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    inventory: 14,
    tags: ["utility", "tapered", "all-season"],
    featured: true,
  },
  {
    id: "FAB-BTM-002",
    slug: "straight-denim-indigo",
    name: "Straight Denim Indigo",
    description: "Classic 13oz denim with clean straight-leg profile.",
    longDescription:
      "A timeless straight fit in deep indigo. Woven from durable ring-spun cotton with subtle stretch for comfort and shape retention. Finished with matte antique hardware and reinforced seams.",
    category: "Bottoms",
    price: 78,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1280&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1280&q=80",
    ],
    sizes: ["30", "32", "34", "36"],
    inventory: 11,
    tags: ["denim", "straight fit", "minimal"],
    featured: false,
  },
  {
    id: "FAB-OUT-001",
    slug: "atelier-bomber-charcoal",
    name: "Atelier Bomber",
    description: "Lightweight bomber with satin lining and ribbed collar.",
    longDescription:
      "The Atelier Bomber balances utility and polish. A structured outer shell, breathable satin lining, and custom brushed hardware give it a premium feel from first wear.",
    category: "Outerwear",
    price: 112,
    compareAtPrice: 140,
    image:
      "https://images.unsplash.com/photo-1593032465171-8bd5f2df5f3d?auto=format&fit=crop&w=1280&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=1280&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    inventory: 9,
    tags: ["bomber", "lightweight", "premium"],
    featured: true,
  },
  {
    id: "FAB-OUT-002",
    slug: "softshell-coach-jacket-sand",
    name: "Softshell Coach Jacket",
    description: "Weather-ready coach jacket with a clean matte finish.",
    longDescription:
      "Designed for layering in transitional weather. Wind-resistant shell, hidden interior pocket, and adjustable hem cord give this coach jacket everyday versatility.",
    category: "Outerwear",
    price: 96,
    image:
      "https://images.unsplash.com/photo-1550246140-29f40b909e5a?auto=format&fit=crop&w=1280&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=1280&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    inventory: 13,
    tags: ["coach jacket", "all-weather", "layering"],
    featured: false,
  },
  {
    id: "FAB-ACC-001",
    slug: "stitched-logo-cap-stone",
    name: "Stitched Logo Cap",
    description: "Six-panel cap with tonal embroidery and curved brim.",
    longDescription:
      "Cut from breathable cotton canvas with an adjustable back strap. The tonal Fabrician embroidery keeps the look understated while still brand-forward.",
    category: "Accessories",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1280&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1613259667268-2ce4e4f50d6f?auto=format&fit=crop&w=1280&q=80",
    ],
    sizes: ["One Size"],
    inventory: 35,
    tags: ["cap", "logo", "everyday"],
    featured: true,
  },
  {
    id: "FAB-ACC-002",
    slug: "structured-tote-graphite",
    name: "Structured Tote Bag",
    description: "Heavy canvas tote with reinforced base and inner sleeve.",
    longDescription:
      "A daily utility tote built to carry essentials, tech, and groceries without losing shape. Features a reinforced bottom panel and interior zipper pocket.",
    category: "Accessories",
    price: 34,
    image:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1280&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1614179814574-1fef6d92d196?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1280&q=80",
    ],
    sizes: ["One Size"],
    inventory: 22,
    tags: ["tote", "canvas", "daily carry"],
    featured: false,
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export const productCategories = Array.from(
  new Set(products.map((product) => product.category)),
);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
