import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEditTaskStore = defineStore('edit-task-store', () => {
  const isOpen = ref()
  const targetTask = ref()

  function openModal(task) {
    targetTask.value = task
    isOpen.value = true
  }

  function closeModal() {
    isOpen.value = false
    targetTask.value = null
  }

  return { isOpen, targetTask, openModal, closeModal }
})
