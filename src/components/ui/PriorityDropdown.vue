<script setup>
import { Check, ChevronDown, Flag } from '@lucide/vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: 'medium' },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdownRef = ref(null)

const priorities = [
  { value: 'low', label: 'Low', color: 'bg-blue-400' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'high', label: 'High', color: 'bg-red-500' },
]

const selected = computed(
  () => priorities.find((p) => p.value === props.modelValue) ?? priorities[1],
)

function selectPriority(priority) {
  emit('update:modelValue', priority.value)
  isOpen.value = false
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 text-sm text-gray-600 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
    >
      <Flag :size="16" class="text-gray-600" />
      {{ selected.label }}
      <ChevronDown :size="14" class="text-gray-400" />
    </button>

    <div
      v-if="isOpen"
      class="absolute z-10 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-lg py-1"
    >
      <button
        v-for="priority in priorities"
        :key="priority.value"
        type="button"
        @click="selectPriority(priority)"
        class="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span class="w-2 h-2 rounded-full shrink-0" :class="priority.color"></span>
        {{ priority.label }}
        <Check v-if="priority.value === modelValue" :size="14" class="ml-auto text-blue-500" />
      </button>
    </div>
  </div>
</template>
