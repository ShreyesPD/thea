'use client'

import { useSearchParams as useNextSearchParams, usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

export function useSearchParams() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useNextSearchParams()
  const [isPending, startTransition] = useTransition()

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    })

    const queryString = next.toString()
    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname)
    })
  }

  return {
    params,
    updateParams,
    isPending
  }
}
