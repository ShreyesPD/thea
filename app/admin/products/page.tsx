import { Plus } from 'lucide-react'

import { requireAdmin } from '../_lib/auth'
import TableShell from '@/components/admin/tables/TableShell'
import SearchToolbar from '@/components/admin/SearchToolbar'
import FormModal from '@/components/admin/FormModal'
import { createProduct, updateProduct, deleteProduct } from './actions'
import ProductForm from './components/ProductForm'
import ProductsTable from './components/ProductsTable'
import { extractCategories } from './utils/filters'
import { createCurrencyFormatter } from '../utils/metrics'

interface ProductsPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminProductsPage({ searchParams }: ProductsPageProps) {
  const { supabase } = await requireAdmin()

  const resolvedSearchParams = await searchParams
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q : ''
  const categoryFilter = typeof resolvedSearchParams?.category === 'string' ? resolvedSearchParams.category : ''

  let productsQuery = supabase.from('products').select('*').order('created_at', { ascending: false })

  if (query) {
    const likeQuery = `%${query}%`
    productsQuery = productsQuery.or(`name.ilike.${likeQuery},description.ilike.${likeQuery},category.ilike.${likeQuery}`)
  }

  if (categoryFilter) {
    productsQuery = productsQuery.eq('category', categoryFilter)
  }

  const { data: products } = await productsQuery

  const categories = extractCategories(products)
  const formatter = createCurrencyFormatter()

  return (
    <div className="space-y-8">
      <TableShell
        title="Products"
        description="Curate, price, and merchandise the collection."
        action={
          <FormModal
            title="Add product"
            description="Fill in key details before publishing."
            trigger={
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl bg-charcoal px-4 py-2 text-sm text-ivory shadow hover:bg-charcoal/90"
              >
                <Plus className="h-4 w-4" />
                New product
              </button>
            }
          >
            <ProductForm action={createProduct} />
          </FormModal>
        }
        toolbar={
          <SearchToolbar
            placeholder="Search by name, category, or story"
            searchKey="q"
            filterKey="category"
            clearLabel="All categories"
            filters={categories.map((category) => ({ label: category, value: category }))}
          />
        }
      >
        <ProductsTable 
          products={products} 
          formatter={formatter}
          updateAction={updateProduct}
          deleteAction={deleteProduct}
        />
      </TableShell>
    </div>
  )
}
