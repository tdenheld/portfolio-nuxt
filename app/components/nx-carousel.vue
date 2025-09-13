<script setup lang="ts">
import type { CarouselEntry } from '~/interfaces';

const props = defineProps<{
  data: CarouselEntry[];
}>();

const el = ref<HTMLElement | null>(null);
const index = ref(0);

// Create a new array with the last item at the start and the first item at the end
const carouselData: CarouselEntry[] = [...props.data];
</script>

<template>
  <div
    ref="el"
    data-scroller-carousel
    class="fixed inset-0 p-contain overflow-y-scroll overflow-x-hidden snap-y snap-mandatory no-scrollbar"
  >
    <div v-for="(entry, i) in carouselData" class="lg:main-grid h-full snap-center">
      <div class="col-start-2 h-full grid items-center">
        <nx-hero :data="entry"></nx-hero>
      </div>
    </div>

    <!-- Index counter -->
    <div class="fixed bottom-contain right-contain text-fg-primary text-xs font-mono">
      {{ index }} / {{ data.length - 1 }}
    </div>
  </div>
</template>
