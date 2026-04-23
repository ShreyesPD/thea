import { Package, ShoppingBag, Users, MessageSquare } from 'lucide-react'

import { requireAdmin } from './_lib/auth'
import { OrderWithRelations, Product, Enquiry } from '@/lib/types/database'
import MetricsSection from './components/MetricsSection'
import RecentOrdersCard from './components/RecentOrdersCard'
import LowStockCard from './components/LowStockCard'
import RecentEnquiriesCard from './components/RecentEnquiriesCard'
import LookbookCard from './components/LookbookCard'
import { calculateOrderMetrics, createCurrencyFormatter } from './utils/metrics'
import { Metric } from './types'

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin()

  const [productsCountResult, ordersForMetrics, customersCountResult, unreadEnquiriesCountResult, recentOrdersResult, lowStockProductsResult, recentEnquiriesResult] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('id, total_amount, status, created_at, users(id, name, email)').order('created_at', { ascending: false }),
    supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'customer'),
    supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('read', false),
    supabase
      .from('orders')
      .select('id, total_amount, status, created_at, users(id, name, email)')
      .order('created_at', { ascending: false })
      .limit(6),
    supabase.from('products').select('id, name, stock, images').lte('stock', 8).order('stock', { ascending: true }).limit(6),
    supabase.from('enquiries').select('id, name, email, message, created_at').order('created_at', { ascending: false }).limit(4)
  ])

  const { totalOrders, totalRevenue, averageOrderValue, fulfillmentRate } = calculateOrderMetrics(
    ordersForMetrics.data as OrderWithRelations[] | null
  )
  const formatter = createCurrencyFormatter()

  const metrics: Metric[] = [
    {
      label: 'Total Orders',
      value: totalOrders.toString(),
      icon: <ShoppingBag className="h-5 w-5" />,
      trend: { value: `${fulfillmentRate}% fulfilled`, isUp: fulfillmentRate >= 80 },
      accent: 'charcoal'
    },
    {
      label: 'Revenue',
      value: formatter.format(totalRevenue),
      icon: <Package className="h-5 w-5" />,
      trend: { value: `${formatter.format(averageOrderValue)} avg`, isUp: true },
      accent: 'gold'
    },
    {
      label: 'Customers',
      value: (customersCountResult.count ?? 0).toString(),
      icon: <Users className="h-5 w-5" />,
      trend: { value: `${customersCountResult.count ?? 0} active`, isUp: true },
      accent: 'rose'
    },
    {
      label: 'Unread Enquiries',
      value: (unreadEnquiriesCountResult.count ?? 0).toString(),
      icon: <MessageSquare className="h-5 w-5" />,
      trend: { value: 'Needs attention', isUp: false },
      accent: 'charcoal'
    }
  ]

  const recentOrders = recentOrdersResult.data as OrderWithRelations[] | null
  const lowStockProducts = lowStockProductsResult.data as Pick<Product, 'id' | 'name' | 'stock' | 'images'>[] | null
  const recentEnquiries = recentEnquiriesResult.data as Enquiry[] | null

  return (
    <div className="space-y-8">
      <MetricsSection metrics={metrics} />

      <section className="grid gap-6 lg:grid-cols-3">
        <RecentOrdersCard orders={recentOrders} formatter={formatter} />
        <LowStockCard products={lowStockProducts} />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <RecentEnquiriesCard enquiries={recentEnquiries} />
        <LookbookCard />
      </section>
    </div>
  )
}
