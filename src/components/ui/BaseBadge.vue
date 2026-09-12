<template>
  <div class="uppercase text-xs font-medium px-2 py-1 rounded-lg" :class="statusClasses">
    <p>{{ status }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['high', 'medium', 'low'].includes(value),
  },
})

const statusStyle = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-yellow-100 text-yellow-600',
  low: 'bg-blue-100 text-blue-600',
}

const statusClasses = computed(() => statusStyle[props.status])
</script>
