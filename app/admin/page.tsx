import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Package, ShoppingBag, Users, MessageSquare, Image } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/')
  }

  const { count: productsCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  const { count: ordersCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })

  const { count: customersCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'customer')

  const { count: enquiriesCount } = await supabase
    .from('enquiries')
    .select('*', { count: 'exact', head: true })
    .eq('read', false)

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: lowStockProducts } = await supabase
    .from('products')
    .select('*')
    .lte('stock', 5)
    .order('stock', { ascending: true })

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-charcoal/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-ivory border border-charcoal/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-charcoal/60">Products</h3>
              <ShoppingBag className="w-5 h-5 text-charcoal/40" />
            </div>
            <p className="text-3xl font-serif">{productsCount || 0}</p>
          </div>

          <div className="bg-ivory border border-charcoal/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-charcoal/60">Orders</h3>
              <Package className="w-5 h-5 text-charcoal/40" />
            </div>
            <p className="text-3xl font-serif">{ordersCount || 0}</p>
          </div>

          <div className="bg-ivory border border-charcoal/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-charcoal/60">Customers</h3>
              <Users className="w-5 h-5 text-charcoal/40" />
            </div>
            <p className="text-3xl font-serif">{customersCount || 0}</p>
          </div>

          <div className="bg-ivory border border-charcoal/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-charcoal/60">New Enquiries</h3>
              <MessageSquare className="w-5 h-5 text-charcoal/40" />
            </div>
            <p className="text-3xl font-serif">{enquiriesCount || 0}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Link
            href="/admin/products"
            className="bg-ivory border border-charcoal/10 p-6 hover:border-gold transition-colors"
          >
            <ShoppingBag className="w-8 h-8 mb-3" />
            <h3 className="font-medium mb-1">Products</h3>
            <p className="text-sm text-charcoal/60">Manage inventory</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-ivory border border-charcoal/10 p-6 hover:border-gold transition-colors"
          >
            <Package className="w-8 h-8 mb-3" />
            <h3 className="font-medium mb-1">Orders</h3>
            <p className="text-sm text-charcoal/60">Track & fulfill</p>
          </Link>

          <Link
            href="/admin/enquiries"
            className="bg-ivory border border-charcoal/10 p-6 hover:border-gold transition-colors"
          >
            <MessageSquare className="w-8 h-8 mb-3" />
            <h3 className="font-medium mb-1">Enquiries</h3>
            <p className="text-sm text-charcoal/60">Customer messages</p>
          </Link>

          <Link
            href="/admin/lookbook"
            className="bg-ivory border border-charcoal/10 p-6 hover:border-gold transition-colors"
          >
            <Image className="w-8 h-8 mb-3" />
            <h3 className="font-medium mb-1">Lookbook</h3>
            <p className="text-sm text-charcoal/60">Manage collections</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-ivory border border-charcoal/10 p-6">
            <h2 className="font-serif text-2xl mb-4">Recent Orders</h2>
            {recentOrders && recentOrders.length > 0 ? (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/admin/orders/${order.id}`}
                    className="block p-3 border border-charcoal/10 hover:border-charcoal/30 transition-colors"
                  >
                    <div className="flex justify-between">
                      <span className="text-sm">#{order.id.slice(0, 8)}</span>
                      <span className="text-sm font-medium">${order.total_amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-charcoal/60 mt-1">
                      <span>{new Date(order.created_at).toLocaleDateString()}</span>
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-charcoal/60 text-sm">No orders yet</p>
            )}
          </div>

          <div className="bg-ivory border border-charcoal/10 p-6">
            <h2 className="font-serif text-2xl mb-4">Low Stock Alert</h2>
            {lowStockProducts && lowStockProducts.length > 0 ? (
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/admin/products/${product.id}`}
                    className="block p-3 border border-rose/20 bg-rose/5 hover:border-rose/40 transition-colors"
                  >
                    <div className="flex justify-between">
                      <span className="text-sm">{product.name}</span>
                      <span className="text-sm font-medium text-rose">
                        {product.stock} left
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-charcoal/60 text-sm">All products well stocked</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
