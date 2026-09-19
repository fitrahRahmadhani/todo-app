<script setup>
import { useTaskStore } from '@/stores/taskStore.js'
import { useSidebarStore } from '@/stores/sidebarStore'
import BaseLogo from '../ui/BaseLogo.vue'
import { computed } from 'vue'
import { Menu } from '@lucide/vue'

const taskStore = useTaskStore()
const sidebarStore = useSidebarStore()
const progressPercentage = computed(() => {
  if (!taskStore.totalTaskToday) return 0
  return (taskStore.totalCompletedTaskToday / taskStore.totalTaskToday) * 100
})
</script>

<template>
  <header
    class="flex w-full bg-white shrink-0 justify-between items-center gap-3 md:gap-6 h-16 px-4 md:px-6 border-b border-gray-200"
  >
    <div class="flex items-center gap-2 md:gap-3 min-w-0 shrink-0">
      <button
        type="button"
        class="md:hidden text-gray-500 p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
        @click="sidebarStore.toggle()"
        aria-label="Toggle menu"
      >
        <Menu :size="20" />
      </button>
      <BaseLogo />
    </div>

    <label
      for="searchToDo"
      class="flex-1 min-w-0 max-w-125 flex items-center gap-4 border border-gray-200 rounded-xl p-3 h-fit bg-gray-50 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-gray-400 shrink-0"
        aria-hidden="true"
      >
        <path d="m21 21-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </svg>
      <input
        type="text"
        name="searchToDo"
        id="searchToDo"
        class="w-full text-gray-800 text-sm outline-none"
        placeholder="Search your workspace... (⌘K)"
      />
    </label>

    <div class="hidden md:flex items-center gap-4 shrink-0">
      <div class="flex items-center gap-2">
        <p class="text-sm text-gray-800 whitespace-nowrap" v-if="taskStore.totalTaskToday">
          Today's Progress: <span>{{ taskStore.totalCompletedTaskToday }}</span> /
          <span>{{ taskStore.totalTaskToday }}</span> Done
        </p>
        <p class="text-sm text-gray-500 whitespace-nowrap" v-else>No tasks for today yet</p>
        <div
          class="w-20 h-2 overflow-hidden bg-gray-200 rounded-4xl"
          v-if="taskStore.totalTaskToday"
        >
          <div
            class="h-2 bg-blue-500 rounded-4xl transition-all duration-300"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>
    </div>
  </header>
</template>
