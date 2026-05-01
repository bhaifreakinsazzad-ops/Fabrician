import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order } from '@/types';

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  getOrdersByPhone: (phone: string) => Order[];
}

export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set({ orders: [order, ...get().orders] });
      },

      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((o) =>
            o.id === orderId
              ? { ...o, status, updatedAt: new Date().toISOString() }
              : o
          ),
        });
      },

      updatePaymentStatus: (orderId, paymentStatus) => {
        set({
          orders: get().orders.map((o) =>
            o.id === orderId
              ? { ...o, paymentStatus, updatedAt: new Date().toISOString() }
              : o
          ),
        });
      },

      getOrderByNumber: (orderNumber) => {
        return get().orders.find(
          (o) => o.orderNumber.toLowerCase() === orderNumber.toLowerCase()
        );
      },

      getOrdersByPhone: (phone) => {
        const digits = phone.replace(/[^0-9]/g, '');
        return get().orders.filter((o) =>
          o.customer.phone.replace(/[^0-9]/g, '').includes(digits)
        );
      },
    }),
    { name: 'fabrician-orders' }
  )
);
