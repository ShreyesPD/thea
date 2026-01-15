'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useCartStore } from '@/lib/store/cart'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }
    }
    checkAuth()
  }, [router])

  const handlePlaceOrder = async () => {
    if (!user || items.length === 0) return

    setLoading(true)
    try {
      const supabase = createClient()
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: getTotalPrice(),
          status: 'pending',
        })
        .select()
        .single()

      if (orderError) throw orderError

      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        size: item.size,
        price: item.product.price,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      clearCart()
      router.push(`/account/orders/${order.id}`)
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!user || items.length === 0) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen flex items-center justify-center">
        <p className="text-charcoal/70">Loading...</p>
      </div>
    )
  }

  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-serif text-2xl mb-4">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} (Size: {item.size}) x {item.quantity}
                  </span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-charcoal/10 pt-3">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl mb-4">Payment</h2>
            <div className="p-6 bg-charcoal/5 border border-charcoal/10 mb-6">
              <p className="text-sm text-charcoal/70 mb-4">
                This is a demo checkout. In production, integrate with Stripe or another payment provider.
              </p>
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full px-8 py-3 bg-charcoal text-ivory hover:bg-charcoal/90 transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
