import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const activeModal = ref()
  const payload = ref()
  const target = ref()

  function openModal(modalName, data = null, pointer = 'task') {
    activeModal.value = modalName
    payload.value = data
    target.value = pointer
  }

  function closeModal() {
    activeModal.value = null
    payload.value = null
    target.value = null
  }

  function isModalOpen(modalName) {
    return activeModal.value === modalName
  }

  return { activeModal, payload, target, openModal, closeModal, isModalOpen }
})
