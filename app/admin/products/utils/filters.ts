import { Product } from '@/lib/types/database'

export function extractCategories(products: Product[] | null): string[] {
  if (!products) return []
  return Array.from(
    new Set(products.map((product) => product.category).filter(Boolean))
  ).sort()
}
