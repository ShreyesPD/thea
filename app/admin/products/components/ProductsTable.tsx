import { Product } from '@/lib/types/database'
import ProductTableRow from './ProductTableRow'

interface ProductsTableProps {
  products: Product[] | null
  formatter: Intl.NumberFormat
  updateAction: (formData: FormData) => Promise<void>
  deleteAction: (formData: FormData) => Promise<void>
}

export default function ProductsTable({ 
  products, 
  formatter, 
  updateAction, 
  deleteAction 
}: ProductsTableProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-charcoal/20 py-16 text-center">
        <p className="text-charcoal/60">No products match this query.</p>
        <p className="text-sm text-charcoal/50">Use the search and filters above or add a new piece.</p>
      </div>
    )
  }

  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-left text-xs uppercase tracking-wide text-charcoal/50">
          <th className="px-4 py-3">Product</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Price</th>
          <th className="px-4 py-3">Stock</th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-200">
        {products.map((product) => (
          <ProductTableRow
            key={product.id}
            product={product}
            formatter={formatter}
            updateAction={updateAction}
            deleteAction={deleteAction}
          />
        ))}
      </tbody>
    </table>
  )
}
