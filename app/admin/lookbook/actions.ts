'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'

function parseCommaSeparated(value: FormDataEntryValue | null) {
  if (typeof value !== 'string' || !value.trim()) return []
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

export async function createCollection(formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title')?.toString().trim()
  const description = formData.get('description')?.toString() ?? ''
  const season = formData.get('season')?.toString() ?? ''
  const yearValue = formData.get('year')?.toString() ?? ''
  const images = parseCommaSeparated(formData.get('images'))

  if (!title) {
    throw new Error('Title is required')
  }

  const year = yearValue ? Number.parseInt(yearValue, 10) : null

  const { error } = await supabase.from('lookbook_collections').insert({
    title,
    description,
    season,
    year,
    images
  })

  if (error) {
    throw error
  }

  revalidatePath('/admin/lookbook')
}

export async function updateCollection(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id')?.toString()
  if (!id) {
    throw new Error('Collection ID missing')
  }

  const payload: Record<string, unknown> = {}
  const fields = ['title', 'description', 'season'] as const
  fields.forEach((field) => {
    const value = formData.get(field)?.toString()
    if (typeof value === 'string') {
      payload[field] = value
    }
  })

  const yearValue = formData.get('year')?.toString()
  if (yearValue) {
    const parsed = Number.parseInt(yearValue, 10)
    if (!Number.isNaN(parsed)) {
      payload.year = parsed
    }
  }

  const images = parseCommaSeparated(formData.get('images'))
  if (images.length) {
    payload.images = images
  }

  const { error } = await supabase.from('lookbook_collections').update(payload).eq('id', id)
  if (error) {
    throw error
  }

  revalidatePath('/admin/lookbook')
}

export async function deleteCollection(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id')?.toString()
  if (!id) {
    throw new Error('Collection ID missing')
  }

  const { error } = await supabase.from('lookbook_collections').delete().eq('id', id)
  if (error) {
    throw error
  }

  revalidatePath('/admin/lookbook')
}
