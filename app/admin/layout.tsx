import { ReactNode } from 'react'

import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'
import { requireAdmin } from './_lib/auth'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { profile, user } = await requireAdmin()

  return (
    <div className="min-h-screen bg-neutral-50 text-charcoal">
      <div className="flex min-h-screen">
        <AdminSidebar adminName={profile?.name} email={user.email} />
        <div className="flex-1">
          <AdminTopbar adminName={profile?.name} />
          <div className="px-4 py-6 md:px-8 lg:px-12">{children}</div>
        </div>
      </div>
    </div>
  )
}
