<script setup lang="ts">
import { PanelRightClose, PanelRightOpen, PaperBag, Sun } from '@lucide/vue'
import BaseNavLink from '../ui/BaseNavLink.vue'
import { ref } from 'vue'

const isMinimize = ref(false)
</script>

<template>
  <aside
    class="relative pt-16 px-6 h-full border-r border-gray-200 bg-white shrink-0 transition-all duration-300 ease-in-out"
    :class="isMinimize ? 'w-24' : 'w-60'"
  >
    <button
      class="absolute -right-4 top-4 bg-white text-gray-400 p-2 border border-gray-200 rounded-xl hover:text-gray-600 hover:bg-gray-50 transition duration-300"
      @click="isMinimize = !isMinimize"
    >
      <PanelRightOpen :size="18" v-if="!isMinimize" />
      <PanelRightClose :size="18" v-if="isMinimize" />
    </button>
    <nav class="space-y-1">
      <p
        class="uppercase text-xs text-gray-400 font-semibold mb-2"
        :class="isMinimize ? 'invisible' : 'visible'"
      >
        workspace
      </p>
      <BaseNavLink to="/" :is-minimize="isMinimize">
        <template v-slot:icon>
          <Sun :size="18" />
        </template>
        <span v-if="!isMinimize">Today</span>
      </BaseNavLink>
      <BaseNavLink to="/paper" :is-minimize="isMinimize">
        <template v-slot:icon>
          <PaperBag :size="18" />
        </template>
        <span v-if="!isMinimize">Today</span>
      </BaseNavLink>
    </nav>
  </aside>
</template>
