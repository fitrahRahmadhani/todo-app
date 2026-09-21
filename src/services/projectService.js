const STORAGE_KEY = 'projects'

const DEFAULT_PROJECTS = [
  { id: 'project-marketing', name: 'Marketing', color: '#EE1367' },
  { id: 'project-desain', name: 'Desain', color: '#3F13EE' },
  { id: 'project-finance', name: 'Finance', color: '#EE6413' },
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
