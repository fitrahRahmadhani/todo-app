<script setup>
import TaskCard from './TaskCard.vue'
import { computed } from 'vue'

const props = defineProps({
  tasks: { Type: Object },
})

const pendingTasks = computed(() => {
  return props.tasks?.filter((t) => !t.completed)
})

const completedTasks = computed(() => {
  return props.tasks?.filter((t) => t.completed)
})
</script>

<template>
  <div class="space-y-4 pb-8">
    <div class="flex items-center gap-4 my-6">
      <p class="uppercase text-sm text-gray-500">pending task</p>
      <div class="flex-1 h-px bg-gray-200"></div>
    </div>
    <TaskCard v-for="task in pendingTasks" :key="task.id" :task="task" />

    <div class="flex items-center gap-4 my-6">
      <p class="uppercase text-sm text-gray-500">completed task</p>
      <div class="flex-1 h-px bg-gray-200"></div>
    </div>
    <TaskCard v-for="task in completedTasks" :key="task.id" :task="task" />
  </div>
</template>
