import { useModalStore } from '@/stores/modalStore'
import { useTaskDrawerStore } from '@/stores/taskDrawerStore'
import AllTasksView from '@/views/AllTasksView.vue'
import CompletedView from '@/views/CompletedView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import TodayView from '@/views/TodayView.vue'
import UpcomingView from '@/views/UpcomingView.vue'
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
    {
      path: '/upcoming',
      name: 'upcoming',
      component: UpcomingView,
    },
    {
      path: '/completed',
      name: 'completed',
      component: CompletedView,
    },
    {
      path: '/project/:projectId',
      name: 'project',
      component: ProjectsView,
      props: true,
    },
  ],
})

router.afterEach(() => {
  const taskDrawerStore = useTaskDrawerStore()
  const modalStore = useModalStore()

  taskDrawerStore.closeDrawer()
  modalStore.closeModal()
})

export default router
