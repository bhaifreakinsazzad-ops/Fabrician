import type { SiteSettings, Banner, DashboardStats, SalesDataPoint } from '@/types';

export const siteSettings: SiteSettings = {
  freeDelivery: true,
  deliveryFee: 0,
  paymentMethods: {
    bkash: true,
    nagad: true,
    card: true,
    cod: true,
    bankTransfer: true,
  },
};

export const banners: Banner[] = [
  {
    id: 'b1',
    title: 'New Collection Arrived',
    subtitle: 'Discover our Spring 2026 collection of organic baby wear',
    image: '/images/banner-spring.jpg',
    cta: 'Shop Now',
    link: '/shop',
    active: true,
  },
  {
    id: 'b2',
    title: 'Free Delivery Nationwide',
    subtitle: 'Enjoy free delivery to all 64 districts of Bangladesh',
    image: '/images/banner-delivery.jpg',
    cta: 'Learn More',
    link: '/faq',
    active: true,
  },
  {
    id: 'b3',
    title: 'Design Your Dream Outfit',
    subtitle: 'Try Fabrician Studio — our AI-powered design experience',
    image: '/images/banner-studio.jpg',
    cta: 'Try Studio',
    link: '/studio',
    active: true,
  },
];

export const defaultDashboardStats: DashboardStats = {
  totalOrders: 156,
  totalRevenue: 78450,
  todayOrders: 8,
  pendingOrders: 23,
  totalProducts: 16,
  totalUsers: 89,
  studioSubmissions: 34,
};

export const defaultSalesData: SalesDataPoint[] = [
  { date: '2026-04-18', orders: 5, revenue: 2450 },
  { date: '2026-04-19', orders: 8, revenue: 4120 },
  { date: '2026-04-20', orders: 12, revenue: 6890 },
  { date: '2026-04-21', orders: 7, revenue: 3350 },
  { date: '2026-04-22', orders: 15, revenue: 7890 },
  { date: '2026-04-23', orders: 10, revenue: 5340 },
  { date: '2026-04-24', orders: 8, revenue: 4250 },
];

export const divisions = [
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Khulna',
  'Rajshahi',
  'Barisal',
  'Rangpur',
  'Mymensingh',
];

export const fabricOptions = [
  '100% Organic Cotton',
  'Premium Cotton',
  'Cotton Blend',
  'Bamboo Fabric',
  'Linen Blend',
  'Fleece Lined',
];

export const styleMoods = [
  'Minimal & Clean',
  'Playful & Fun',
  'Elegant & Classic',
  'Modern & Trendy',
  'Nature Inspired',
  'Whimsical & Dreamy',
];

export const occasions = [
  'Everyday Wear',
  'Special Occasion',
  'Photoshoot',
  'Gift',
  'Festival',
  'Naming Ceremony',
  'Birthday',
];

export const embroideryTypes = [
  'Name/Text Only',
  'Small Icon + Text',
  'Floral Border',
  'Cute Animal',
  'Custom Design',
  'None',
];
