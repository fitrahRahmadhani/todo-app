import router from '@/router'
import { projectService } from '@/services/projectService'
import { generateSlug } from '@/utils/formatText'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'

export const useProjectStore = defineStore('project', () => {
  const projects = ref(projectService.getAll())

  watch(
    projects,
    (newProjects) => {
      projectService.saveAll(newProjects)
    },
    { deep: true },
  )

  function getProjectById(projectId) {
    return projects.value.find((p) => p.id === projectId)
  }

  function getProjectName(projectId) {
    return projects.value.find((p) => p.id === projectId).title ?? '-'
  }

  function addProject({ title, color }) {
    const newProject = {
      id: generateSlug(title),
      title: title,
      color: color,
    }
    projects.value.push(newProject)
    toast.success('Project created successfully')
  }

  function destroyProject(projectId) {
    const projectIndex = projects.value.findIndex((p) => p.id === projectId)
    if (projectIndex === -1) return

    projects.value.splice(projectIndex, 1)
    toast.success('Project deleted successfully')
    router.push({ name: 'today' })
  }

  return {
    projects,
    getProjectById,
    getProjectName,
    addProject,
    destroyProject,
  }
})
