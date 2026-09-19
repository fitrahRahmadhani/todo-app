<script setup>
import { useTaskStore } from '@/stores/taskStore.js'
import TaskCard from './TaskCard.vue'

const taskStore = useTaskStore()
</script>

<template>
  <div class="space-y-4 pb-8">
    <div class="flex items-center gap-4 my-6">
      <p class="uppercase text-sm text-gray-500">pending task</p>
      <div class="flex-1 h-px bg-gray-200"></div>
    </div>
    <TaskCard v-for="task in taskStore.pendingTaskToday" :key="task.id" :task="task" />

    <div class="flex items-center gap-4 my-6">
      <p class="uppercase text-sm text-gray-500">completed task</p>
      <div class="flex-1 h-px bg-gray-200"></div>
    </div>
    <TaskCard v-for="task in taskStore.completedTaskToday" :key="task.id" :task="task" />
  </div>
</template>
