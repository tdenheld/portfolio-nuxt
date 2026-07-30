<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { Page } from '~/interfaces';

const props = defineProps<{
  data: Page[];
}>();

const counterData = useState('counterData');
const activeSlideIndex = ref(0);

const index = useState<number>('projectIndex');
watch(index, () => {
  // Update counter data for the layout component
  setCounterData();
});

const setCounterData = () => {
  counterData.value = {
    images: getAllImages(),
    pdp: false,
  };
};

/* Render one original cycle and one clone. The clone provides room to continue
  scrolling; handleScrollEnd maps it back without growing or replacing the DOM. */
const carouselData = [...Array(2).fill(props.data).flat()];

// Calculate the actual height of one item in the carousel
const getActualItemHeight = (target: HTMLElement) => {
  return target ? target.scrollHeight / carouselData.length : 0;
};

/* A wrap looks like a large backwards jump to ScrollTrigger. Complete only this
   scroller's scrub tweens so they do not replay while catching up to the jump. */
const syncScrollAnimations = (target: HTMLElement) => {
  ScrollTrigger.update();
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.scroller === target) trigger.getTween()?.progress(1);
  });
};

const handleScrollEnd = (event: Event) => {
  const target = event.target as HTMLElement;
  const firstSlide = target.children[0] as HTMLElement | undefined;
  const firstClone = target.children[props.data.length] as HTMLElement | undefined;
  if (!firstSlide || !firstClone) return;

  // Measure the rendered cycle so padding and responsive slide heights are included.
  const cycleHeight = firstClone.offsetTop - firstSlide.offsetTop;
  if (target.scrollTop < cycleHeight) return;

  /* Once snapping settles in the cloned cycle, move to the identical position in
     the original cycle. The content and logical project index stay unchanged. */
  target.scrollTop -= cycleHeight;
  activeSlideIndex.value = Math.round(target.scrollTop / getActualItemHeight(target));
  syncScrollAnimations(target);

  // The scrollTop assignment emits another scroll update; flush it before paint too.
  requestAnimationFrame(() => syncScrollAnimations(target));
};

// Get the currently active entry based on the index
const getActiveEntry = () => {
  if (!props.data) return;
  return props.data[index.value];
};
usePageColor(() => getActiveEntry()?.color);

const getAllImages = () => {
  // Return an array of all images from the data array
  return props.data.map((entry) => entry.image).filter((img): img is string => !!img);
};

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
    if (currentIndex >= 0 && currentIndex < carouselData.length) {
      const dataIndex = currentIndex % props.data.length;
      activeSlideIndex.value = currentIndex;
      index.value = dataIndex;
    }
  });
};

onMounted(() => {
  setCounterData();
});
</script>

<template>
  <div>
    <h1 class="sr-only">{{ data[0]?.title }}</h1>

    <div
      @scroll="handleScroll($event)"
      @scrollend="handleScrollEnd($event)"
      data-scroller-carousel
      role="region"
      aria-label="Featured projects"
      class="s-carousel no-scrollbar"
    >
      <!-- Keep cloned, off-screen actions out of the keyboard and accessibility trees. -->
      <div
        v-for="(entry, i) in carouselData"
        :key="i"
        :aria-hidden="i >= data.length ? true : undefined"
        :inert="i >= data.length ? true : undefined"
        class="lg:main-grid h-full snap-center"
      >
        <div class="col-start-2 h-full grid items-center">
          <nx-hero :data="entry" heading-level="h2"></nx-hero>
        </div>
      </div>
    </div>

    <nx-description :is-active="true"></nx-description>
    <nx-scroll-indicator></nx-scroll-indicator>
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
