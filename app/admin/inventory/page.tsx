import { requireAdmin } from '../_lib/auth'
import TableShell from '@/components/admin/tables/TableShell'
import SearchToolbar from '@/components/admin/SearchToolbar'
import { updateStock } from './actions'
import InventoryOverview from './components/InventoryOverview'
import InventoryTable from './components/InventoryTable'
import { calculateInventoryTotals } from './utils/calculations'

interface InventoryPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function InventoryPage({ searchParams }: InventoryPageProps) {
  const { supabase } = await requireAdmin()

  const resolvedSearchParams = await searchParams
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q : ''
  const stockFilter = typeof resolvedSearchParams?.level === 'string' ? resolvedSearchParams.level : ''

  let productsQuery = supabase.from('products').select('id, name, stock, images, category').order('stock', { ascending: true })

  if (query) {
    const likeQuery = `%${query}%`
    productsQuery = productsQuery.or(`name.ilike.${likeQuery},category.ilike.${likeQuery}`)
  }

  if (stockFilter === 'critical') {
    productsQuery = productsQuery.lte('stock', 5)
  } else if (stockFilter === 'low') {
    productsQuery = productsQuery.gt('stock', 5).lte('stock', 15)
  } else if (stockFilter === 'healthy') {
    productsQuery = productsQuery.gt('stock', 15)
  }

  const { data: products } = await productsQuery

  const totals = calculateInventoryTotals(products)

  return (
    <div className="space-y-8">
      <InventoryOverview totals={totals} />

      <TableShell
        title="Inventory"
        description="Keep stock levels balanced ahead of launches."
        toolbar={
          <SearchToolbar
            placeholder="Search by product or category"
            searchKey="q"
            filterKey="level"
            clearLabel="All levels"
            filters={[
              { label: 'Critical (≤5)', value: 'critical' },
              { label: 'Low (6-15)', value: 'low' },
              { label: 'Healthy (15+)', value: 'healthy' }
            ]}
          />
        }
      >
        <InventoryTable products={products} updateStockAction={updateStock} />
      </TableShell>
    </div>
  )
}
