import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/products/ProductCard'
import { Filter } from 'lucide-react'

export default async function ShopPage() {
  const supabase = await createClient()
  
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  const categories = products 
    ? Array.from(new Set(products.map(p => p.category)))
    : []

  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Shop Collection</h1>
          <p className="text-charcoal/70">Discover timeless pieces crafted for you</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-4 h-4" />
                <h2 className="font-medium tracking-wide">Filters</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3 tracking-wide">Categories</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded border-charcoal/20" />
                      <span>All</span>
                    </label>
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="rounded border-charcoal/20" />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3 tracking-wide">Price Range</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded border-charcoal/20" />
                      <span>Under $50</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded border-charcoal/20" />
                      <span>$50 - $100</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded border-charcoal/20" />
                      <span>$100 - $200</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded border-charcoal/20" />
                      <span>Over $200</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3 tracking-wide">Availability</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded border-charcoal/20" />
                      <span>In Stock</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded border-charcoal/20" />
                      <span>Out of Stock</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {products && products.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-charcoal/70">
                    {products.length} {products.length === 1 ? 'product' : 'products'}
                  </p>
                  <select className="text-sm border border-charcoal/20 px-4 py-2 focus:outline-none focus:border-gold">
                    <option>Sort by: Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Name: A to Z</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-charcoal/70">No products available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
