interface SummaryCardProps {
  label: string
  value: string
  icon: React.ReactNode
  trend?: {
    value: string
    isUp?: boolean
  }
  accent?: 'rose' | 'gold' | 'charcoal'
}

const accentStyles: Record<NonNullable<SummaryCardProps['accent']>, string> = {
  rose: 'border-rose/30 bg-rose/5',
  gold: 'border-gold/30 bg-gold/5',
  charcoal: 'border-charcoal/20 bg-charcoal/5'
}

export default function SummaryCard({ label, value, icon, trend, accent = 'charcoal' }: SummaryCardProps) {
  return (
    <div
      className={`rounded-3xl border ${accentStyles[accent]} p-5 transition hover:-translate-y-0.5 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-charcoal/50">{label}</p>
        <div className="rounded-2xl bg-white/80 p-3 shadow-sm text-charcoal/70">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <p className="font-serif text-4xl">{value}</p>
        {trend && (
          <p className={`text-xs font-medium ${trend.isUp ? 'text-emerald-600' : 'text-rose-500'}`}>
            {trend.isUp ? '▲' : '▼'} {trend.value}
          </p>
        )}
      </div>
    </div>
  )
}
