import SummaryCard from '@/components/admin/metrics/SummaryCard'

interface Metric {
  label: string
  value: string
  icon: React.ReactNode
  trend: { value: string; isUp: boolean }
  accent: 'charcoal' | 'gold' | 'rose'
}

interface MetricsSectionProps {
  metrics: Metric[]
}

export default function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <SummaryCard key={metric.label} {...metric} />
      ))}
    </section>
  )
}
