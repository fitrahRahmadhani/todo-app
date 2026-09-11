import { taskService } from '@/services/taskService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTask = defineStore('tasks', () => {
  const tasks = ref(taskService.getAll())

  watch(
    tasks,
    (newTasks) => {
      taskService.saveAll(newTasks)
    },
    { deep: true },
  )

  return { tasks }
})
