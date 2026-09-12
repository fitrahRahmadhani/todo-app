import { taskService } from '@/services/taskService'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTask = defineStore('task', () => {
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
