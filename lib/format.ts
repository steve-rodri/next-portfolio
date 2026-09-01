/** "March 2026 - Present" → "2026–now"; "May 2024 - September 2024" → "2024". */
export function formatPeriod(period: string): string {
  const years = period.match(/\d{4}/g)
  if (!years) return period.toLowerCase()
  const start = years[0]
  const end = /present|current|now/i.test(period) ? "now" : years[years.length - 1]
  if (start === end) return start
  return `${start}–${end}`
}

/** 3 → "03", used for the rail nav counts. */
export function padCount(n: number): string {
  return String(n).padStart(2, "0")
}
