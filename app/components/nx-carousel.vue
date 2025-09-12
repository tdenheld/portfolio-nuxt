<script setup lang="ts">
import type { CarouselEntry } from '~/interfaces';

const props = defineProps<{
  data: CarouselEntry[];
}>();

const element = ref<HTMLElement | null>(null);
const index = ref(0);

// Create a new array with the last item at the start and the first item at the end
const carouselData: CarouselEntry[] =
  props.data.length > 0
    ? [props.data[props.data.length - 1]!, ...props.data, props.data[0]!]
    : [];

// Set initial scroll position to the first real item
const setInitScrollPos = () => {
  element.value?.scrollTo({
    top: element.value?.clientHeight || 0,
    behavior: 'instant' as ScrollBehavior,
  });
};

const handleScroll = () => {
  requestAnimationFrame(() => {
    if (!element.value) return;

    // Calculate current index based on scroll position
    const scrollTop = element.value.scrollTop;
    const itemHeight = element.value.clientHeight;
    const currentIndex = Math.round(scrollTop / itemHeight);

    // Update index (subtract 1 because first item is duplicate of last, then subtract 1 more for 0-based)
    // Ensure index stays within bounds of actual data
    if (currentIndex >= 1 && currentIndex <= props.data.length) {
      index.value = currentIndex - 1;
    }

    if (element.value.scrollTop <= 0) {
      // If we're at the top, jump to the bottom (last real item)
      element.value.scrollTo({
        top: element.value.clientHeight * (props.data.length || 1),
        behavior: 'instant' as ScrollBehavior,
      });
      index.value = props.data.length - 1;
    } else if (
      element.value.scrollTop >=
      element.value.scrollHeight - element.value.clientHeight
    ) {
      // If we're at the bottom, jump to the top (first real item)
      setInitScrollPos();
      index.value = 0;
    }
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
    class="fixed inset-0 p-contain overflow-y-scroll overflow-x-hidden snap-y snap-mandatory no-scrollbar"
  >
    <div v-for="entry in carouselData" class="lg:main-grid h-full snap-center">
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
