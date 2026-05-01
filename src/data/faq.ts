import type { FAQItem } from '@/types';

export const faqItems: FAQItem[] = [
  {
    id: 'f1',
    question: 'How long does delivery take?',
    answer: 'We deliver all over Bangladesh within 3-5 business days for major cities (Dhaka, Chattogram, Sylhet, Khulna, Rajshahi, Barisal, Rangpur) and 5-7 business days for other areas. All orders come with free delivery as part of our launch offer.',
    category: 'shipping',
  },
  {
    id: 'f2',
    question: 'Do you deliver outside Dhaka?',
    answer: 'Yes! We deliver to all 64 districts of Bangladesh. Our courier partners cover every corner of the country. Delivery to Dhaka metro areas typically takes 2-3 days, while other divisions take 4-7 days.',
    category: 'shipping',
  },
  {
    id: 'f3',
    question: 'What is your return policy?',
    answer: 'We offer a 7-day easy return policy. If you are not satisfied with your purchase, you can return unused items in original packaging within 7 days of delivery. We will pick up the item from your address and process a full refund within 5-7 business days after receiving the return.',
    category: 'returns',
  },
  {
    id: 'f4',
    question: 'How do I exchange for a different size?',
    answer: 'Size exchanges are free! If the size does not fit, simply request an exchange through your account or by calling our helpline. We will send the new size and pick up the old one at the same time.',
    category: 'returns',
  },
  {
    id: 'f5',
    question: 'How do I know which size to choose?',
    answer: 'Each product page has a detailed size guide with age, weight, and height recommendations. Our sizes follow standard measurements: 0-3M (3-6 kg), 3-6M (6-8 kg), 6-9M (8-9 kg), and 9-12M (9-10 kg). When in doubt, we recommend sizing up as babies grow quickly.',
    category: 'sizing',
  },
  {
    id: 'f6',
    question: 'Do your clothes run true to size?',
    answer: 'Our garments are designed to fit true to age with a comfortable, slightly roomy fit. All measurements are taken after washing, so there is no shrinkage surprise. If your baby is between sizes or taller/heavier than average, we recommend choosing the larger size.',
    category: 'sizing',
  },
  {
    id: 'f7',
    question: 'What payment methods do you accept?',
    answer: 'We accept bKash (Send Money to 01778307704) and Cash on Delivery (COD). For bKash, you send the amount from your bKash app and enter the transaction ID (TrxID) at checkout. We verify manually and confirm your order within 1–2 hours.',
    category: 'payments',
  },
  {
    id: 'f8',
    question: 'Is Cash on Delivery available?',
    answer: 'Yes! Cash on Delivery is available for all orders across Bangladesh. Our Pathao courier will contact you before delivery. Have the exact amount ready and you may open and check your order before accepting it.',
    category: 'payments',
  },
  {
    id: 'f9',
    question: 'Are your fabrics safe for newborn skin?',
    answer: 'Absolutely. All our garments are made from 100% organic or premium cotton, free from harmful chemicals, AZO dyes, and formaldehyde. They are OEKO-TEX or GOTS certified where indicated. Our fabrics are hypoallergenic and safe for the most sensitive newborn skin.',
    category: 'materials',
  },
  {
    id: 'f10',
    question: 'How should I wash Fabrician clothes?',
    answer: 'Most items can be machine washed cold (30°C) and tumble dried on low. For printed items, wash inside out. Premium/embroidered items should be hand washed or machine washed in a delicate bag. Always check the care label on each garment for specific instructions.',
    category: 'materials',
  },
  {
    id: 'f11',
    question: 'What is Fabrician Studio?',
    answer: 'Fabrician Studio is our AI-powered custom clothing design experience. You describe what you want, and our system generates a visual concept of your custom baby garment. It is currently in trial/preview mode — you can create and save designs, but custom manufacturing is not yet available. Join our waitlist to be first in line!',
    category: 'studio',
  },
  {
    id: 'f12',
    question: 'Can I actually order custom designs from Studio?',
    answer: 'Not yet! Fabrician Studio is in trial/preview mode. You can create designs, save them, and request a review, but we are not yet manufacturing custom orders. We are preparing the system for a future launch. Join our early access list to know when custom ordering goes live.',
    category: 'studio',
  },
  {
    id: 'f13',
    question: 'Do you offer gift wrapping?',
    answer: 'Yes! We offer complimentary gift wrapping for all orders. Select the "Gift Wrap" option at checkout and add a personalized message. Gift orders are wrapped in our signature tissue paper and placed in a premium Fabrician gift box.',
    category: 'general',
  },
  {
    id: 'f14',
    question: 'How can I track my order?',
    answer: 'Track your order on our Track Order page using your order number or phone number. You can also message us on WhatsApp (01778307704) with your order number for an instant update. Pathao Courier will also contact you before delivery.',
    category: 'shipping',
  },
  {
    id: 'f15',
    question: 'Do you have a physical store?',
    answer: 'Currently we are an online-only store, which helps us keep prices affordable. We may open physical locations in the future. Follow us on social media for updates!',
    category: 'general',
  },
];

export const faqCategories = ['All', 'Shipping', 'Returns', 'Sizing', 'Payments', 'Materials', 'Studio', 'General'];
