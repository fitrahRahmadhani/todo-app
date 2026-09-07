<script setup lang="ts">
import { PaperBag, Sun } from '@lucide/vue'
import BaseNavLink from '../ui/BaseNavLink.vue'
</script>

<template>
  <aside class="w-60 pt-8 px-6 h-screen border-r border-gray-200 bg-white">
    <nav class="space-y-1">
      <p class="uppercase text-xs text-gray-400 font-semibold mb-2">workspace</p>
      <BaseNavLink to="/">
        <template v-slot:icon>
          <Sun :size="16" />
        </template>
        Today
      </BaseNavLink>
      <BaseNavLink to="/paper">
        <template v-slot:icon>
          <PaperBag :size="16" />
        </template>
        Today
      </BaseNavLink>
    </nav>
  </aside>
</template>
