import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useTaskStore } from './taskStore'

export const useTaskDrawerStore = defineStore('taskDrawer', () => {
  const taskStore = useTaskStore()
  const isOpen = ref(false)
  const activeTask = ref(null)
  let closeTimeout = null

  function openDrawer(task) {
    clearTimeout(closeTimeout)
    isOpen.value = true
    activeTask.value = task
  }

  function closeDrawer() {
    isOpen.value = false
    closeTimeout = setTimeout(() => {
      activeTask.value = null
    }, 300)
  }

  watch(
    () => taskStore.tasks,
    (tasks) => {
      if (!activeTask.value) return
      const stillExist = tasks.some((t) => t.id === activeTask.value.id)
      if (!stillExist) closeDrawer()
    },
    { deep: true },
  )

  return { isOpen, activeTask, openDrawer, closeDrawer }
})
