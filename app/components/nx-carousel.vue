<script setup lang="ts">
import type { CarouselEntry } from '~/interfaces';

const element = ref<HTMLElement | null>(null);

const props = defineProps<{
  data: CarouselEntry[];
}>();

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

    // If we're at the top, jump to the bottom (last real item)
    if (element.value.scrollTop <= 0) {
      element.value.scrollTo({
        top: element.value.clientHeight * (props.data.length || 1),
        behavior: 'instant' as ScrollBehavior,
      });

      // If we're at the bottom, jump to the top (first real item)
    } else if (
      element.value.scrollTop >=
      element.value.scrollHeight - element.value.clientHeight
    ) {
      setInitScrollPos();
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
    class="fixed inset-0 overflow-y-scroll overflow-x-hidden snap-y snap-mandatory no-scrollbar"
  >
    <div v-for="entry in carouselData" class="lg:main-grid h-full snap-center">
      <div class="col-start-2 h-full grid items-center">
        <nx-hero :data="entry"></nx-hero>
      </div>
    </div>
  </div>
</template>
