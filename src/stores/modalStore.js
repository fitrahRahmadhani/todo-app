import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const activeModal = ref()
  const payload = ref()

  function openModal(modalName, data = null) {
    activeModal.value = modalName
    payload.value = data
  }

  function closeModal() {
    activeModal.value = null
    payload.value = null
  }

  function isModalOpen(modalName) {
    return activeModal.value === modalName
  }

  return { activeModal, payload, openModal, closeModal, isModalOpen }
})
