<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker'
import BaseModal from '../ui/BaseModal.vue'
import { computed, ref, watch } from 'vue'
import { Calendar, ChevronDown, Clock } from '@lucide/vue'
import { formatDate, formatTimeObject } from '@/utils/formatDate'
import { useTaskStore } from '@/stores/taskStore.js'
import { useModalStore } from '@/stores/modalStore.js'
import { useProjectStore } from '@/stores/projectStore.js'

const taskStore = useTaskStore()
const modalStore = useModalStore()
const projectStore = useProjectStore()
const title = ref()
const description = ref()
const date = ref()
const time = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
})
const priority = ref()
const project = ref()

watch(
  () => modalStore.payload,
  (task) => {
    if (!task) return
    title.value = task.title
    description.value = task.description

    if (task.dueDate) {
      const dueDate = new Date(task.dueDate)
      if (!isNaN(dueDate.getTime())) {
        date.value = dueDate
        time.value = {
          hours: dueDate.getHours(),
          minutes: dueDate.getMinutes(),
        }
      }
    } else {
      date.value = null
    }

    priority.value = task.priority
    project.value = task.project
  },
)

const isSaveDisabled = computed(() => !title.value?.trim())

function handleSave() {
  if (!title.value?.trim()) return

  let dueDate = null
  if (date.value) {
    const combined = new Date(date.value)
    combined.setHours(time.value.hours, time.value.minutes)
    dueDate = combined.toISOString()
  }

  taskStore.updateTask(modalStore.payload?.id, {
    title: title.value,
    description: description.value,
    dueDate,
    priority: priority.value,
    project: project.value,
  })

  modalStore.closeModal()
}
</script>

<template>
  <BaseModal
    title="Edit Task"
    :is-open="modalStore.isModalOpen('editTask')"
    @close="modalStore.closeModal()"
  >
    <div class="space-y-4">
      <label for="title" class="flex flex-col gap-2">
        <p class="font-semibold text-sm">Task title</p>
        <input
          id="title"
          type="text"
          class="p-2 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          v-model="title"
        />
      </label>
      <label for="description" class="flex flex-col gap-2">
        <p class="font-semibold text-sm">Description</p>
        <textarea
          name="description"
          id="description"
          v-model="description"
          class="p-2 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          rows="3"
        ></textarea>
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label class="flex flex-col gap-2">
          <p class="font-semibold text-sm">Due date</p>
          <VueDatePicker v-model="date" :time-config="{ enableTimePicker: false }">
            <template #trigger>
              <div
                class="flex items-center gap-2 text-sm text-gray-600 px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-colors duration-300"
              >
                <span class="p-px"><Calendar :size="18" /></span>
                {{ date ? formatDate(date) : '' }}
              </div>
            </template>
          </VueDatePicker>
        </label>
        <label class="flex flex-col gap-2">
          <p class="font-semibold text-sm">Time</p>
          <VueDatePicker v-model="time" time-picker>
            <template #trigger>
              <div
                class="flex items-center gap-2 text-sm text-gray-600 px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-colors duration-300"
              >
                <span class="p-px"><Clock :size="18" /></span>
                {{ time ? formatTimeObject(time) : '' }}
              </div>
            </template>
          </VueDatePicker>
        </label>
        <label for="project" class="flex flex-col gap-2">
          <p class="font-semibold text-sm">Project</p>
          <div class="relative">
            <select
              name="project"
              id="project"
              v-model="project"
              class="w-full appearance-none p-2 pr-9 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option
                v-for="project in projectStore.projects"
                :key="project.id"
                :value="project.id"
              >
                {{ project.title }}
              </option>
            </select>
            <ChevronDown
              :size="16"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </label>
        <label for="priority" class="flex flex-col gap-2">
          <p class="font-semibold text-sm">Priority</p>
          <div class="relative">
            <select
              name="priority"
              id="priority"
              v-model="priority"
              class="w-full appearance-none p-2 pr-9 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <ChevronDown
              :size="16"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </label>
      </div>
      <div class="w-full flex mt-10 gap-4 items-center justify-end">
        <button
          class="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          @click="modalStore.closeModal()"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
          @click="handleSave"
          :disabled="isSaveDisabled"
        >
          Save changes
        </button>
      </div>
    </div>
  </BaseModal>
</template>
