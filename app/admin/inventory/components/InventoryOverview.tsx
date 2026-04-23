interface InventoryTotals {
  count: number
  units: number
  critical: number
}

interface InventoryOverviewProps {
  totals: InventoryTotals
}

export default function InventoryOverview({ totals }: InventoryOverviewProps) {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40">Inventory overview</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm text-charcoal/60">Total SKUs</p>
          <p className="font-serif text-3xl">{totals.count}</p>
        </div>
        <div>
          <p className="text-sm text-charcoal/60">Units on hand</p>
          <p className="font-serif text-3xl">{totals.units}</p>
        </div>
        <div>
          <p className="text-sm text-charcoal/60">Critical alerts</p>
          <p className="font-serif text-3xl text-rose">{totals.critical}</p>
        </div>
      </div>
    </section>
  )
}
