import { taskService } from '@/services/taskService'
import { isToday } from '@/utils/formatDate'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref(taskService.getAll())

  const pendingTaskToday = computed(() => {
    return tasks.value.filter((t) => !t.completed && isToday(t.createdAt))
  })

  const completedTaskToday = computed(() => {
    return tasks.value.filter((t) => t.completed && isToday(t.createdAt))
  })

  const audio = new Audio('/sounds/success-confirmation.mp3')

  watch(
    tasks,
    (newTasks) => {
      taskService.saveAll(newTasks)
    },
    { deep: true },
  )

  function toggleTask(taskId) {
    const task = tasks.value.find((t) => t.id === taskId)
    if (!task) return

    task.completed = !task.completed

    if (task.completed) {
      audio.pause()
      audio.currentTime = 0
      audio.play()
    }
  }

  function toggleSubtask(taskId, subtaskId) {
    const task = tasks.value.find((t) => t.id === taskId)
    const subTask = task?.subtasks.find((s) => s.id === subtaskId)
    if (subTask) subTask.completed = !subTask.completed
  }

  return { tasks, pendingTaskToday, completedTaskToday, toggleTask, toggleSubtask }
})
