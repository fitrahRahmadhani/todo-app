<script setup>
import { Check, ChevronDown, Folder } from '@lucide/vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useProjectStore } from '@/stores/projectStore'

const props = defineProps({
  modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const projectStore = useProjectStore()

const isOpen = ref(false)
const dropdownRef = ref(null)

const selected = computed(() => projectStore.getProjectById(props.modelValue))

function selectProject(project) {
  emit('update:modelValue', project.id)
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
      :aria-label="selected ? undefined : 'Pick a project'"
    >
      <template v-if="selected">
        <span
          class="w-2 h-2 rounded-full shrink-0"
          :style="{ backgroundColor: selected.color }"
        ></span>
        {{ selected.title }}
        <ChevronDown :size="14" class="text-gray-400" />
      </template>

      <Folder v-else :size="16" class="text-gray-600" />
    </button>

    <div
      v-if="isOpen"
      class="absolute z-10 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-1"
    >
      <p v-if="!projectStore.projects.length" class="px-3 py-2 text-sm text-gray-400">
        No projects yet.
      </p>

      <button
        v-for="project in projectStore.projects"
        :key="project.id"
        type="button"
        @click="selectProject(project)"
        class="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span
          class="w-2 h-2 rounded-full shrink-0"
          :style="{ backgroundColor: project.color }"
        ></span>
        <span class="truncate">{{ project.title }}</span>
        <Check v-if="project.id === modelValue" :size="14" class="ml-auto text-blue-500 shrink-0" />
      </button>
    </div>
  </div>
</template>
