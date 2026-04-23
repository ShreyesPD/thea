'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, PackageSearch, Boxes, ShoppingBag, MessageSquare, Image, LogOut } from 'lucide-react'

interface AdminSidebarProps {
  adminName?: string | null
  email?: string | null
}

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: PackageSearch },
  { label: 'Inventory', href: '/admin/inventory', icon: Boxes },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { label: 'Lookbook', href: '/admin/lookbook', icon: Image }
]

function NavLink({ href, label, icon: Icon }: NavItem) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-2 text-sm transition-all ${
        isActive
          ? 'bg-charcoal text-ivory shadow-lg'
          : 'text-charcoal/70 hover:bg-charcoal/10 hover:text-charcoal'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  )
}

export default function AdminSidebar({ adminName, email }: AdminSidebarProps) {
  return (
    <aside className="hidden lg:flex lg:flex-col border-r border-neutral-200 bg-white/60 backdrop-blur">
      <div className="p-6 border-b border-neutral-200">
        <Link href="/admin" className="text-2xl font-serif tracking-tight">
          Thea Admin
        </Link>
        <p className="mt-2 text-sm text-charcoal/60">Run the atelier with grace.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-charcoal/40 mb-3">Navigation</p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-charcoal/10 bg-ivory/70 p-4">
          <p className="text-sm font-medium">{adminName || 'Admin'}</p>
          <p className="text-xs text-charcoal/60 truncate">{email}</p>
          <p className="mt-3 text-xs text-charcoal/60">
            Tip: Keep inventory synced before launching a new drop.
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-neutral-200">
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-charcoal/10 px-4 py-2 text-sm text-charcoal hover:bg-charcoal hover:text-ivory transition"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
