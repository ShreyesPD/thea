import Link from 'next/link'
import { BellRing } from 'lucide-react'
import { Product } from '@/lib/types/database'

interface LowStockCardProps {
  products: Pick<Product, 'id' | 'name' | 'stock' | 'images'>[] | null
}

export default function LowStockCard({ products }: LowStockCardProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40">Inventory</p>
          <h2 className="font-serif text-2xl">Low stock alerts</h2>
        </div>
        <BellRing className="h-5 w-5 text-rose" />
      </div>

      <div className="mt-6 space-y-3">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product.id}
              href={`/admin/products/${product.id}`}
              className="flex items-center justify-between rounded-2xl border border-rose/30 bg-rose/5 px-4 py-3 text-sm"
            >
              <span>{product.name}</span>
              <span className="font-medium text-rose">{product.stock} left</span>
            </Link>
          ))
        ) : (
          <p className="text-sm text-charcoal/60">All products stocked</p>
        )}
      </div>
    </div>
  )
}
