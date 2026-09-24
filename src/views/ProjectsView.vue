<script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import TaskLists from '@/components/task/TaskLists.vue'
import { useProjectStore } from '@/stores/projectStore'
import { useTaskStore } from '@/stores/taskStore'
import { computed } from 'vue'

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
})

const projectStore = useProjectStore()
const taskStore = useTaskStore()

const tasks = computed(() => {
  return taskStore.getTasksByProjectId(props.projectId)
})
const project = computed(() => projectStore.getProjectById(props.projectId))

const pageTitle = computed(() => project.value?.name ?? 'Project not found')
const pageSubtitle = computed(() =>
  project.value ? `${tasks.value.length} task in this project.` : '',
)
</script>

<template>
  <DefaultLayout :title-page="pageTitle" :subtitle-page="pageSubtitle">
    <TaskLists :tasks="tasks" />
  </DefaultLayout>
</template>
