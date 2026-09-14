import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfirmDeleteStore = defineStore('confirm-delete', () => {
  const isOpen = ref()
  const targetTask = ref()

  function openModal(task) {
    targetTask.value = task
    isOpen.value = true
  }

  function closeModal() {
    targetTask.value = ''
    isOpen.value = false
  }

  return { isOpen, targetTask, openModal, closeModal }
})
