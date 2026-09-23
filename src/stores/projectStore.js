import { projectService } from '@/services/projectService'
import { generateSlug } from '@/utils/formatText'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

export const useProjectStore = defineStore('project', () => {
  const projects = ref(projectService.getAll())

  function getProjectById(projectId) {
    return projects.value.find((p) => p.id === projectId)
  }

  function getProjectName(projectId) {
    return projects.value.find((p) => p.id === projectId).name ?? '-'
  }

  function addProject({ name, color }) {
    const newProject = {
      id: generateSlug(name),
      name: name,
      color: color,
    }
    projects.value.push(newProject)
    toast.success('Project created successfully')
  }

  return {
    projects,
    getProjectById,
    getProjectName,
    addProject,
  }
})
