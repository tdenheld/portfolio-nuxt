<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="pt-24 pb-2 lg:pt-contain lg:pb-32">
    <nuxt-link :to="project.path" class="cursor-pointer touch-manipulation">
      <h2
        class="font-display font-[150] hover:font-[700] transition-all duration-600 text-[calc(2rem+12vw)] leading-[0.8]"
      >
        Next
      </h2>
      <p class="font-serif md:text-2xl md:-mt-4 text-fg-secondary">
        {{ project.title }}
      </p>
    </nuxt-link>
  </div>
</template>
