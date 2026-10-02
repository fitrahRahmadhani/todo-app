import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { projectService } from '@/services/projectService'
import { generateSlug } from '@/utils/formatText'
import { toast } from 'vue-sonner'
import router from '@/router'
import { useProjectStore } from '@/stores/projectStore'

vi.mock('@/services/projectService', () => ({
  projectService: { getAll: vi.fn(), saveAll: vi.fn() },
}))
vi.mock('vue-sonner', () => ({
  toast: { success: vi.fn() },
}))
vi.mock('@/router', () => ({
  default: { push: vi.fn() },
}))

describe('useProjectStore', () => {
  let store

  beforeEach(() => {
    vi.clearAllMocks()
    projectService.getAll.mockReturnValue([
      { id: 'work', title: 'Work', color: 'red' },
      { id: 'home', title: 'Home', color: 'blue' },
    ])
    setActivePinia(createPinia())
    store = useProjectStore()
  })

  it('memuat project dari service saat store dibuat', () => {
    expect(store.projects).toHaveLength(2)
    expect(projectService.getAll).toHaveBeenCalledTimes(1)
  })

  describe('getProjectById', () => {
    it('mengembalikan project yang cocok', () => {
      expect(store.getProjectById('work').title).toBe('Work')
    })

    it('mengembalikan undefined jika tidak ditemukan', () => {
      expect(store.getProjectById('tidak-ada')).toBeUndefined()
    })
  })

  describe('getProjectName', () => {
    it('mengembalikan judul project', () => {
      expect(store.getProjectName('home')).toBe('Home')
    })

    it('mengembalikan "-" jika project tidak ditemukan', () => {
      expect(store.getProjectName('tidak-ada')).toBe('-')
    })
  })

  describe('addProject', () => {
    it('menambahkan project dengan id dari slug judul', () => {
      store.addProject({ title: 'Side Project', color: 'green' })

      expect(store.projects).toHaveLength(3)
      expect(store.getProjectById(generateSlug('Side Project'))).toEqual({
        id: generateSlug('Side Project'),
        title: 'Side Project',
        color: 'green',
      })
    })

    it('menampilkan toast sukses', () => {
      store.addProject({ title: 'Side Project', color: 'green' })
      expect(toast.success).toHaveBeenCalledWith('Project created successfully')
    })
  })

  describe('destroyProject', () => {
    it('menghapus project yang dipilih', () => {
      store.destroyProject('work')

      expect(store.projects).toHaveLength(1)
      expect(store.getProjectById('work')).toBeUndefined()
    })

    it('menampilkan toast dan pindah ke halaman today', () => {
      store.destroyProject('work')

      expect(toast.success).toHaveBeenCalledWith('Project deleted successfully')
      expect(router.push).toHaveBeenCalledWith({ name: 'today' })
    })

    it('tidak melakukan apa pun jika project tidak ditemukan', () => {
      store.destroyProject('tidak-ada')

      expect(store.projects).toHaveLength(2)
      expect(toast.success).not.toHaveBeenCalled()
      expect(router.push).not.toHaveBeenCalled()
    })
  })

  describe('penyimpanan otomatis', () => {
    it('tidak menyimpan jika belum ada perubahan', async () => {
      await nextTick()
      expect(projectService.saveAll).not.toHaveBeenCalled()
    })

    it('menyimpan setelah project ditambah', async () => {
      store.addProject({ title: 'Side Project', color: 'green' })
      await nextTick()

      expect(projectService.saveAll).toHaveBeenCalledTimes(1)
      expect(projectService.saveAll.mock.calls[0][0]).toHaveLength(3)
    })

    it('menyimpan setelah project dihapus', async () => {
      store.destroyProject('work')
      await nextTick()

      expect(projectService.saveAll).toHaveBeenCalledTimes(1)
      expect(projectService.saveAll.mock.calls[0][0]).toHaveLength(1)
    })
  })
})
