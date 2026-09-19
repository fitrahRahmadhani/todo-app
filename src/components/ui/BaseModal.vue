<script setup>
import { X } from '@lucide/vue'

const props = defineProps({
  title: String,
  isOpen: Boolean,
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div
        v-if="isOpen"
        class="fixed w-full h-full z-50 bg-black/20 backdrop-blur-xs top-0 right-0 flex justify-center items-center p-4"
        @click.self="emit('close')"
      >
        <Transition name="modal-content" appear>
          <div class="max-w-md w-full max-h-[90vh] overflow-y-auto bg-white p-4 rounded-xl">
            <div class="flex justify-between items-center pb-2 border-b border-b-gray-200">
              <p class="font-semibold">{{ title }}</p>
              <button
                @click="emit('close')"
                class="bg-gray-50 text-gray-400 p-1 rounded-lg border border-white hover:bg-gray-50 transition-all duration-300 ease-in-out hover:text-gray-500 hover:border-gray-300"
              >
                <X :size="18" />
              </button>
            </div>
            <div class="mt-4">
              <slot></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.2s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.modal-content-enter-active {
  transition: all 0.2s ease-out;
}
.modal-content-leave-active {
  transition: all 0.15s ease-in;
}
.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
