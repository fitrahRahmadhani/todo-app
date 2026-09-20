<script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import TaskLists from '@/components/task/TaskLists.vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <DefaultLayout titlePage="Completed Tasks" subtitlePage="	Look back at everything you've finished">
    <TaskLists :tasks="taskStore.tasksCompleted" />
  </DefaultLayout>
</template>
