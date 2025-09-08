<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <p
      v-if="props.data.meta.name || props.data.meta.period"
      class="font-serif text-xl md:text-[28px] text-fg-secondary"
    >
      {{ props.data.meta.name || props.data.meta.period }}
    </p>

    <h1
      class="mt-1 font-semibold text-[calc(24px+4.5vw)] leading-[1.1] font-display max-w-[18ch]"
    >
      {{ props.data.title }}
    </h1>

    <p
      v-if="props.data.description"
      class="mt-5 text-fg-secondary text-lg max-w-[32ch] leading-[1.4]"
    >
      {{ props.data.description }}
    </p>

    <div class="mt-8">
      <nuxt-link :to="props.data.path" class="button">Explore</nuxt-link>
    </div>
  </div>
</template>
