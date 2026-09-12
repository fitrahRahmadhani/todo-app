import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskDrawerStore = defineStore('taskDrawer', () => {
  const isOpen = ref(false)
  const activeTask = ref(null)

  function openDrawer(task) {
    isOpen.value = true
    activeTask.value = task
  }

  function closeDrawer() {
    isOpen.value = false
    setTimeout(() => {
      activeTask.value = null
    }, 300)
  }

  return { isOpen, activeTask, openDrawer, closeDrawer }
})
