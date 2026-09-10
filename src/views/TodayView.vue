<script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import BaseDrawer from '@/components/ui/BaseDrawer.vue'
import TaskLists from '@/components/ui/TaskLists.vue'
import { useTaskDrawer } from '@/stores/taskDrawer'
import { Plus } from '@lucide/vue'

const taskDrawer = useTaskDrawer()
</script>

<template>
  <DefaultLayout>
    <div class="flex h-full min-h-0 overflow-y-scroll">
      <div class="flex-1 pt-8 pr-8">
        <div class="space-y-2 mb-8">
          <div>
            <h6 class="font-semibold text-2xl">Today's Focus</h6>
            <p class="text-sm text-gray-500">
              Plan your day, accomplish your priorities. You have 3 tasks pending.
            </p>
          </div>

          <div
            class="flex items-center gap-3 bg-white p-2 pl-6 mt-4 rounded-xl border border-gray-200 shadow-sm transition-shadow focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
          >
            <label for="addToDo" class="flex-1">
              <span class="sr-only">Tambah tugas baru</span>
              <input
                type="text"
                name="addToDo"
                id="addToDo"
                class="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                placeholder="Add a new task... Press Enter to create"
              />
            </label>

            <button
              type="button"
              class="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg bg-blue-500 text-white shrink-0 hover:bg-blue-600 active:bg-blue-700 transition-colors"
            >
              <Plus :size="16" />
              Add Task
            </button>
          </div>
        </div>
        <TaskLists />
      </div>
      <div
        class="shrink-0 overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        :class="taskDrawer.isOpen ? 'w-96' : 'w-0'"
      >
        <BaseDrawer />
      </div>
    </div>
  </DefaultLayout>
</template>
