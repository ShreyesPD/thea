import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { OrderWithRelations } from '@/lib/types/database'

interface RecentOrdersCardProps {
  orders: OrderWithRelations[] | null
  formatter: Intl.NumberFormat
}

export default function RecentOrdersCard({ orders, formatter }: RecentOrdersCardProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40">Orders</p>
          <h2 className="font-serif text-3xl">Latest fulfilments</h2>
        </div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 rounded-2xl border border-charcoal/10 px-4 py-2 text-sm text-charcoal hover:bg-charcoal hover:text-ivory"
        >
          Manage orders
          <TrendingUp className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="flex items-center justify-between rounded-2xl border border-neutral-200 px-4 py-3 transition hover:border-charcoal/40"
            >
              <div>
                <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                <p className="text-sm text-charcoal/60">
                  {order.users?.name || 'Guest'} — {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatter.format(Number(order.total_amount))}</p>
                <p className="text-xs uppercase tracking-wide text-charcoal/60">{order.status}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm text-charcoal/60">No recent orders</p>
        )}
      </div>
    </div>
  )
}
