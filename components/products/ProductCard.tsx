import Link from 'next/link'
import type { Product } from '@/lib/types/database'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0] || '/placeholder-product.jpg'
  const isOutOfStock = product.stock === 0

  return (
    <Link href={`/shop/${product.id}`} className="group">
      <div className="relative overflow-hidden bg-charcoal/5 aspect-[3/4] mb-4">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
            <span className="text-ivory text-sm tracking-wide">OUT OF STOCK</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm tracking-wide group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-charcoal/60">{product.category}</p>
        <p className="font-medium">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  )
}
