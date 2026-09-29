import {
  formatCompletedTaskDate,
  formatDate,
  formatDateTime,
  formatTaskDate,
  formatTimeObject,
  isToday,
  isUpcoming,
} from '@/utils/formatDate'
import { describe, expect, it } from 'vitest'

const FIXED_DATE = new Date(2026, 2, 15, 9, 5, 0)

describe('formatTaskDate', () => {
  it('return nama hari, tanggal, bulan, tahun, dan jam', () => {
    expect(formatTaskDate(FIXED_DATE)).toBe('Sunday, 15 Mar 2026, 09:05')
  })

  it('return hyphen kalau input null/undefined/kosong', () => {
    expect(formatTaskDate(null)).toBe('-')
    expect(formatTaskDate(undefined)).toBe('-')
    expect(formatTaskDate()).toBe('-')
  })

  it('return hyphen kalau input tidak valid', () => {
    expect(formatTaskDate('test')).toBe('-')
  })
})

describe('formatCompletedTaskDate', () => {
  it('return tanggal, bulan, tahun, dan jam', () => {
    expect(formatCompletedTaskDate(FIXED_DATE)).toBe('15 Mar 2026, 09:05')
  })

  it('return hyphen kalau input null/undefined/kosong', () => {
    expect(formatCompletedTaskDate(null)).toBe('-')
    expect(formatCompletedTaskDate(undefined)).toBe('-')
    expect(formatCompletedTaskDate()).toBe('-')
  })

  it('return hyphen kalau input tidak valid', () => {
    expect(formatCompletedTaskDate('test')).toBe('-')
  })
})

describe('formatDateTime', () => {
  it('return bulan, tanggal, dan jam', () => {
    expect(formatDateTime(FIXED_DATE)).toBe('Mar 15, 09:05')
  })

  it('return hyphen kalau input null/undefined/kosong', () => {
    expect(formatDateTime(null)).toBe('-')
    expect(formatDateTime(undefined)).toBe('-')
    expect(formatDateTime()).toBe('-')
  })

  it('return hyphen kalau input tidak valid', () => {
    expect(formatDateTime('test')).toBe('-')
  })
})

describe('formatDate', () => {
  it('return tanggal, bulan, dan tahun', () => {
    expect(formatDate(FIXED_DATE)).toBe('Mar 15, 2026')
  })

  it('return hyphen kalau input null/undefined/kosong', () => {
    expect(formatDate(null)).toBe('-')
    expect(formatDate(undefined)).toBe('-')
    expect(formatDate()).toBe('-')
  })

  it('return hyphen kalau input tidak valid', () => {
    expect(formatDate('test')).toBe('-')
  })
})

describe('formatTimeObject', () => {
  it('nge-pad angka satu digit jadi dua digit', () => {
    expect(formatTimeObject({ hours: 9, minutes: 5 })).toBe('09:05')
  })

  it('hours dan minutes 0 tetap dianggap valid (bukan "kosong")', () => {
    expect(formatTimeObject({ hours: 0, minutes: 0 })).toBe('00:00')
  })

  it('return string kosong kalau hours atau minutes null', () => {
    expect(formatTimeObject({ hours: 0, minutes: null })).toBe('')
    expect(formatTimeObject({ hours: null, minutes: 5 })).toBe('')
  })

  it('return string kosong kalau input-nya sendiri null/undefined', () => {
    expect(formatTimeObject(null)).toBe('')
    expect(formatTimeObject(undefined)).toBe('')
  })
})

describe('isToday', () => {
  it('return true kalau tanggalnya hari ini', () => {
    expect(isToday(new Date().toISOString())).toBe(true)
  })

  it('return false kalau tanggalnya besok', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    expect(isToday(tomorrow.toISOString())).toBe(false)
  })

  it('return false kalau tanggalnya kemarin', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(isToday(yesterday.toISOString())).toBe(false)
  })

  it('return false kalau input-nya kosong', () => {
    expect(isToday(null)).toBe(false)
    expect(isToday(undefined)).toBe(false)
    expect(isToday('')).toBe(false)
  })
})

describe('isUpcoming', () => {
  it('return true kalau tanggalnya besok', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    expect(isUpcoming(tomorrow.toISOString())).toBe(true)
  })

  it('return true kalau tanggalnya jauh di masa depan', () => {
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    expect(isUpcoming(nextMonth.toISOString())).toBe(true)
  })

  it('return false kalau tanggalnya hari ini', () => {
    expect(isUpcoming(new Date().toISOString())).toBe(false)
  })

  it('return false kalau tanggalnya sudah lewat (kemarin)', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(isUpcoming(yesterday.toISOString())).toBe(false)
  })

  it('return false kalau input-nya kosong atau nggak valid', () => {
    expect(isUpcoming(null)).toBe(false)
    expect(isUpcoming('bukan-tanggal')).toBe(false)
  })
})
