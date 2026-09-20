<script setup>
import TaskCard from './TaskCard.vue'
import { computed } from 'vue'
import { ClipboardList } from '@lucide/vue'

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
})

const pendingTasks = computed(() => props.tasks.filter((t) => !t.completed))
const completedTasks = computed(() => props.tasks.filter((t) => t.completed))
const isEmpty = computed(() => pendingTasks.value.length === 0 && completedTasks.value.length === 0)
</script>

<template>
  <div class="space-y-4 pb-8">
    <div v-if="pendingTasks.length > 0" class="flex items-center gap-4 my-6">
      <p class="uppercase text-sm text-gray-500">pending task</p>
      <div class="flex-1 h-px bg-gray-200"></div>
    </div>
    <TaskCard v-for="task in pendingTasks" :key="task.id" :task="task" />

    <div v-if="completedTasks.length > 0" class="flex items-center gap-4 my-6">
      <p class="uppercase text-sm text-gray-500">completed task</p>
      <div class="flex-1 h-px bg-gray-200"></div>
    </div>
    <TaskCard v-for="task in completedTasks" :key="task.id" :task="task" />

    <div v-if="isEmpty" class="flex flex-col items-center justify-center text-center py-16">
      <div class="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mb-4">
        <ClipboardList :size="24" class="text-gray-400" />
      </div>
      <p class="text-sm font-medium text-gray-600">No tasks here yet</p>
      <p class="text-sm text-gray-400 mt-1">Add a new task above to get started.</p>
    </div>
  </div>
</template>
