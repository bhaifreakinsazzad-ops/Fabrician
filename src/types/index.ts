// ============================================================
// FABRICIAN TYPE DEFINITIONS
// ============================================================

export type OrderStatus = 'placed' | 'confirmed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type StudioStatus = 'submitted' | 'under_review' | 'concept_ready' | 'waitlist' | 'future_eligible' | 'rejected';
export type PaymentMethod = 'bkash' | 'nagad' | 'card' | 'cod' | 'bank_transfer';
export type UserRole = 'customer' | 'admin';
export type BadgeType = 'new' | 'bestseller' | 'sale' | 'organic' | 'limited' | 'giftable';
export type ViewMode = 'grid' | 'list';
export type SortOption = 'featured' | 'price_low' | 'price_high' | 'newest' | 'rating';
export type ProductCategory = 'kimono' | 'pajama';

// --------------------------------------------------------
// World Accent Palette
// --------------------------------------------------------
export interface WorldAccent {
  bg: string;        // soft background tint
  primary: string;   // primary accent color
  secondary: string; // secondary accent color
  chip: string;      // chip/tag background
  chipText: string;  // chip/tag text color
}

// --------------------------------------------------------
// World Definition
// --------------------------------------------------------
export interface World {
  id: string;
  slug: string;
  name: string;
  label: string;          // short display name (e.g. "Cloud")
  emoji: string;
  tagline: string;        // one-line mood
  story: string;          // 2–3 sentence emotional description
  accent: WorldAccent;
  productSlugs: string[]; // products belonging to this world
  featured?: boolean;
}

// --------------------------------------------------------
// Product Types
// --------------------------------------------------------
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  world: string;            // world slug
  accent: WorldAccent;      // inherited from world, can override
  description: string;
  shortDescription: string;
  descriptionStory: string; // emotional "Inside This World" narrative
  price: number;
  compareAtPrice?: number;
  collection: string[];
  tags: string[];
  images: string[];
  campaignImages?: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  badges: BadgeType[];
  careInstructions: string[];
  sizeGuide: SizeGuideEntry[];
  isActive: boolean;
  createdAt: string;
  fabric: string;
  giftable?: boolean;
  bestSeller?: boolean;
  relatedSlugs?: string[];
  trustPoints?: string[];   // short trust bullets for PDP
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  sku: string;
  stock: number;
  image?: string;
}

export interface SizeGuideEntry {
  size: string;
  age: string;
  weight: string;
  height: string;
}

// --------------------------------------------------------
// Cart Types
// --------------------------------------------------------
export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  world?: string;
}

// --------------------------------------------------------
// Order Types
// --------------------------------------------------------
export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  division: string;
  district: string;
  thana: string;
  address: string;
  isDefault: boolean;
}

// --------------------------------------------------------
// User Types
// --------------------------------------------------------
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  addresses: Address[];
}

// --------------------------------------------------------
// Wishlist Types
// --------------------------------------------------------
export interface WishlistItem {
  id: string;
  productId: string;
  addedAt: string;
}

// --------------------------------------------------------
// Studio Types
// --------------------------------------------------------
export interface StudioSubmission {
  id: string;
  userId?: string;
  userName?: string;
  userPhone?: string;
  status: StudioStatus;
  designData: DesignData;
  referenceImages: string[];
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DesignData {
  goal: string;
  ageRange: string;
  size: string;
  colorPreference: string[];
  fabricPreference: string;
  styleMood: string;
  occasion: string;
  personalization: {
    customText?: string;
    embroideryType?: string;
  };
  specialNotes?: string;
}

// --------------------------------------------------------
// Category / Collection Types
// --------------------------------------------------------
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  color: string;
}

// --------------------------------------------------------
// FAQ Types
// --------------------------------------------------------
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// --------------------------------------------------------
// Admin Types
// --------------------------------------------------------
export interface SiteSettings {
  freeDelivery: boolean;
  deliveryFee: number;
  paymentMethods: {
    bkash: boolean;
    nagad: boolean;
    card: boolean;
    cod: boolean;
    bankTransfer: boolean;
  };
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
  active: boolean;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  todayOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalUsers: number;
  studioSubmissions: number;
}

export interface SalesDataPoint {
  date: string;
  orders: number;
  revenue: number;
}
