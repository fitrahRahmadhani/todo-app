import { useModalStore } from '@/stores/modalStore'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('useModalStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useModalStore()
  })

  it('belum ada modal yang terbuka di awal', () => {
    expect(store.isModalOpen('delete-task')).toBe(false)
  })

  describe('openModal', () => {
    it('mengaktifkan modal yang diminta', () => {
      store.openModal('delete-task')
      expect(store.activeModal).toBe('delete-task')
      expect(store.isModalOpen('delete-task')).toBe(true)
    })

    it('menyimpan data dan target yang diberikan', () => {
      store.openModal('edit-task', { id: 9 }, 'project')
      expect(store.activeModal).toBe('edit-task')
      expect(store.payload).toEqual({ id: 9 })
      expect(store.target).toBe('project')
    })

    it('memakai nilai default jika data dan target tidak diberikan', () => {
      store.openModal('edit-task')
      expect(store.activeModal).toBe('edit-task')
      expect(store.payload).toBeNull()
      expect(store.target).toBe('task')
    })

    it('menggantikan modal sebelumnya jika membuka modal lain', () => {
      store.openModal('edit-task')
      store.openModal('delete-task')
      expect(store.isModalOpen('edit-task')).toBe(false)
      expect(store.isModalOpen('delete-task')).toBe(true)
    })
  })
  describe('closeModal', () => {
    it('mengosongkan semua state', () => {
      store.openModal('edit-task', { id: 7 }, 'project')
      store.closeModal()
      expect(store.activeModal).toBeNull()
      expect(store.payload).toBeNull()
      expect(store.target).toBeNull()
    })

    it('membuat isModalOpen bernilai false', () => {
      store.openModal('edit-task')
      store.closeModal()
      expect(store.isModalOpen('edit-task')).toBe(false)
    })
  })
})
