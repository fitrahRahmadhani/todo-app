<script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import PriorityDropdown from '@/components/ui/PriorityDropdown.vue'
import TaskLists from '@/components/ui/TaskLists.vue'
import { useTaskStore } from '@/stores/taskStore'
import { formatDateTime } from '@/utils/formatDate'
import { Calendar, Plus } from '@lucide/vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'

const taskStore = useTaskStore()
const newTaskTitle = ref()
const newTaskDate = ref()
const newTaskPriority = ref()

function handleAddNewTask() {
  const title = newTaskTitle.value.trim()
  if (!title) return

  taskStore.addTask({
    title,
    dueDate: newTaskDate.value,
    priority: newTaskPriority.value,
  })

  newTaskTitle.value = ''
  newTaskDate.value = ''
  newTaskPriority.value = ''
}
</script>

<template>
  <DefaultLayout>
    <div class="flex h-full min-h-0 overflow-y-scroll">
      <div class="flex-1 py-8 pr-8">
        <div class="space-y-2 mb-8">
          <div>
            <h6 class="font-semibold text-2xl">Today's Focus</h6>
            <p class="text-sm text-gray-500">
              Plan your day, accomplish your priorities. You have 3 tasks pending.
            </p>
          </div>

          <div
            class="flex items-center gap-3 bg-white p-2 pl-6 mt-4 rounded-xl border border-gray-200 shadow-sm transition-shadow focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
          >
            <label for="addToDo" class="flex-1">
              <span class="sr-only">Tambah tugas baru</span>
              <input
                type="text"
                name="addToDo"
                id="addToDo"
                v-model="newTaskTitle"
                class="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 active:bg-none"
                placeholder="Add a new task... Press Enter to create"
              />
            </label>

            <div class="flex items-center gap-2 shrink-0">
              <PriorityDropdown v-model="newTaskPriority" />
              <VueDatePicker v-model="newTaskDate" :enable-time-picker="false">
                <template #trigger>
                  <button
                    type="button"
                    class="flex items-center gap-2 text-sm text-gray-600 px-3 py-2 rounded-lg border border-gray-200 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-300"
                  >
                    <span class="p-px"><Calendar :size="18" /></span>
                    {{ newTaskDate ? formatDateTime(newTaskDate) : '' }}
                  </button>
                </template>
              </VueDatePicker>

              <button
                type="button"
                class="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg bg-blue-500 text-white shrink-0 hover:bg-blue-600 active:bg-blue-700 transition-colors"
                @click="handleAddNewTask"
              >
                <Plus :size="16" />
                Add Task
              </button>
            </div>
          </div>
        </div>
        <TaskLists />
      </div>
    </div>
  </DefaultLayout>
</template>
