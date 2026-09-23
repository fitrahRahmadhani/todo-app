<script setup>
import { useModalStore } from '@/stores/modalStore.js'
import { useProjectStore } from '@/stores/projectStore'
import BaseModal from '../ui/BaseModal.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker'
import { Palette } from '@lucide/vue'
import '@cyhnkckali/vue3-color-picker/dist/style.css'

const modalStore = useModalStore()
const projectStore = useProjectStore()

const name = ref('')
const color = ref('#3b82f6')
const isPickerOpen = ref(false)
const pickerRef = ref(null)

watch(
  () => modalStore.isModalOpen('createProject'),
  (isOpen) => {
    if (isOpen) {
      name.value = ''
      color.value = '#3b82f6'
      isPickerOpen.value = false
    }
  },
)

function handleSave() {
  const trimmed = name.value.trim()
  if (!trimmed) return

  projectStore.addProject({ name: trimmed, color: color.value })
  modalStore.closeModal()
}

function handleClickOutside(event) {
  if (pickerRef.value && !pickerRef.value.contains(event.target)) {
    isPickerOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <BaseModal
    name="Create Project"
    :is-open="modalStore.isModalOpen('createProject')"
    @close="modalStore.closeModal()"
  >
    <div class="space-y-4">
      <label for="name" class="flex flex-col gap-2">
        <p class="font-semibold text-sm">Project name</p>
        <input
          id="name"
          type="text"
          class="p-2 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          v-model="name"
        />
      </label>

      <div class="flex flex-col gap-2">
        <p class="font-semibold text-sm">Project color</p>

        <div ref="pickerRef" class="w-fit">
          <button
            type="button"
            @click="isPickerOpen = !isPickerOpen"
            class="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <span
              class="w-4 h-4 rounded-full ring-1 ring-black/10 shrink-0"
              :style="{ backgroundColor: color }"
            ></span>
            <Palette :size="14" class="text-gray-400" />
            <span class="uppercase text-xs tracking-wide">{{ color }}</span>
          </button>

          <div v-if="isPickerOpen" class="absolute -top-18 right-4 z-10">
            <Vue3ColorPicker
              v-model="color"
              mode="solid"
              type="HEX"
              :show-color-list="false"
              :show-eye-drop="false"
              :showAlpha="false"
            />
          </div>
        </div>
      </div>

      <div class="w-full flex mt-10 gap-4 items-center justify-end">
        <button
          class="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          @click="modalStore.closeModal()"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="!name.trim()"
          @click="handleSave()"
        >
          Create Project
        </button>
      </div>
    </div>
  </BaseModal>
</template>
