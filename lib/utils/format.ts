export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount)
}

export function formatDate(
  date: string | Date,
  locale = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, options)
}

export function truncateId(id: string, length = 8): string {
  return id.slice(0, length)
}

export function parseCommaSeparated(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== 'string' || !value.trim()) {
    return []
  }
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}
