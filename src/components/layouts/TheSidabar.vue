<script setup lang="ts">
import {
  CalendarClock,
  CircleCheckBig,
  Inbox,
  PanelRightClose,
  PanelRightOpen,
  Sun,
  X,
} from '@lucide/vue'
import BaseNavLink from '../ui/BaseNavLink.vue'
import { ref } from 'vue'
import { useSidebarStore } from '@/stores/sidebarStore'

defineOptions({ inheritAttrs: false })

const isMinimize = ref(false)
const sidebarStore = useSidebarStore()

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
      isMinimize ? 'md:w-24' : 'md:w-60',
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
      @click="isMinimize = !isMinimize"
    >
      <PanelRightOpen :size="18" v-if="!isMinimize" />
      <PanelRightClose :size="18" v-if="isMinimize" />
    </button>
    <nav class="space-y-1" @click="handleNavClick">
      <p
        class="uppercase text-xs text-gray-400 font-semibold mb-2"
        :class="isMinimize ? 'invisible' : 'visible'"
      >
        workspace
      </p>
      <BaseNavLink :to="{ name: 'today' }" :is-minimize="isMinimize">
        <template v-slot:icon>
          <Sun :size="18" />
        </template>
        <span v-if="!isMinimize">Today</span>
      </BaseNavLink>
      <BaseNavLink :to="{ name: 'all-tasks' }" :is-minimize="isMinimize">
        <template v-slot:icon>
          <Inbox :size="18" />
        </template>
        <span v-if="!isMinimize">All Tasks</span>
      </BaseNavLink>
      <BaseNavLink :to="{ name: 'upcoming' }" :is-minimize="isMinimize">
        <template v-slot:icon>
          <CalendarClock :size="18" />
        </template>
        <span v-if="!isMinimize">Upcoming</span>
      </BaseNavLink>
      <BaseNavLink :to="{ name: 'completed' }" :is-minimize="isMinimize">
        <template v-slot:icon>
          <CircleCheckBig :size="18" />
        </template>
        <span v-if="!isMinimize">Upcoming</span>
      </BaseNavLink>
    </nav>
  </aside>
</template>
