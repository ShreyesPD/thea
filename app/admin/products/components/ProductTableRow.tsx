import { Edit, Trash2 } from 'lucide-react'
import FormModal from '@/components/admin/FormModal'
import { Product } from '@/lib/types/database'
import ProductForm from './ProductForm'

interface ProductTableRowProps {
  product: Product
  formatter: Intl.NumberFormat
  updateAction: (formData: FormData) => Promise<void>
  deleteAction: (formData: FormData) => Promise<void>
}

export default function ProductTableRow({ 
  product, 
  formatter, 
  updateAction, 
  deleteAction 
}: ProductTableRowProps) {
  return (
    <tr className="text-sm">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-xl bg-charcoal/5">
            {product.images?.[0] ? (
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="h-full w-full object-cover" 
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-charcoal/40">
                No image
              </div>
            )}
          </div>
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-xs text-charcoal/60">ID {product.id.slice(0, 8)}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 capitalize">{product.category || '—'}</td>
      <td className="px-4 py-3">{formatter.format(Number(product.price))}</td>
      <td className="px-4 py-3">
        <span 
          className={
            product.stock <= 5 
              ? 'rounded-full bg-rose/10 px-3 py-1 text-xs font-medium text-rose' 
              : 'rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600'
          }
        >
          {product.stock} units
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <FormModal
            title={`Edit ${product.name}`}
            trigger={
              <button
                type="button"
                className="rounded-full p-2 text-charcoal/70 hover:bg-charcoal/10"
                aria-label={`Edit ${product.name}`}
              >
                <Edit className="h-4 w-4" />
              </button>
            }
          >
            <ProductForm 
              action={updateAction} 
              defaultValues={product}
              submitLabel="Save changes"
            />
          </FormModal>

          <form action={deleteAction}>
            <input type="hidden" name="id" value={product.id} />
            <button
              type="submit"
              className="rounded-full p-2 text-rose hover:bg-rose/10"
              aria-label={`Delete ${product.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </form>
        </div>
      </td>
    </tr>
  )
}
