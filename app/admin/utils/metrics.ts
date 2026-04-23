import { OrderWithRelations } from '@/lib/types/database'

export function calculateOrderMetrics(orders: OrderWithRelations[] | null) {
  const totalOrders = orders?.length ?? 0
  const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount ?? 0), 0) ?? 0
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  const shippedOrders = orders?.filter(
    (order) => order.status === 'shipped' || order.status === 'delivered'
  ).length ?? 0
  const fulfillmentRate = totalOrders > 0 ? Math.round((shippedOrders / totalOrders) * 100) : 0

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    fulfillmentRate
  }
}

export function createCurrencyFormatter(currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency })
}
