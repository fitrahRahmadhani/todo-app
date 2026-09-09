<script setup>
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { Calendar, Pen, Trash } from '@lucide/vue'
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white py-4 px-4 sm:px-6 border border-gray-200 rounded-xl"
  >
    <div class="flex items-start sm:items-center gap-4 min-w-0">
      <input
        type="checkbox"
        name=""
        id=""
        class="form-checkbox w-5 h-5 shrink-0 mt-1 sm:mt-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
      />
      <div class="min-w-0">
        <p class="text-sm font-medium line-clamp-1 sm:truncate">
          Review Q3 strategy proposal and prepare alignmeny presentation
        </p>
        <div class="flex flex-wrap gap-1 items-center text-xs text-gray-500 mt-1">
          <Calendar :size="12" class="shrink-0" />
          <p>Today, 4.00 PM</p>
          <span class="mx-1 hidden sm:inline">•</span>
          <p class="text-gray-400">Personal Space</p>
        </div>
      </div>
    </div>

    <div class="flex gap-4 items-center justify-between sm:justify-end shrink-0 pl-9 sm:pl-0">
      <BaseBadge status="high" />
      <div class="flex gap-3">
        <button class="text-gray-500">
          <Pen :size="18" />
        </button>
        <button class="text-gray-500">
          <Trash :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>
