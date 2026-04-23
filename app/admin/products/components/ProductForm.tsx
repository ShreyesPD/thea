interface ProductFormProps {
  action: (formData: FormData) => Promise<void>
  defaultValues?: {
    id?: string
    name?: string
    category?: string
    description?: string
    price?: number
    stock?: number
    images?: string[]
    sizes?: string[]
  }
  submitLabel?: string
}

export default function ProductForm({ 
  action, 
  defaultValues, 
  submitLabel = 'Create product' 
}: ProductFormProps) {
  return (
    <form action={action} className="space-y-4">
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}
      
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          Name
          <input 
            name="name" 
            required={!defaultValues}
            defaultValue={defaultValues?.name}
            className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm" 
          />
        </label>
        <label className="text-sm">
          Category
          <input 
            name="category" 
            defaultValue={defaultValues?.category ?? ''}
            className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm" 
          />
        </label>
      </div>

      <label className="text-sm block">
        Description
        <textarea 
          name="description" 
          rows={3} 
          defaultValue={defaultValues?.description ?? ''}
          className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm" 
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          Price (USD)
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required={!defaultValues}
            defaultValue={defaultValues?.price}
            className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm">
          Stock
          <input
            name="stock"
            type="number"
            min="0"
            required={!defaultValues}
            defaultValue={defaultValues?.stock}
            className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm"
          />
        </label>
      </div>

      <label className="text-sm block">
        Images (comma separated URLs)
        <textarea 
          name="images" 
          rows={2} 
          defaultValue={defaultValues?.images?.join(', ') ?? ''}
          className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm" 
        />
      </label>

      <label className="text-sm block">
        Sizes (comma separated)
        <input 
          name="sizes" 
          defaultValue={defaultValues?.sizes?.join(', ') ?? ''}
          className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm" 
        />
      </label>

      <div className="flex justify-end gap-3">
        {!defaultValues && (
          <button type="reset" className="rounded-xl border border-charcoal/20 px-4 py-2 text-sm text-charcoal/70">
            Reset
          </button>
        )}
        <button type="submit" className="rounded-xl bg-charcoal px-4 py-2 text-sm text-ivory">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
