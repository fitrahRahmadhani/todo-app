import { useSidebarStore } from '@/stores/sidebarStore'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('useSidebarStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useSidebarStore()
  })

  it('sidebar tertutup diawal', () => {
    expect(store.isOpen).toBe(false)
  })

  it('sidebar terbuka saat toggle dipanggil', () => {
    store.toggle()
    expect(store.isOpen).toBe(true)
  })

  it('sidebar tertutup saat toggle dipanggil dua kali', () => {
    store.toggle()
    store.toggle()
    expect(store.isOpen).toBe(false)
  })

  it('sidebar tertutup saat close dipanggil', () => {
    store.close()
    expect(store.isOpen).toBe(false)
  })

  it('sidebar tertutup saat close dipanggil dua kali', () => {
    store.close()
    store.close()
    expect(store.isOpen).toBe(false)
  })

  it('sidebar tertutup saat open dipanggil', () => {
    store.open()
    expect(store.isOpen).toBe(true)
  })

  it('sidebar terbuka saat open dipanggil dua kali', () => {
    store.open()
    store.open()
    expect(store.isOpen).toBe(true)
  })
})
