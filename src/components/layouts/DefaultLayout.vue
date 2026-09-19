<script setup>
import TheHeader from './TheHeader.vue'
import TheSidabar from './TheSidabar.vue'
import BaseDrawer from '../ui/BaseDrawer.vue'
import ModalConfirmDelete from '../task/ModalConfirmDelete.vue'
import ModalEditTask from '../task/ModalEditTask.vue'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import ModalCreateSubTask from '../task/ModalCreateSubtask.vue'
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50 overflow-hidden">
    <TheHeader class="shrink-0" />

    <div class="flex flex-1 min-h-0 relative">
      <TheSidabar class="shrink-0" />

      <main class="flex-1 px-4 md:pl-8 pr-0 min-h-0 overflow-x-hidden">
        <slot></slot>
      </main>

      <BaseDrawer />
    </div>
    <ModalConfirmDelete />
    <ModalEditTask />
    <ModalCreateSubTask />
    <Toaster richColors position="top-center" />
  </div>
</template>
