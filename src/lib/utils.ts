import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatPriceBDT(price: number): string {
  return `৳${price.toLocaleString('en-BD')}`
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `FAB-${timestamp}${random}`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.substring(0, length) + '...'
}

export function getStockLabel(stock: number): { label: string; color: string } {
  if (stock === 0) return { label: 'Out of Stock', color: 'text-red-500 bg-red-50 dark:bg-red-950/30' }
  if (stock <= 5) return { label: `Only ${stock} left`, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30' }
  if (stock <= 10) return { label: 'Low Stock', color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/30' }
  return { label: 'In Stock', color: 'text-green-600 bg-green-50 dark:bg-green-950/30' }
}

export function getOrderStatusLabel(status: string): { label: string; color: string; step: number } {
  const steps: Record<string, { label: string; color: string; step: number }> = {
    placed: { label: 'Placed', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400', step: 1 },
    confirmed: { label: 'Confirmed', color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400', step: 2 },
    shipped: { label: 'Shipped', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400', step: 3 },
    out_for_delivery: { label: 'Out for Delivery', color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400', step: 4 },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400', step: 5 },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400', step: 0 },
  }
  return steps[status] || { label: status, color: 'bg-gray-100 text-gray-700', step: 0 }
}

export function getStudioStatusLabel(status: string): { label: string; color: string } {
  const labels: Record<string, { label: string; color: string }> = {
    submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400' },
    under_review: { label: 'Under Review', color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400' },
    concept_ready: { label: 'Concept Ready', color: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400' },
    waitlist: { label: 'Waitlist', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400' },
    future_eligible: { label: 'Future Eligible', color: 'bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-400' },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400' },
  }
  return labels[status] || { label: status, color: 'bg-gray-100 text-gray-700' }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
