import { Product } from '@/lib/types/database'

export interface InventoryTotals {
  count: number
  units: number
  critical: number
}

export function calculateInventoryTotals(
  products: Pick<Product, 'stock'>[] | null
): InventoryTotals {
  if (!products) {
    return { count: 0, units: 0, critical: 0 }
  }

  return {
    count: products.length,
    units: products.reduce((sum, product) => sum + (product.stock ?? 0), 0),
    critical: products.filter((product) => product.stock <= 5).length
  }
}
