'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'

export async function updateEnquiryStatus(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id')?.toString()
  const readValue = formData.get('read')?.toString()

  if (!id || typeof readValue !== 'string') {
    throw new Error('Missing enquiry information')
  }

  const read = readValue === 'true'

  const { error } = await supabase.from('enquiries').update({ read }).eq('id', id)
  if (error) {
    throw error
  }

  revalidatePath('/admin/enquiries')
  revalidatePath('/admin')
}
