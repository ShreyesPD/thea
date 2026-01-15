import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Package, User, LogOut } from 'lucide-react'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="border border-charcoal/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-charcoal/10 flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-medium">{profile?.name}</h2>
                  <p className="text-sm text-charcoal/60">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <Link
                  href="/account/orders"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-charcoal/5 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  <span>Orders</span>
                </Link>
                <Link
                  href="/account/profile"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-charcoal/5 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-charcoal/5 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </form>
              </nav>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl mb-6">Recent Orders</h2>
            
            {orders && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="block border border-charcoal/10 p-6 hover:border-charcoal/30 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-charcoal/60">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-charcoal/60">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total_amount.toFixed(2)}</p>
                        <p className="text-sm text-charcoal/60 capitalize">{order.status}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-charcoal/10">
                <p className="text-charcoal/70 mb-4">No orders yet</p>
                <Link
                  href="/shop"
                  className="inline-block px-6 py-2 border border-charcoal hover:bg-charcoal hover:text-ivory transition-all"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
