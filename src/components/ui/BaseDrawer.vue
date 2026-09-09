<script setup lang="ts">
import { Calendar, CirclePlus, Flag, FlagTriangleRight, Folder, X } from '@lucide/vue'
</script>

<template>
  <div
    class="w-96 flex flex-col space-y-8 p-8 h-full bg-white border-l items-start border-gray-200 shrink-0"
  >
    <div class="w-full flex items-center justify-between">
      <div class="flex items-center gap-2 text-blue-500">
        <Flag :size="18" />
        <p class="uppercase text-sm text-blue-500 font-semibold">active task</p>
      </div>
      <button
        class="bg-gray-100 text-gray-400 p-1 rounded-lg border border-white hover:bg-gray-50 transition-all duration-300 ease-in-out hover:text-gray-500 hover:border-gray-300"
      >
        <X />
      </button>
    </div>
    <p class="text-xl font-medium">
      Review Q3 strategy proposal and prepare alignmeny presentation
    </p>
    <div class="grid grid-cols-2 gap-2 w-full text-sm text-gray-500">
      <div class="flex items-center gap-2">
        <Calendar :size="16" />
        <p>Due Date</p>
      </div>
      <p class="text-right">08 Des 2026</p>
      <div class="flex items-center gap-2">
        <FlagTriangleRight :size="16" />
        <p>Priority</p>
      </div>
      <p class="text-right">High</p>
      <div class="flex items-center gap-2">
        <Folder :size="16" />
        <p>List Project</p>
      </div>
      <p class="text-right">Marketing Q3</p>
    </div>
    <div class="space-y-4">
      <div class="text-sm space-y-2 pt-4 border-t border-gray-200">
        <p class="uppercase font-semibold text-gray-500">description</p>
        <p class="text-gray-800">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur beatae earum
          exercitationem natus in repellat velit reprehenderit reiciendis dolore nostrum?
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
          <label for="check" class="flex items-center gap-2">
            <input
              type="checkbox"
              name="check"
              id="check"
              class="form-checkbox self-start w-4 h-4 shrink-0 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            <p>
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit
            </p>
          </label>
          <label for="check2" class="flex items-center gap-2">
            <input
              type="checkbox"
              name="check2"
              id="check2"
              class="form-checkbox self-start w-4 h-4 shrink-0 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque porro nemo
              inventore tempora fugit?
            </p>
          </label>
          <label for="check3" class="flex items-center gap-2">
            <input
              type="checkbox"
              name="check3"
              id="check3"
              class="form-checkbox self-start w-4 h-4 shrink-0 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque porro nemo
              inventore tempora fugit?
            </p>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
