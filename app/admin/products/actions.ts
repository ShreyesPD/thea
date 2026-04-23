'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { parseCommaSeparated } from '@/lib/utils/format'
import { parseNumber, parseInteger, validateRequired } from '@/lib/utils/validation'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name')?.toString().trim()
  const description = formData.get('description')?.toString().trim() ?? ''
  const category = formData.get('category')?.toString().trim() ?? ''
  const images = parseCommaSeparated(formData.get('images'))
  const sizes = parseCommaSeparated(formData.get('sizes'))
  const price = parseNumber(formData.get('price'))
  const stock = parseInteger(formData.get('stock'))

  validateRequired(name, 'Product name')
  validateRequired(price, 'Price')
  validateRequired(stock, 'Stock')

  const { error } = await supabase.from('products').insert({
    name,
    description,
    category,
    images,
    sizes,
    price,
    stock
  })

  if (error) {
    throw error
  }

  revalidatePath('/admin/products')
  revalidatePath('/admin/inventory')
}

export async function updateProduct(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id')?.toString()
  validateRequired(id, 'Product ID')

  const payload: Record<string, unknown> = {}
  const maybePrice = parseNumber(formData.get('price'))
  const maybeStock = parseInteger(formData.get('stock'))

  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const category = formData.get('category')?.toString()

  if (name) payload.name = name
  if (description) payload.description = description
  if (category) payload.category = category

  const images = parseCommaSeparated(formData.get('images'))
  const sizes = parseCommaSeparated(formData.get('sizes'))
  
  if (images.length) payload.images = images
  if (sizes.length) payload.sizes = sizes
  if (maybePrice !== null) payload.price = maybePrice
  if (maybeStock !== null) payload.stock = maybeStock

  const { error } = await supabase.from('products').update(payload).eq('id', id)
  if (error) {
    throw error
  }

  revalidatePath('/admin/products')
  revalidatePath('/admin/inventory')
}

export async function deleteProduct(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id')?.toString()
  validateRequired(id, 'Product ID')

  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) {
    throw error
  }

  revalidatePath('/admin/products')
  revalidatePath('/admin/inventory')
}
