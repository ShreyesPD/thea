import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/')
  }

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-charcoal/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl md:text-4xl">Products</h1>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-6 py-3 bg-charcoal text-ivory hover:bg-charcoal/90 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>

        {products && products.length > 0 ? (
          <div className="bg-ivory border border-charcoal/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-charcoal/5 border-b border-charcoal/10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Stock</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-charcoal/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-charcoal/5 flex-shrink-0">
                          {product.images?.[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{product.category}</td>
                    <td className="px-6 py-4 text-sm">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={product.stock <= 5 ? 'text-rose' : ''}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 hover:bg-charcoal/10 rounded transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="p-2 hover:bg-rose/10 text-rose rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-ivory border border-charcoal/10 p-12 text-center">
            <p className="text-charcoal/70 mb-4">No products yet</p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-ivory hover:bg-charcoal/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Your First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
