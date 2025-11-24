<script setup>
const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="max-lg:pt-24 max-lg:pb-2 lg:py-contain">
    <h2 class="font-display font-semibold text-2xl md:text-3xl">More work</h2>

    <ul class="mt-3 md:mt-6 grid grid-cols-2 gap-4 md:gap-8">
      <li v-for="entry in projects" :key="entry.path">
        <nuxt-link :key="entry.path" :to="entry.path" class="cursor-pointer touch-manipulation">
          <div class="bg-fg-primary rounded-lg md:rounded-2xl overflow-hidden">
            <nx-image
              :src="entry.meta.image"
              class="grayscale-100 mix-blend-screen"
            ></nx-image>
          </div>
          <h3
            class="mt-1.5 text-[10px] md:text-xs tracking-widest uppercase font-mono text-fg-secondary"
          >
            {{ entry.title }}
          </h3>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
