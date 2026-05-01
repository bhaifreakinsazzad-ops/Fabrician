import { useState } from 'react';
import { Search, MessageCircle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useOrders } from '@/store/useOrders';
import { formatPriceBDT } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Order } from '@/types';

const GOLD      = '#C7A36A';
const GOLD_DEEP = '#9E7E5D';
const NAVY      = '#141B2C';
const ADMIN_WA  = '8801778307704';

const STATUS_OPTIONS = ['All', 'Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

const STATUS_COLORS: Record<string, string> = {
  placed:           'bg-gray-100 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300',
  confirmed:        'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400',
  shipped:          'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400',
  out_for_delivery: 'bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400',
  delivered:        'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400',
  cancelled:        'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400',
};

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid:    'bg-green-100 text-green-700',
  failed:  'bg-red-100 text-red-700',
};

function statusLabel(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildWaLink(order: Order) {
  const itemsSummary = order.items.map((i) => `${i.name} (${i.size}) ×${i.quantity}`).join(', ');
  const msg = encodeURIComponent(
    `Hi ${order.customer.name},\n\n` +
    `Your Fabrician order *${order.orderNumber}* has been ${statusLabel(order.status).toLowerCase()}!\n\n` +
    `Items: ${itemsSummary}\n` +
    `Total: ৳${order.total.toLocaleString()}\n\n` +
    `Thank you for shopping with Fabrician! 🛍️`
  );
  return `https://wa.me/88${order.customer.phone.replace(/^0/, '')}?text=${msg}`;
}

export default function AdminOrders() {
  const [search,       setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedId,   setExpandedId]   = useState<string | null>(null);

  const { orders, updateOrderStatus, updatePaymentStatus } = useOrders();

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      o.orderNumber.toLowerCase().includes(q) ||
      o.customer.name.toLowerCase().includes(q) ||
      o.customer.phone.includes(search);
    const matchStatus =
      statusFilter === 'All' ||
      o.status === statusFilter.toLowerCase().replace(/ /g, '_');
    return matchSearch && matchStatus;
  });

  // Stats
  const pendingBkash = orders.filter(
    (o) => o.paymentMethod === 'bkash' && o.paymentStatus === 'pending'
  ).length;
  const todayOrders = orders.filter((o) => {
    const d = new Date(o.createdAt);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Admin</p>
          <h1 className="text-2xl font-display font-semibold">Orders</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{orders.length} total orders in system</p>
        </div>

        {/* Alert badges */}
        {pendingBkash > 0 && (
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: '#FFF5F9', border: '1px solid rgba(226,19,110,0.25)', color: '#C11960' }}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            {pendingBkash} bKash payment{pendingBkash !== 1 ? 's' : ''} pending verification
          </div>
        )}
      </div>

      {/* Quick stats */}
      {orders.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Today's Orders", value: todayOrders,                                  color: '#2563EB' },
            { label: 'Pending bKash',  value: pendingBkash,                                 color: '#E2136E' },
            { label: 'Active',         value: orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length, color: '#D97706' },
            { label: 'Delivered',      value: orders.filter((o) => o.status === 'delivered').length, color: '#16A34A' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-card border border-border/40"
            >
              <p className="text-2xl font-bold font-display" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table card */}
      <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID, name, or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {STATUS_OPTIONS.map((status) => {
              const isActive = statusFilter === status;
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
                  style={isActive
                    ? { background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`, color: NAVY }
                    : {}}
                  data-inactive={!isActive ? 'true' : undefined}
                >
                  <span className={cn(!isActive && 'text-muted-foreground')}>{status}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* No orders state */}
        {orders.length === 0 ? (
          <div className="py-16 text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(199,163,106,0.10)' }}
            >
              <CheckCircle className="w-7 h-7" style={{ color: GOLD }} />
            </div>
            <p className="font-display font-semibold text-lg mb-1">No orders yet</p>
            <p className="text-sm text-muted-foreground">
              Orders will appear here as customers checkout. Share your store to get your first sale!
            </p>
            <a
              href={`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent('Fabrician store is live!')}`}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: '#25D366', color: '#FFFFFF' }}
            >
              <MessageCircle className="w-4 h-4" />
              Share on WhatsApp
            </a>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Order</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Customer</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Total</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Payment</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Status</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Update</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <>
                      <tr
                        key={order.id}
                        className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                      >
                        <td className="py-3 px-2">
                          <p className="font-mono font-semibold text-xs">{order.orderNumber}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                          </p>
                        </td>
                        <td className="py-3 px-2">
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-xs text-muted-foreground">{order.customer.phone}</p>
                        </td>
                        <td className="py-3 px-2 font-semibold">{formatPriceBDT(order.total)}</td>
                        <td className="py-3 px-2">
                          <p className="text-xs font-semibold uppercase">
                            {order.paymentMethod === 'bkash' ? 'bKash' : 'COD'}
                          </p>
                          <span
                            className={cn('px-2 py-0.5 rounded-full text-[10px] font-semibold mt-0.5 inline-block', PAYMENT_STATUS_COLORS[order.paymentStatus])}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-700')}>
                            {statusLabel(order.status)}
                          </span>
                        </td>
                        <td className="py-3 px-2" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            className="text-xs rounded-lg border border-input bg-background px-2 py-1"
                          >
                            {['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'].map((s) => (
                              <option key={s} value={s}>{statusLabel(s)}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-2" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5">
                            {/* WhatsApp customer */}
                            <a
                              href={buildWaLink(order)}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="WhatsApp customer"
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                              style={{ backgroundColor: '#25D366' }}
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-white" />
                            </a>
                            {/* Mark bKash as paid */}
                            {order.paymentMethod === 'bkash' && order.paymentStatus === 'pending' && (
                              <button
                                onClick={() => updatePaymentStatus(order.id, 'paid')}
                                className="px-2 py-1 rounded-lg text-[10px] font-semibold transition-all hover:opacity-80"
                                style={{ backgroundColor: '#FFF5F9', color: '#E2136E', border: '1px solid rgba(226,19,110,0.3)' }}
                                title="Mark bKash as verified & paid"
                              >
                                ✓ Verify bKash
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Expanded row — order details */}
                      {expandedId === order.id && (
                        <tr key={`${order.id}-expanded`} className="bg-muted/20">
                          <td colSpan={7} className="px-4 pb-4 pt-2">
                            <div className="rounded-xl border border-border/40 p-4 space-y-3 text-xs">
                              {/* Items */}
                              <div>
                                <p className="font-semibold text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Items</p>
                                {order.items.map((item, i) => (
                                  <div key={i} className="flex justify-between py-1 border-b border-border/30 last:border-0">
                                    <span>{item.name} — {item.color} / {item.size} × {item.quantity}</span>
                                    <span className="font-semibold">{formatPriceBDT(item.price * item.quantity)}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Delivery address */}
                              <div>
                                <p className="font-semibold text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Delivery Address</p>
                                <p className="text-foreground">
                                  {order.shippingAddress.address}, {order.shippingAddress.thana},{' '}
                                  {order.shippingAddress.district}, {order.shippingAddress.division}
                                </p>
                              </div>

                              {/* Notes / TrxID */}
                              {order.notes && (
                                <div>
                                  <p className="font-semibold text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Notes / bKash TrxID</p>
                                  <p className="font-mono text-foreground">{order.notes}</p>
                                </div>
                              )}

                              {/* Payment verify */}
                              {order.paymentMethod === 'bkash' && (
                                <div className="flex items-center gap-3 mt-2">
                                  <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold', PAYMENT_STATUS_COLORS[order.paymentStatus])}>
                                    bKash: {order.paymentStatus}
                                  </span>
                                  {order.paymentStatus === 'pending' && (
                                    <button
                                      onClick={() => updatePaymentStatus(order.id, 'paid')}
                                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                                      style={{ backgroundColor: '#E2136E', color: '#FFFFFF' }}
                                    >
                                      ✓ Mark as Verified & Paid
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-10">
                  No orders match your filter.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
