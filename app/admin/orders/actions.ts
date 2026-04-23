'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { OrderStatus } from '@/lib/types/database'

const ORDER_STATUSES: OrderStatus[] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

export async function updateOrderStatus(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id')?.toString()
  const status = formData.get('status')?.toString() as OrderStatus | undefined

  if (!id || !status || !ORDER_STATUSES.includes(status)) {
    throw new Error('Invalid order status update')
  }

  const { error } = await supabase.from('orders').update({ status }).eq('id', id)
  if (error) {
    throw error
  }

  revalidatePath('/admin/orders')
  revalidatePath('/admin')
}
