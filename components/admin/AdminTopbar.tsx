'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

interface AdminTopbarProps {
  adminName?: string | null
}

export default function AdminTopbar({ adminName }: AdminTopbarProps) {
  const pathname = usePathname()
  const segments = pathname?.split('/').filter(Boolean).slice(1) ?? []

  const title = segments.length === 0 ? 'Dashboard' : segments.map((segment) => segment.replace('-', ' ')).join(' / ')

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40">Admin</p>
          <h1 className="font-serif text-2xl mt-1 capitalize">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-charcoal/60">Welcome back</p>
            <p className="text-sm font-medium">{adminName || 'Admin'}</p>
          </div>
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-charcoal/10 px-4 py-2 text-sm text-charcoal hover:bg-charcoal hover:text-ivory transition"
          >
            View site
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
