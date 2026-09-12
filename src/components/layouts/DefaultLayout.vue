<script setup>
import TheHeader from './TheHeader.vue'
import TheSidabar from './TheSidabar.vue'
import BaseDrawer from '../ui/BaseDrawer.vue'
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <TheHeader class="shrink-0" />

    <div class="flex flex-1">
      <TheSidabar class="shrink-0" />

      <main class="flex-1 pl-8 min-h-0">
        <slot></slot>
      </main>

      <BaseDrawer />
    </div>
  </div>
</template>
