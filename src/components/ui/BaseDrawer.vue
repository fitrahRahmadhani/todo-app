<script setup>
import { useTaskDrawer } from '@/stores/taskDrawer'
import { Calendar, CirclePlus, Flag, FlagTriangleRight, Folder, X } from '@lucide/vue'

const taskDrawer = useTaskDrawer()
</script>

<template>
  <div
    class="overflow-hidden shrink-0 transition-[width] duration-300 ease-in-out"
    :class="taskDrawer.isOpen ? 'w-96' : 'w-0'"
  >
    <div
      class="w-96 h-full flex flex-col space-y-8 p-8 overflow-y-scroll bg-white border-l border-gray-200 items-start transition-opacity duration-200 ease-out"
      :class="taskDrawer.isOpen ? 'opacity-100 delay-150' : 'opacity-0 delay-0'"
    >
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center gap-2 text-blue-500">
          <Flag :size="18" />
          <p class="uppercase text-sm text-blue-500 font-semibold">active task</p>
        </div>
        <button
          @click="taskDrawer.closeDrawer"
          class="bg-gray-100 text-gray-400 p-1 rounded-lg border border-white hover:bg-gray-50 transition-all duration-300 ease-in-out hover:text-gray-500 hover:border-gray-300"
        >
          <X />
        </button>
      </div>
      <p class="text-xl font-medium">
        {{ taskDrawer.activeTask?.title }}
      </p>
      <div class="grid grid-cols-2 gap-2 w-full text-sm text-gray-500">
        <div class="flex items-center gap-2">
          <Calendar :size="16" />
          <p>Due Date</p>
        </div>
        <p class="text-right">{{ taskDrawer.activeTask?.dueDate }}</p>
        <div class="flex items-center gap-2">
          <FlagTriangleRight :size="16" />
          <p>Priority</p>
        </div>
        <p class="text-right">{{ taskDrawer.activeTask?.priority }}</p>
        <div class="flex items-center gap-2">
          <Folder :size="16" />
          <p>List Project</p>
        </div>
        <p class="text-right">{{ taskDrawer.activeTask?.project }}</p>
      </div>
      <div class="space-y-4">
        <div class="text-sm space-y-2 pt-4 border-t border-gray-200">
          <p class="uppercase font-semibold text-gray-500">description</p>
          <p class="text-gray-800">
            {{ taskDrawer.activeTask?.description }}
          </p>
        </div>
        <div class="text-sm space-y-2 pt-4 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <p class="uppercase font-semibold text-gray-500">subtasks (1/3)</p>
            <button
              class="bg-gray-100 text-gray-500 p-1 rounded-full border border-white hover:bg-gray-50 transition-all duration-300 ease-in-out hover:text-gray-500 hover:border-gray-300"
            >
              <CirclePlus :size="14" />
            </button>
          </div>
          <div class="space-y-3 text-gray-800">
            <label
              class="flex items-center gap-2"
              v-for="subtask in taskDrawer.activeTask?.subtasks"
              :key="subtask.id"
              :for="subtask.id"
            >
              <input
                type="checkbox"
                :id="subtask.id"
                :checked="subtask.completed"
                class="form-checkbox self-start w-4 h-4 shrink-0 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <p>
                {{ subtask.title }}
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
