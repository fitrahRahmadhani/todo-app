import { taskService } from '@/services/taskService'
import { isToday } from '@/utils/formatDate'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { toast } from 'vue-sonner'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref(taskService.getAll())

  const pendingTaskToday = computed(() => {
    return tasks.value
      .filter((t) => !t.completed && isToday(t.createdAt))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  })

  const completedTaskToday = computed(() => {
    return tasks.value
      .filter((t) => t.completed && isToday(t.createdAt))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
      toast.info('Task completed')
    }
  }

  function toggleSubtask(taskId, subtaskId) {
    const task = tasks.value.find((t) => t.id === taskId)
    const subTask = task?.subtasks.find((s) => s.id === subtaskId)
    if (subTask) subTask.completed = !subTask.completed
  }

  function addTask({ title, dueDate, priority }) {
    const newTask = {
      id: crypto.randomUUID(),
      title: title ?? '',
      completed: false,
      priority: priority ?? 'medium',
      dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(),
      project: '-',
      description: '-',
      createdAt: new Date().toISOString(),
      subtasks: [],
    }
    tasks.value.push(newTask)
    toast.success('Subtask created successfully')
  }

  function updateTask(taskId, updates) {
    const task = tasks.value.find((t) => t.id === taskId)
    if (!task) return
    Object.assign(task, updates)
    toast.success('Subtask updated successfully')
  }

  function destroyTask(taskId) {
    const taskIndex = tasks.value.findIndex((t) => t.id === taskId)
    if (taskIndex === -1) return

    tasks.value.splice(taskIndex, 1)
    toast.success('Subtask deleted successfully')
  }

  function addSubtask({ taskId, title }) {
    const task = tasks.value.find((t) => t.id === taskId)
    if (!task) return
    task.subtasks.push({
      id: crypto.randomUUID(),
      title,
      completed: false,
    })
    toast.success('Subtask created successfully')
  }

  return {
    tasks,
    pendingTaskToday,
    completedTaskToday,
    toggleTask,
    toggleSubtask,
    addTask,
    updateTask,
    destroyTask,
    addSubtask,
  }
})
