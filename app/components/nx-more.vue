<script setup>
const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="max-lg:pt-16 lg:py-contain">
    <h2 class="font-display font-semibold text-2xl md:text-3xl">More work</h2>

    <ul class="mt-3 space-y-1">
      <li v-for="entry in projects" :key="entry.path">
        <nuxt-link
          class="text-fg-secondary link text-[10px] md:text-xs uppercase tracking-[0.16em]"
          :key="entry.path"
          :to="entry.path"
        >
          <span>{{ entry.title }}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
