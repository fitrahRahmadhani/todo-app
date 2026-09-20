<script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import TaskLists from '@/components/task/TaskLists.vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <DefaultLayout titlePage="All Tasks" subtitlePage="Every task you have, all in one place">
    <TaskLists :tasks="taskStore.tasks" />
  </DefaultLayout>
</template>
