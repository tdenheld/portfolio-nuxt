<script setup lang="ts">
import type { CarouselEntry } from '~/interfaces';

const props = defineProps<{
  data: CarouselEntry[];
}>();

const element = ref<HTMLElement | null>(null);
const heroRefs = ref<Array<any>>([]);
const index = ref(0);

// Create a new array with the last item at the start and the first item at the end
const carouselData: CarouselEntry[] =
  props.data.length > 0
    ? [props.data[props.data.length - 1]!, ...props.data, props.data[0]!]
    : [];

// Calculate the actual height of one item in the carousel
const getActualItemHeight = () => {
  return element.value ? element.value.scrollHeight / carouselData.length : 0;
};

// Set initial scroll position to the first real item
const setInitScrollPos = () => {
  element.value?.scrollTo({
    top: getActualItemHeight(),
    behavior: 'instant' as ScrollBehavior,
  });
};

const setColors = (entry: CarouselEntry) => {
  if (!entry.meta.color) return;

  const root = document.documentElement;
  const { fg, bg } = entry.meta.color;

  // Full palette
  const colors = {
    '--color-fg-primary': fg.primary,
    '--color-fg-secondary': fg.secondary,
    '--color-fg-tertiary': fg.tertiary,
    '--color-bg-primary': bg.primary,
    '--color-bg-secondary': bg.secondary,
    '--color-bg-tertiary': bg.tertiary,
  };

  Object.entries(colors).forEach(([key, value]) => {
    if (value) root.style.setProperty(key, value);
  });
};

const resetHeroAnimations = () => {
  heroRefs.value.forEach((ref) => ref?.resetToVisible?.());
};

const getActive = (i: number) => {
  return (
    i === index.value + 1 ||
    (i === 0 && index.value === props.data.length - 1) ||
    (i === carouselData.length - 1 && index.value === 0)
  );
};

const handleScroll = () => {
  requestAnimationFrame(() => {
    if (!element.value) return;

    // Calculate current index based on scroll position
    const scrollTop = element.value.scrollTop;
    const itemHeight = element.value.clientHeight;
    const currentIndex = Math.round(scrollTop / (itemHeight * 0.9));

    // Update index (subtract 1 because first item is duplicate of last, then subtract 1 more for 0-based)
    // Ensure index stays within bounds of actual data
    if (currentIndex >= 1 && currentIndex <= props.data.length) {
      index.value = currentIndex - 1;
    }

    if (element.value.scrollTop <= 0) {
      // Reset animation state before programmatic scroll
      resetHeroAnimations();

      // If we're at the top, jump to the bottom (last real item)
      element.value.scrollTo({
        top: getActualItemHeight() * props.data.length,
        behavior: 'instant' as ScrollBehavior,
      });
    } else if (
      element.value.scrollTop >=
      element.value.scrollHeight - element.value.clientHeight
    ) {
      // Reset animation state before programmatic scroll
      resetHeroAnimations();

      // If we're at the bottom, jump to the top (first real item)
      setInitScrollPos();
    }

    // Handle edge cases for smoother looping
    if (element.value.scrollTop <= itemHeight * 0.4) {
      index.value = props.data.length - 1;
    } else if (
      element.value.scrollTop >=
      element.value.scrollHeight - element.value.clientHeight * 1.4
    ) {
      index.value = 0;
    }

    // Set colors based on current active item
    const activeEntry = props.data[index.value];
    console.log('Current index:', index.value, 'Active entry:', activeEntry?.title);
    if (activeEntry) setColors(activeEntry);
  });
};

onMounted(() => {
  setInitScrollPos();
  element.value?.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  element.value?.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div
    ref="element"
    data-scroller-carousel
    class="fixed inset-0 p-contain overflow-y-scroll overflow-x-hidden snap-y snap-mandatory no-scrollbar"
  >
    <div
      v-for="(entry, index) in carouselData"
      class="lg:main-grid h-full snap-center"
    >
      <div class="col-start-2 h-full grid items-center">
        <div
          class="reveal duration-[1500ms]"
          :class="{
            'is-active delay-100': getActive(index),
          }"
        >
          <nx-hero :ref="(el) => (heroRefs[index] = el)" :data="entry"></nx-hero>
        </div>
      </div>
    </div>

    <!-- Index counter -->
    <div class="fixed bottom-contain right-contain text-fg-primary text-xs font-mono">
      {{ index }} / {{ data.length - 1 }}
    </div>
  </div>
</template>
