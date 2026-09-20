<script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import TaskLists from '@/components/task/TaskLists.vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <DefaultLayout titlePage="All Task">
    <TaskLists :tasks="taskStore.tasks" />
  </DefaultLayout>
</template>
