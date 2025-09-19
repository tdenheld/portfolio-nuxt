<script setup lang="ts">
import type { Project } from '~/interfaces';

const props = defineProps<{
  data: Project[];
}>();

const nuxtApp: any = useNuxtApp();

const element = ref<HTMLElement | null>(null);
const index = ref(0);

// Create a new array with multiple copies of the data to allow infinite scrolling
const carouselData = ref<Project[]>([...Array(2).fill(props.data).flat()]);

// Calculate the actual height of one item in the carousel
const getActualItemHeight = () => {
  return element.value ? element.value.scrollHeight / carouselData.value.length : 0;
};

// Get the currently active entry based on the index
const getActiveEntry = () => {
  if (!props.data) return;
  return props.data[index.value];
};

// Set CSS variables for colors based on the active entry
const setColor = () => {
  const entry = getActiveEntry();
  if (!entry) return;
  nuxtApp.$setColor(entry.meta?.color);
};

const getAllImages = () => {
  // Return an array of all images from the data array
  return props.data
    .map((entry) => entry.meta?.image)
    .filter((img): img is string => !!img);
};

// Handle scroll events to update index and colors
const handleScroll = () => {
  requestAnimationFrame(() => {
    if (!element.value) return;

    // Calculate current index based on scroll position
    const scrollTop = element.value.scrollTop;
    const itemHeight = getActualItemHeight();
    const currentIndex = Math.round(scrollTop / itemHeight);

    //  Update index
    if (currentIndex >= 0 && currentIndex < carouselData.value.length) {
      const dataIndex = currentIndex % props.data.length;
      index.value = dataIndex;
    }

    // Set colors based on current active item
    setColor();

    // When reaching cloned items add another array to the carousel
    if (currentIndex >= carouselData.value.length - props.data.length) {
      carouselData.value = [...carouselData.value, ...props.data];
    }
  });
};

onMounted(() => {
  setColor();
  element.value?.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  element.value?.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div ref="element" data-scroller-carousel class="s-carousel no-scrollbar">
    <div
      v-for="(entry, i) in carouselData"
      :key="i"
      class="lg:main-grid h-full snap-center"
    >
      <div class="col-start-2 h-full grid items-center">
        <div>
          <nx-hero :data="entry" :heading-level="index === 0 ? 'h1' : 'h2'"></nx-hero>
        </div>
      </div>
    </div>

    <!-- Index counter -->
    <div class="fixed bottom-contain right-contain">
      <p class="text-fg-primary text-xs font-mono text-right">
        {{ index }} / {{ data.length - 1 }}
      </p>

      <nx-thumb :images="getAllImages()" :index="index" class="mt-2"></nx-thumb>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.s-carousel {
  position: fixed;
  inset: 0;
  background-color: var(--color-bg-primary);
  padding: var(--spacing-contain);
  transition: background-color 1500ms;
  transition-timing-function: var(--ease-out);
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
</style>
