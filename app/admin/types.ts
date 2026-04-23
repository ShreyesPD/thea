export interface Metric {
  label: string
  value: string
  icon: React.ReactNode
  trend: { value: string; isUp: boolean }
  accent: 'charcoal' | 'gold' | 'rose'
}

export interface DashboardData {
  productsCount: number
  ordersForMetrics: any[]
  customersCount: number
  unreadEnquiriesCount: number
  recentOrders: any[]
  lowStockProducts: any[]
  recentEnquiries: any[]
}
