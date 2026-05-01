import { ShoppingCart, Package, Users, Palette, TrendingUp } from 'lucide-react';
import { defaultDashboardStats, defaultSalesData } from '@/data/site';

// Semantic stat colours — warm palette, no violet/purple
const stats = [
  {
    label: 'Total Revenue',
    value: `৳${defaultDashboardStats.totalRevenue.toLocaleString()}`,
    sub: `${defaultDashboardStats.totalOrders} orders`,
    icon: ShoppingCart,
    iconBg: 'rgba(199,163,106,0.15)',
    iconColor: '#B8924A',
    accentColor: '#C7A36A',
    trend: '+12%',
  },
  {
    label: "Today's Orders",
    value: String(defaultDashboardStats.todayOrders),
    sub: 'New today',
    icon: ShoppingCart,
    iconBg: 'rgba(16,185,129,0.12)',
    iconColor: '#059669',
    accentColor: '#10B981',
    trend: '+2',
  },
  {
    label: 'Pending',
    value: String(defaultDashboardStats.pendingOrders),
    sub: 'Need attention',
    icon: TrendingUp,
    iconBg: 'rgba(245,158,11,0.12)',
    iconColor: '#D97706',
    accentColor: '#F59E0B',
    trend: '↓',
  },
  {
    label: 'Products',
    value: String(defaultDashboardStats.totalProducts),
    sub: 'Active',
    icon: Package,
    iconBg: 'rgba(199,163,106,0.12)',
    iconColor: '#9E7E5D',
    accentColor: '#C7A36A',
    trend: null,
  },
  {
    label: 'Users',
    value: String(defaultDashboardStats.totalUsers),
    sub: 'Registered',
    icon: Users,
    iconBg: 'rgba(99,102,241,0.10)',
    iconColor: '#818CF8',
    accentColor: '#6366F1',
    trend: '+5',
  },
  {
    label: 'Studio',
    value: String(defaultDashboardStats.studioSubmissions),
    sub: 'Submissions',
    icon: Palette,
    iconBg: 'rgba(199,163,106,0.12)',
    iconColor: '#B8924A',
    accentColor: '#C7A36A',
    trend: '+8',
  },
];

const GOLD_STRIP = 'linear-gradient(90deg, #C8A57A 0%, #D4B896 50%, #B8924A 100%)';

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Admin</p>
          <h1 className="text-2xl font-display font-semibold">Store Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Fabrician · Bangladesh</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Free Delivery Active
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-5 rounded-2xl bg-card border border-border/40 shadow-card overflow-hidden"
            style={{ borderLeft: `3px solid ${stat.accentColor}` }}
          >
            <div className="flex items-start justify-between">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: stat.iconBg }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.iconColor }} />
              </div>
              {stat.trend && (
                <span
                  className="text-xs font-medium"
                  style={{ color: stat.trend.startsWith('+') ? '#059669' : '#D97706' }}
                >
                  {stat.trend}
                </span>
              )}
            </div>
            <p className="text-2xl font-display font-semibold mt-3">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.sub}</p>
            <p className="text-xs font-medium text-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl bg-card border border-border/40 shadow-card overflow-hidden">
        <div className="h-0.5" style={{ background: GOLD_STRIP }} />
        <div className="p-6">
          <h2 className="font-display font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Order</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'FAB-001', customer: 'Sarah Rahman',  status: 'Shipped',   total: 1250, color: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400' },
                  { id: 'FAB-002', customer: 'Ahmed Khan',    status: 'Delivered',  total: 890,  color: 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400' },
                  { id: 'FAB-003', customer: 'Fatima Ali',    status: 'Confirmed',  total: 2100, color: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400' },
                  { id: 'FAB-004', customer: 'Omar Hassan',   status: 'Pending',    total: 450,  color: 'bg-gray-100 dark:bg-gray-800/40 text-gray-700 dark:text-gray-400' },
                  { id: 'FAB-005', customer: 'Ayesha Islam',  status: 'Shipped',    total: 1680, color: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400' },
                ].map((order) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 font-medium">{order.id}</td>
                    <td className="py-3 px-2">{order.customer}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.color}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-medium">৳{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="rounded-2xl bg-card border border-border/40 shadow-card overflow-hidden">
        <div className="h-0.5" style={{ background: GOLD_STRIP }} />
        <div className="p-6">
          <h2 className="font-display font-semibold mb-4">Sales — Last 7 Days</h2>
          <div className="flex items-end gap-3 h-40">
            {defaultSalesData.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full max-w-[40px] rounded-t-lg relative group cursor-pointer transition-colors"
                  style={{
                    height: `${(d.revenue / 8000) * 100}%`,
                    backgroundColor: 'rgba(199,163,106,0.25)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(199,163,106,0.55)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(199,163,106,0.25)'; }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    ৳{d.revenue}
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(d.date).toLocaleDateString('en', { weekday: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
