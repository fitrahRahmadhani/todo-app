<script setup>
import { useTaskStore } from '@/stores/taskStore.js'
import BaseModal from '../ui/BaseModal.vue'
import { useConfirmDeleteStore } from '@/stores/confirmDeleteStore.js'

const taskStore = useTaskStore()
const confirmDeleteStore = useConfirmDeleteStore()

function confirmDelete(taskId) {
  taskStore.destroyTask(taskId)
  confirmDeleteStore.closeModal()
}
</script>

<template>
  <BaseModal
    title="Delete this item?"
    :is-open="confirmDeleteStore.isOpen"
    @close="confirmDeleteStore.closeModal"
  >
    <p class="text-gray-600">
      Are you sure you’d like to remove
      <span class="font-semibold">{{ confirmDeleteStore.targetTask.title }}</span
      >? Once deleted, it can’t be restored.
    </p>
    <div class="w-full flex mt-10 gap-4 items-center justify-end">
      <button
        @click="confirmDeleteStore.closeModal"
        class="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
      >
        Cancel
      </button>
      <button
        @click="confirmDelete(confirmDeleteStore.targetTask.id)"
        class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
    </div>
  </BaseModal>
</template>
