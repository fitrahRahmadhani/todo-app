<script setup>
import TheHeader from './TheHeader.vue'
import TheSidabar from './TheSidabar.vue'
import BaseDrawer from '../ui/BaseDrawer.vue'
import ModalConfirmDelete from '../task/ModalConfirmDelete.vue'
import ModalEditTask from '../task/ModalEditTask.vue'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50 overflow-hidden">
    <TheHeader class="shrink-0" />

    <div class="flex flex-1 min-h-0">
      <TheSidabar class="shrink-0" />

      <main class="flex-1 pl-8 min-h-0">
        <slot></slot>
      </main>

      <BaseDrawer />
    </div>
    <ModalConfirmDelete />
    <ModalEditTask />
    <Toaster richColors position="top-center" />
  </div>
</template>
