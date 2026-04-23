import { requireAdmin } from '../_lib/auth'
import TableShell from '@/components/admin/tables/TableShell'
import SearchToolbar from '@/components/admin/SearchToolbar'
import { updateOrderStatus } from './actions'
import { OrderStatus, OrderWithRelations } from '@/lib/types/database'

interface OrdersPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

const ORDER_STATUSES: OrderStatus[] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { supabase } = await requireAdmin()

  const resolvedSearchParams = await searchParams
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q : ''
  const statusFilter = typeof resolvedSearchParams?.status === 'string' ? resolvedSearchParams.status : ''

  let ordersQuery = supabase
    .from('orders')
    .select('id, total_amount, status, created_at, users(id, name, email)')
    .order('created_at', { ascending: false })

  if (query) {
    const likeQuery = `%${query}%`
    ordersQuery = ordersQuery.ilike('id', likeQuery)
  }

  if (statusFilter && ORDER_STATUSES.includes(statusFilter as OrderStatus)) {
    ordersQuery = ordersQuery.eq('status', statusFilter)
  }

  const { data: orders } = await ordersQuery
  const typedOrders = orders as OrderWithRelations[] | null

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  return (
    <div className="space-y-8">
      <TableShell
        title="Orders"
        description="Oversee fulfillment and keep clients updated."
        toolbar={
          <SearchToolbar
            placeholder="Search by order ID"
            searchKey="q"
            filterKey="status"
            clearLabel="All statuses"
            filters={ORDER_STATUSES.map((status) => ({ label: status, value: status }))}
          />
        }
      >
        {typedOrders && typedOrders.length > 0 ? (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-charcoal/50">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Placed</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {typedOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium">#{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-charcoal/60">{order.id}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{order.users?.name ?? 'Guest'}</p>
                    <p className="text-xs text-charcoal/60">{order.users?.email}</p>
                  </td>
                  <td className="px-4 py-3">{formatter.format(Number(order.total_amount))}</td>
                  <td className="px-4 py-3 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <form action={updateOrderStatus} className="flex items-center justify-end gap-2 text-xs">
                      <input type="hidden" name="id" value={order.id} />
                      <select
                        name="status"
                        defaultValue={order.status}
                        className="rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-xs capitalize"
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status} className="capitalize">
                            {status}
                          </option>
                        ))}
                      </select>
                      <button type="submit" className="rounded-xl border border-charcoal/20 px-3 py-2 uppercase tracking-wide">
                        Update
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-charcoal/20 py-16 text-center">
            <p className="text-charcoal/60">No orders match this filter.</p>
            <p className="text-sm text-charcoal/50">Try another status or search input.</p>
          </div>
        )}
      </TableShell>
    </div>
  )
}
