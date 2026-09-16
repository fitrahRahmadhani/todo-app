export function formatTaskDate(isoDate) {
  if (!isoDate) return ''

  const date = new Date(isoDate)
  if (isNaN(date.getTime())) return ''

  const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
  const monthShort = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
  const time = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)

  return `${dayName}, ${date.getDate()} ${monthShort} ${date.getFullYear()}, ${time}`
}

export function formatDateTime(dateInput) {
  if (!dateInput) return ''

  const date = new Date(dateInput)
  if (isNaN(date.getTime())) return ''

  return date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function formatDate(dateInput) {
  if (!dateInput) return ''

  const date = new Date(dateInput)
  if (isNaN(date.getTime())) return ''

  return date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatTimeObject(timeInput) {
  if (!timeInput) return ''

  const { hours, minutes } = timeInput
  if (hours == null || minutes == null) return ''

  const paddedHours = String(hours).padStart(2, '0')
  const paddedMinutes = String(minutes).padStart(2, '0')

  return `${paddedHours}:${paddedMinutes}`
}

export function isToday(dateInput) {
  if (!dateInput) return false

  const date = new Date(dateInput)
  const today = new Date()

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}
