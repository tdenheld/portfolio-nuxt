<script setup lang="ts">
import type { Page } from '~/interfaces';

const props = defineProps<{
  data: Page[];
}>();

const nuxtApp: any = useNuxtApp();
const counterData = useState('counterData');

const index = useState<number>('projectIndex');
watch(index, () => {
  // Set colors based on current active item
  setColor();

  // Update counter data for the layout component
  setCounterData();
});

const setCounterData = () => {
  counterData.value = {
    images: getAllImages(),
    pdp: false,
  };
};

// Create a new array with multiple copies of the data to allow infinite scrolling
const carouselData = ref<Page[]>([...Array(2).fill(props.data).flat()]);

// Calculate the actual height of one item in the carousel
const getActualItemHeight = (target: HTMLElement) => {
  return target ? target.scrollHeight / carouselData.value.length : 0;
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

// Check if the first item of the active project is a video
const getVideo = computed(() => {
  const entry = getActiveEntry();
  if (!entry || !entry.meta?.items || entry.meta.items.length === 0) return null;

  const firstItem = entry.meta.items[0];
  if (firstItem && firstItem.src?.endsWith('.mp4')) {
    return firstItem.src?.replace('.mp4', ''); // Remove extension for nx-video component
  }

  return null;
});

// Handle scroll events to update index and colors
const handleScroll = (event: Event) => {
  requestAnimationFrame(() => {
    const target = event.target as HTMLElement;
    if (!target) return;

    // Calculate current index based on scroll position
    const scrollTop = target.scrollTop;
    const itemHeight = getActualItemHeight(target);
    const currentIndex = Math.round(scrollTop / itemHeight);

    //  Update index
    if (currentIndex >= 0 && currentIndex < carouselData.value.length) {
      const dataIndex = currentIndex % props.data.length;
      index.value = dataIndex;
    }

    // When reaching cloned items add another array to the carousel
    if (currentIndex >= carouselData.value.length - props.data.length) {
      carouselData.value = [...carouselData.value, ...props.data];
    }
  });
};

onMounted(() => {
  setColor();
  setCounterData();
});
</script>

<template>
  <div>
    <div
      @scroll="handleScroll($event)"
      data-scroller-carousel
      class="s-carousel no-scrollbar"
    >
      <div
        v-for="(entry, i) in carouselData"
        :key="i"
        class="lg:main-grid h-full snap-center"
      >
        <div class="col-start-2 h-full grid items-center">
          <nx-hero :data="entry" :heading-level="index === 0 ? 'h1' : 'h2'"></nx-hero>
        </div>
      </div>
    </div>

    <nx-description :is-active="true"></nx-description>
    <nx-video v-if="getVideo" :src="getVideo" :preload="true" class="hidden" />
  </div>
</template>

<style scoped lang="postcss">
.s-carousel {
  position: fixed;
  inset: 0;
  padding: var(--spacing-contain);
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
</style>
