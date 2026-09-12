export function formatTaskDate(isoDate) {
  if (!isoDate) return ''

  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day) // parse as local time, avoids UTC off-by-one

  if (isNaN(date.getTime())) return isoDate

  const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
  const monthShort = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)

  return `${dayName}, ${date.getDate()} ${monthShort} ${date.getFullYear()}`
}
