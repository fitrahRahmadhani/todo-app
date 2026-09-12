import { taskService } from '@/services/taskService'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref(taskService.getAll())

  watch(
    tasks,
    (newTasks) => {
      taskService.saveAll(newTasks)
    },
    { deep: true },
  )

  function toggleTask(taskId) {
    const task = tasks.value.find((t) => t.id === taskId)
    if (task) task.completed = !task.completed
  }

  function toggleSubtask(taskId, subtaskId) {
    const task = tasks.value.find((t) => t.id === taskId)
    const subTask = task?.subtasks.find((s) => s.id === subtaskId)
    if (subTask) subTask.completed = !subTask.completed
  }

  return { tasks, toggleTask, toggleSubtask }
})
