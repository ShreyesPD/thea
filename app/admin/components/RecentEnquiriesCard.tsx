import Link from 'next/link'
import { Enquiry } from '@/lib/types/database'

interface RecentEnquiriesCardProps {
  enquiries: Enquiry[] | null
}

export default function RecentEnquiriesCard({ enquiries }: RecentEnquiriesCardProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40">Enquiries</p>
          <h2 className="font-serif text-2xl">Recent messages</h2>
        </div>
        <Link href="/admin/enquiries" className="text-sm text-charcoal/70 hover:text-charcoal">
          View all
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {enquiries && enquiries.length > 0 ? (
          enquiries.map((enquiry) => (
            <div key={enquiry.id} className="rounded-2xl border border-neutral-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{enquiry.name}</p>
                  <p className="text-xs text-charcoal/60">{enquiry.email}</p>
                </div>
                <span className="text-xs text-charcoal/60">
                  {new Date(enquiry.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-3 text-sm text-charcoal/70 line-clamp-2">{enquiry.message}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-charcoal/60">No enquiries yet</p>
        )}
      </div>
    </div>
  )
}
