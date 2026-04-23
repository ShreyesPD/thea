import { ReactNode } from 'react'

interface TableShellProps {
  title: string
  description?: string
  action?: ReactNode
  toolbar?: ReactNode
  children: ReactNode
}

export default function TableShell({ title, description, action, toolbar, children }: TableShellProps) {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-serif text-2xl">{title}</h2>
          {description && <p className="text-sm text-charcoal/60">{description}</p>}
        </div>
        {action}
      </div>

      {toolbar && <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">{toolbar}</div>}

      <div className="mt-6 overflow-x-auto">{children}</div>
    </section>
  )
}
