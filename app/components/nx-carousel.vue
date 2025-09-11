<script setup lang="ts">
interface CarouselEntry {
  meta: {
    name?: string;
    period?: string;
    descriptionShort?: string;
  };
  title: string;
  path?: string;
}

const props = defineProps<{
  data: CarouselEntry[];
}>();
</script>

<template>
  <div
    class="absolute pr-contain inset-y-0 overflow-y-scroll overflow-x-hidden snap-y snap-mandatory no-scrollbar"
  >
    <div
      v-for="entry in props.data"
      class="h-full grid items-center snap-center"
    >
      <div>
        <p
          v-if="entry.meta.name || entry.meta.period"
          class="font-serif text-xl md:text-[28px] text-fg-secondary"
        >
          {{ entry.meta.name || entry.meta.period }}
        </p>

        <h1
          class="mt-1 font-semibold text-[calc(24px+4.5vw)] leading-[1.1] font-display max-w-[18ch]"
        >
          {{ entry.title }}
        </h1>

        <p
          v-if="entry.meta.descriptionShort"
          class="mt-5 text-fg-secondary text-lg max-w-[40ch] leading-[1.4]"
        >
          {{ entry.meta.descriptionShort }}
        </p>

        <div class="mt-8" v-if="entry.path">
          <nuxt-link :to="entry.path" class="button">Explore</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
