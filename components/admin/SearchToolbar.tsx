'use client'

import { FormEvent, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

interface FilterOption {
  label: string
  value: string
}

interface SearchToolbarProps {
  placeholder?: string
  searchKey?: string
  filterKey?: string
  filters?: FilterOption[]
  clearLabel?: string
}

export default function SearchToolbar({
  placeholder = 'Search records…',
  searchKey = 'q',
  filterKey,
  filters,
  clearLabel = 'All'
}: SearchToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState(() => params.get(searchKey) ?? '')

  const currentFilter = filterKey ? params.get(filterKey) ?? '' : ''

  const updateQuery = (nextParams: URLSearchParams) => {
    const queryString = nextParams.toString()
    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname)
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = new URLSearchParams(params)
    if (value.trim()) {
      next.set(searchKey, value.trim())
    } else {
      next.delete(searchKey)
    }
    updateQuery(next)
  }

  const handleFilterChange = (nextValue: string) => {
    if (!filterKey) return
    const next = new URLSearchParams(params)
    if (nextValue) {
      next.set(filterKey, nextValue)
    } else {
      next.delete(filterKey)
    }
    updateQuery(next)
  }

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <form onSubmit={handleSubmit} className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
        <input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-charcoal/10 bg-white px-10 py-2 text-sm focus:border-charcoal focus:outline-none"
          aria-label="Search"
        />
        <button
          type="submit"
          disabled={isPending}
          className="hidden"
        >
          Search
        </button>
      </form>

      {filters && filterKey && (
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-charcoal/40">Filter</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleFilterChange('')}
              className={`rounded-full border px-4 py-1 text-sm transition ${
                currentFilter === ''
                  ? 'border-charcoal bg-charcoal text-ivory'
                  : 'border-charcoal/10 text-charcoal hover:border-charcoal/40'
              }`}
            >
              {clearLabel}
            </button>
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => handleFilterChange(filter.value)}
                className={`rounded-full border px-4 py-1 text-sm capitalize transition ${
                  currentFilter === filter.value
                    ? 'border-charcoal bg-charcoal text-ivory'
                    : 'border-charcoal/10 text-charcoal hover:border-charcoal/40'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
