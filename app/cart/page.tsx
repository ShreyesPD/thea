'use client'

import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/store/cart'
import { Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  const handleCheckout = () => {
    router.push('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-3xl md:text-4xl mb-8">Shopping Cart</h1>
          
          <div className="text-center py-16">
            <p className="text-charcoal/70 mb-8">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-charcoal text-ivory hover:bg-charcoal/90 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl md:text-4xl">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-charcoal/60 hover:text-rose transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 p-4 border border-charcoal/10"
              >
                <div className="w-24 h-32 bg-charcoal/5 flex-shrink-0">
                  <img
                    src={item.product.images?.[0] || '/placeholder-product.jpg'}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium mb-1">{item.product.name}</h3>
                  <p className="text-sm text-charcoal/60 mb-2">Size: {item.size}</p>
                  <p className="font-medium">${item.product.price.toFixed(2)}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="text-charcoal/60 hover:text-rose transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 border border-charcoal/20 hover:border-charcoal transition-colors flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 border border-charcoal/20 hover:border-charcoal transition-colors flex items-center justify-center"
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="border border-charcoal/10 p-6 sticky top-24">
              <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-charcoal/10 pt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full px-8 py-3 bg-charcoal text-ivory hover:bg-charcoal/90 transition-all mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/shop"
                className="block text-center text-sm text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
