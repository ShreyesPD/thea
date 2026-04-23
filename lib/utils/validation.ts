export function parseNumber(value: FormDataEntryValue | null): number | null {
  if (typeof value !== 'string') return null
  const parsed = parseFloat(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function parseInteger(value: FormDataEntryValue | null): number | null {
  if (typeof value !== 'string') return null
  const parsed = parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : null
}

export function validateRequired(value: unknown, fieldName: string): void {
  if (!value) {
    throw new Error(`${fieldName} is required`)
  }
}

export function validatePositive(value: number, fieldName: string): void {
  if (value < 0) {
    throw new Error(`${fieldName} must be positive`)
  }
}
