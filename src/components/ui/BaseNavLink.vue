<template>
  <div class="relative group">
    <router-link
      :to="to"
      class="relative flex justify-between items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
      active-class="bg-blue-50 !text-blue-800 hover:!bg-blue-50 hover:!text-blue-600"
    >
      <div class="flex items-center gap-2">
        <span class="shrink-0">
          <slot name="icon"></slot>
        </span>
        <span class="truncate">
          <slot></slot>
        </span>
      </div>
      <div
        class="flex justify-center items-center rounded-md bg-gray-50 w-5 h-5 text-xs"
        v-if="!isMinimize && pending"
      >
        <p>{{ pending }}</p>
      </div>
    </router-link>

    <div v-if="$slots.action && !isMinimize" class="absolute right-2 top-1/2 -translate-y-1/2">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  isMinimize: {
    type: Boolean,
    required: true,
  },
  pending: {
    type: Number,
  },
})
</script>
