<script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import TaskLists from '@/components/task/TaskLists.vue'
import { useTaskStore } from '@/stores/taskStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const taskStore = useTaskStore()
const route = useRoute()

const searchQuery = computed(() => {
  return String(route.query.q ?? '')
    .trim()
    .toLowerCase()
})

const filteredTasks = computed(() => {
  if (!searchQuery.value) return taskStore.tasks
  return taskStore.tasks.filter((t) => t.title.toLowerCase().includes(searchQuery.value))
})

const pageTitle = computed(() => {
  return searchQuery.value ? `Search results for "${route.query.q}"` : 'All Tasks'
})

const pageSubtitle = computed(() =>
  searchQuery.value
    ? `${filteredTasks.value.length} task found.`
    : 'Every task you have, all in one place.',
)
</script>

<template>
  <DefaultLayout :title-page="pageTitle" :subtitle-page="pageSubtitle">
    <TaskLists :tasks="filteredTasks" />
  </DefaultLayout>
</template>
