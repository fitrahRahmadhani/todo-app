<script setup>
import { useTaskStore } from '@/stores/taskStore.js'
import TaskCard from './TaskCard.vue'

const task = useTaskStore()
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-4 mb-6">
      <p class="uppercase text-sm text-gray-500">pending task</p>
      <div class="flex-1 h-px bg-gray-200"></div>
    </div>
    <TaskCard v-for="task in task.tasks" :key="task.id" :task="task" />
  </div>
</template>
