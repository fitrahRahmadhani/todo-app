<script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import TaskLists from '@/components/task/TaskLists.vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <DefaultLayout titlePage="Upcoming Tasks" subtitlePage="Get ahead of what's coming next">
    <TaskLists :tasks="taskStore.tasksUpcoming" />
  </DefaultLayout>
</template>
