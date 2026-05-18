import { Product } from '@/lib/types/database'

interface InventoryTableProps {
  products: Pick<Product, 'id' | 'name' | 'stock' | 'images' | 'category'>[] | null
  updateStockAction: (formData: FormData) => Promise<void>
}

function getStockBadgeClass(stock: number): string {
  if (stock <= 5) return 'bg-rose/10 text-rose'
  if (stock <= 15) return 'bg-gold/10 text-gold'
  return 'bg-emerald-50 text-emerald-600'
}

export default function InventoryTable({ products, updateStockAction }: InventoryTableProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-charcoal/20 py-16 text-center">
        <p className="text-charcoal/60">No inventory records match this filter.</p>
        <p className="text-sm text-charcoal/50">Try adjusting the search or add new products.</p>
      </div>
    )
  }

  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-left text-xs uppercase tracking-wide text-charcoal/50">
          <th className="px-4 py-3">Product</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Current stock</th>
          <th className="px-4 py-3 text-right">Adjust</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-200">
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-4 py-3">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-xs text-charcoal/60">ID {product.id.slice(0, 8)}</p>
              </div>
            </td>
            <td className="px-4 py-3 capitalize">{product.category || '—'}</td>
            <td className="px-4 py-3">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStockBadgeClass(product.stock)}`}>
                {product.stock} units
              </span>
            </td>
            <td className="px-4 py-3">
              <form action={updateStockAction} className="flex items-center justify-end gap-2 text-sm">
                <input type="hidden" name="id" value={product.id} />
                <label htmlFor={`stock-${product.id}`} className="sr-only">
                  Stock quantity for {product.name}
                </label>
                <input
                  id={`stock-${product.id}`}
                  type="number"
                  name="stock"
                  min={0}
                  defaultValue={product.stock}
                  className="w-24 rounded-xl border border-charcoal/20 px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  aria-label={`Update stock for ${product.name}`}
                  className="rounded-xl border border-charcoal/20 px-3 py-2 text-xs uppercase tracking-wide"
                >
                  Update
                </button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
