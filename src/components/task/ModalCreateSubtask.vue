<script setup>
import { useModalStore } from '@/stores/modalStore'
import BaseModal from '../ui/BaseModal.vue'
import { ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore.js'

const modalStore = useModalStore()
const taskStore = useTaskStore()
const title = ref()

function handleSave() {
  taskStore.addSubtask({ taskId: modalStore.payload.id, title: title.value })
  modalStore.closeModal()
}
</script>

<template>
  <BaseModal
    title="Create Subtask"
    :is-open="modalStore.isModalOpen('createSubtask')"
    @close="modalStore.closeModal"
  >
    <label for="title" class="flex flex-col gap-2">
      <p class="font-semibold text-sm">Subtask title</p>
      <input
        id="title"
        type="text"
        class="p-2 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
        v-model="title"
      />
    </label>
    <div class="w-full flex mt-10 gap-4 items-center justify-end">
      <button
        class="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        @click="modalStore.closeModal()"
      >
        Cancel
      </button>
      <button
        class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        @click="handleSave()"
      >
        Create Subtask
      </button>
    </div>
  </BaseModal>
</template>
