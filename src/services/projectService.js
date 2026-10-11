const STORAGE_KEY = 'projects'

const DEFAULT_PROJECTS = [
  { id: 'pribadi', title: 'Pribadi', color: '#EE1367' },
  { id: 'kerja', title: 'Pekerjaan', color: '#3F13EE' },
  { id: 'belajar', title: 'Belajar', color: '#EE6413' },
]

export const projectService = {
  getAll() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw == null) {
      this.saveAll(DEFAULT_PROJECTS)
      return DEFAULT_PROJECTS
    }
    return JSON.parse(raw)
  },

  saveAll(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  },
}
