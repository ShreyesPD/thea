'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'

export async function updateStock(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id')?.toString()
  const stockValue = formData.get('stock')?.toString()

  if (!id || typeof stockValue !== 'string') {
    throw new Error('Missing product information')
  }

  const stock = Number.parseInt(stockValue, 10)
  if (Number.isNaN(stock) || stock < 0) {
    throw new Error('Stock must be a positive number')
  }

  const { error } = await supabase.from('products').update({ stock }).eq('id', id)
  if (error) {
    throw error
  }

  revalidatePath('/admin/inventory')
  revalidatePath('/admin/products')
}
