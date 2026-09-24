<script setup>
import {
  CalendarClock,
  CircleCheckBig,
  Folder,
  Inbox,
  PanelRightClose,
  PanelRightOpen,
  Plus,
  Sun,
  X,
} from '@lucide/vue'
import BaseNavLink from '../ui/BaseNavLink.vue'
import { useSidebarStore } from '@/stores/sidebarStore'
import { useTaskStore } from '@/stores/taskStore.js'
import { computed } from 'vue'
import { useProjectStore } from '@/stores/projectStore.js'
import { useModalStore } from '@/stores/modalStore.js'

defineOptions({ inheritAttrs: false })

const sidebarStore = useSidebarStore()
const taskStore = useTaskStore()
const projectStore = useProjectStore()
const modalStore = useModalStore()

const totalTaskPendingToday = computed(() => {
  return taskStore.tasksToday.filter((t) => !t.completed).length
})

const totalTaskPending = computed(() => {
  return taskStore.tasks.filter((t) => !t.completed).length
})

const totalTaskPendingUpcoming = computed(() => {
  return taskStore.tasksUpcoming.filter((t) => !t.completed).length
})

function handleNavClick() {
  sidebarStore.close()
}
</script>

<template>
  <!-- Backdrop, mobile only -->
  <div
    v-if="sidebarStore.isOpen"
    class="fixed inset-0 bg-black/30 z-30 md:hidden"
    @click="sidebarStore.close()"
  ></div>

  <aside
    v-bind="$attrs"
    class="fixed md:static top-0 left-0 md:inset-auto z-40 md:z-auto pt-16 px-6 h-full border-r border-gray-200 bg-white shrink-0 transition-transform md:transition-[width] duration-300 ease-in-out"
    :class="[
      sidebarStore.isMinimize ? 'md:w-24' : 'md:w-60',
      'w-64',
      sidebarStore.isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
    ]"
  >
    <!-- Close button, mobile only -->
    <button
      class="md:hidden absolute right-4 top-4 bg-white text-gray-400 p-2 border border-gray-200 rounded-xl hover:text-gray-600 hover:bg-gray-50 transition duration-300"
      @click="sidebarStore.close()"
      aria-label="Close menu"
    >
      <X :size="18" />
    </button>

    <!-- Minimize toggle, desktop only -->
    <button
      class="hidden md:block absolute -right-4 top-4 bg-white text-gray-400 p-2 border border-gray-200 rounded-xl hover:text-gray-600 hover:bg-gray-50 transition duration-300"
      @click="sidebarStore.isMinimize = !sidebarStore.isMinimize"
    >
      <PanelRightOpen :size="18" v-if="!sidebarStore.isMinimize" />
      <PanelRightClose :size="18" v-if="sidebarStore.isMinimize" />
    </button>
    <nav class="space-y-1" @click="handleNavClick">
      <p
        class="uppercase text-xs text-gray-400 font-semibold mb-2"
        :class="sidebarStore.isMinimize ? 'invisible' : 'visible'"
      >
        workspace
      </p>
      <BaseNavLink
        :to="{ name: 'today' }"
        :is-minimize="sidebarStore.isMinimize"
        :pending="totalTaskPendingToday"
      >
        <template v-slot:icon>
          <Sun :size="18" />
        </template>
        <span v-if="!sidebarStore.isMinimize">Today</span>
      </BaseNavLink>
      <BaseNavLink
        :to="{ name: 'all-tasks' }"
        :is-minimize="sidebarStore.isMinimize"
        :pending="totalTaskPending"
      >
        <template v-slot:icon>
          <Inbox :size="18" />
        </template>
        <span v-if="!sidebarStore.isMinimize">All Tasks</span>
      </BaseNavLink>
      <BaseNavLink
        :to="{ name: 'upcoming' }"
        :is-minimize="sidebarStore.isMinimize"
        :pending="totalTaskPendingUpcoming"
      >
        <template v-slot:icon>
          <CalendarClock :size="18" />
        </template>
        <span v-if="!sidebarStore.isMinimize">Upcoming</span>
      </BaseNavLink>
      <BaseNavLink :to="{ name: 'completed' }" :is-minimize="sidebarStore.isMinimize">
        <template v-slot:icon>
          <CircleCheckBig :size="18" />
        </template>
        <span v-if="!sidebarStore.isMinimize">Completed</span>
      </BaseNavLink>
      <p
        class="uppercase text-xs text-gray-400 font-semibold mt-6 mb-2"
        :class="sidebarStore.isMinimize ? 'invisible' : 'visible'"
      >
        projects
      </p>
      <BaseNavLink
        v-for="project in projectStore.projects"
        :key="project.id"
        :to="{ name: 'project', params: { projectId: project.id } }"
        :is-minimize="sidebarStore.isMinimize"
      >
        <template v-slot:icon>
          <Folder :size="18" :style="{ color: project.color }" />
        </template>
        <span v-if="!sidebarStore.isMinimize">{{ projectStore.getProjectName(project.id) }}</span>
        <template v-slot:action>
          <button
            class="text-gray-400 transition duration-300 cursor-pointer p-1 rounded-xl hover:text-red-500 hover:bg-red-50"
            @click.prevent.stop="modalStore.openModal('confirmDelete', project, 'project')"
          >
            <X :size="12" />
          </button>
        </template>
      </BaseNavLink>
      <button
        type="button"
        class="w-full flex items-center justify-center p-2 border border-dashed border-gray-400 text-gray-400 rounded-lg mt-2 hover:bg-gray-50 hover:border-gray-500 hover:border-solid hover:text-gray-600 transition duration-300 ease-in-out"
        @click.stop="modalStore.openModal('createProject')"
      >
        <Plus :size="18" />
      </button>
    </nav>
  </aside>
</template>
