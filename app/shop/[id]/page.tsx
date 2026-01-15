'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useCartStore } from '@/lib/store/cart'
import type { Product } from '@/lib/types/database'
import { ShoppingBag, Check } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    async function fetchProduct() {
      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single()

      if (data) {
        setProduct(data)
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0])
        }
      }
      setLoading(false)
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (!product || !selectedSize) return

    addItem(product, selectedSize, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen flex items-center justify-center">
        <p className="text-charcoal/70">Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-charcoal/70 mb-4">Product not found</p>
          <button
            onClick={() => router.push('/shop')}
            className="px-6 py-2 border border-charcoal hover:bg-charcoal hover:text-ivory transition-all"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['/placeholder-product.jpg']

  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-charcoal/5 overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-charcoal/5 overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-charcoal' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="mb-6">
              <p className="text-sm text-charcoal/60 mb-2">{product.category}</p>
              <h1 className="font-serif text-3xl md:text-4xl mb-4">{product.name}</h1>
              <p className="text-2xl font-medium">${product.price.toFixed(2)}</p>
            </div>

            {product.description && (
              <div className="mb-8">
                <p className="text-charcoal/70 leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="space-y-6">
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-3 tracking-wide">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2 border transition-all ${
                          selectedSize === size
                            ? 'border-charcoal bg-charcoal text-ivory'
                            : 'border-charcoal/20 hover:border-charcoal'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-3 tracking-wide">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-charcoal/20 hover:border-charcoal transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 border border-charcoal/20 hover:border-charcoal transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-4">
                {product.stock > 0 ? (
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize || added}
                    className="w-full px-8 py-4 bg-charcoal text-ivory hover:bg-charcoal/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full px-8 py-4 bg-charcoal/20 text-charcoal/50 cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}
                
                {product.stock > 0 && product.stock <= 5 && (
                  <p className="text-sm text-rose mt-2">
                    Only {product.stock} left in stock
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
