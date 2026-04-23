import Link from 'next/link'

import { requireAdmin } from '../_lib/auth'
import TableShell from '@/components/admin/tables/TableShell'
import SearchToolbar from '@/components/admin/SearchToolbar'
import { updateEnquiryStatus } from './actions'

interface EnquiriesPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EnquiriesPage({ searchParams }: EnquiriesPageProps) {
  const { supabase } = await requireAdmin()

  const resolvedSearchParams = await searchParams
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q : ''
  const statusFilter = typeof resolvedSearchParams?.status === 'string' ? resolvedSearchParams.status : ''

  let enquiriesQuery = supabase.from('enquiries').select('*').order('created_at', { ascending: false })

  if (query) {
    const likeQuery = `%${query}%`
    enquiriesQuery = enquiriesQuery.or(`name.ilike.${likeQuery},email.ilike.${likeQuery},message.ilike.${likeQuery}`)
  }

  if (statusFilter === 'unread') {
    enquiriesQuery = enquiriesQuery.eq('read', false)
  } else if (statusFilter === 'read') {
    enquiriesQuery = enquiriesQuery.eq('read', true)
  }

  const { data: enquiries } = await enquiriesQuery

  return (
    <div className="space-y-8">
      <TableShell
        title="Enquiries"
        description="Customer inquiries from the lookbook and contact forms."
        toolbar={
          <SearchToolbar
            placeholder="Search by name, email, or message"
            searchKey="q"
            filterKey="status"
            clearLabel="All"
            filters={[
              { label: 'Unread', value: 'unread' },
              { label: 'Read', value: 'read' }
            ]}
          />
        }
      >
        {enquiries && enquiries.length > 0 ? (
          <div className="space-y-4">
            {enquiries.map((enquiry) => (
              <div key={enquiry.id} className="rounded-2xl border border-neutral-200 bg-white/80 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium">{enquiry.name}</p>
                    <p className="text-sm text-charcoal/60">{enquiry.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <form action={updateEnquiryStatus}>
                      <input type="hidden" name="id" value={enquiry.id} />
                      <input type="hidden" name="read" value={(!enquiry.read).toString()} />
                      <button
                        type="submit"
                        className={`rounded-full px-4 py-1 text-xs uppercase tracking-wide ${
                          enquiry.read ? 'border border-charcoal/20 text-charcoal/60' : 'bg-charcoal text-ivory'
                        }`}
                      >
                        {enquiry.read ? 'Mark unread' : 'Mark read'}
                      </button>
                    </form>
                    <Link
                      href={`mailto:${enquiry.email}`}
                      className="rounded-full border border-charcoal/20 px-4 py-1 text-xs uppercase tracking-wide"
                    >
                      Reply
                    </Link>
                  </div>
                </div>
                <p className="mt-3 text-sm text-charcoal/70 whitespace-pre-line">{enquiry.message}</p>
                <p className="mt-2 text-xs text-charcoal/50">{new Date(enquiry.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-charcoal/20 py-16 text-center">
            <p className="text-charcoal/60">No enquiries match this filter.</p>
            <p className="text-sm text-charcoal/50">Relax for now.</p>
          </div>
        )}
      </TableShell>
    </div>
  )
}
