import { projectService } from '@/services/projectService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectStore = defineStore('project', () => {
  const projects = ref(projectService.getAll())

  function getProjectById(projectId) {
    return projects.value.find((p) => p.id === projectId)
  }

  function getProjectName(projectId) {
    return projects.value.find((p) => p.id === projectId).name ?? '-'
  }

  return {
    projects,
    getProjectById,
    getProjectName,
  }
})
