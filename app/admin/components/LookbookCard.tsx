import Link from 'next/link'

export default function LookbookCard() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40">Collections</p>
          <h2 className="font-serif text-2xl">Lookbook</h2>
        </div>
        <Link href="/admin/lookbook" className="text-sm text-charcoal/70 hover:text-charcoal">
          Manage
        </Link>
      </div>
      <p className="mt-4 text-sm text-charcoal/60">
        Upload campaigns, schedule launches, and keep visuals cohesive.
      </p>
      <Link
        href="/admin/lookbook/new"
        className="mt-6 inline-flex items-center justify-center rounded-2xl border border-charcoal/20 px-4 py-3 text-sm text-charcoal hover:bg-charcoal hover:text-ivory"
      >
        Upload collection
      </Link>
    </div>
  )
}
