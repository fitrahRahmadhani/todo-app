<script setup>
import BaseLogo from '../ui/BaseLogo.vue'
</script>

<template>
  <header
    class="flex w-full bg-white shrink-0 justify-between items-center gap-6 h-16 px-6 border-b border-gray-200"
  >
    <BaseLogo />

    <label
      for="searchToDo"
      class="flex-1 max-w-125 flex items-center gap-4 border border-gray-200 rounded-xl p-3 h-fit bg-gray-50 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-gray-400 shrink-0"
        aria-hidden="true"
      >
        <path d="m21 21-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </svg>
      <input
        type="text"
        name="searchToDo"
        id="searchToDo"
        class="w-full text-gray-800 text-sm outline-none"
        placeholder="Search your workspace... (⌘K)"
      />
    </label>

    <div class="flex items-center gap-4 shrink-0">
      <div class="hidden md:flex items-center gap-2 pr-4 border-r border-gray-200">
        <p class="text-sm text-gray-800 whitespace-nowrap">Today's Progress: 3/5 Done</p>
        <div class="w-20 h-2 overflow-hidden bg-gray-200 rounded-4xl">
          <div class="w-12 h-2 bg-blue-500 rounded-4xl"></div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div class="hidden sm:block text-right leading-none">
          <p class="font-bold text-gray-800">Marcus Vance</p>
          <p class="text-gray-500 text-sm">Product Lead</p>
        </div>
        <img
          src="https://i.pravatar.cc/300"
          alt="avatar"
          class="w-10 h-10 rounded-full object-cover shrink-0"
        />
      </div>
    </div>
  </header>
</template>
