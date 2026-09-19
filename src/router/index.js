import AllTasksView from '@/views/AllTasksView.vue'
import TodayView from '@/views/TodayView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'today',
      component: TodayView,
    },
    {
      path: '/all-tasks',
      name: 'all-tasks',
      component: AllTasksView,
    },
  ],
})

export default router
