<script setup lang="ts">
import type { Highlight } from '~/interfaces';
import gsap from 'gsap';

const props = defineProps<{
  visit?: string;
  highlights: Highlight[];
  animated?: boolean;
}>();

const hostElement = ref<HTMLElement | null>(null);
const nuxtApp: any = useNuxtApp();
let observer: any;

const initAnimation = () => {
  const host = hostElement.value;
  if (!host || !host.querySelector('[data-highlight]')) return;
  const elements = host.querySelectorAll('[data-highlight]');

  gsap.fromTo(
    elements,
    {
      opacity: 0,
      x: 32,
    },
    {
      opacity: 1,
      x: 0,
      stagger: props.animated ? -0.1 : 0.08,
      delay: props.animated ? 0.4 : 0,
      duration: props.animated ? 1.5 : 0.8,
      ease: 'power3.out',
    }
  );
};

onMounted(() => {
  if (props.animated) {
    initAnimation();
  } else {
    observer = nuxtApp.$intersectionObserver({
      element: hostElement.value,
      onScreen: () => {
        initAnimation();
        observer?.cleanup();
      },
    });
  }
});

onBeforeUnmount(() => {
  if (observer) observer.cleanup();
});
</script>

<template>
  <div ref="hostElement" class="space-y-12">
    <div data-highlight v-if="visit" class="opacity-0">
      <a :href="visit" target="_blank" rel="noopener noreferrer" class="group focus:outline-none">
        <nx-button>Visit</nx-button>
      </a>
    </div>

    <div v-for="(highlight, i) in highlights" :key="i">
      <h3 data-highlight class="key opacity-0">
        {{ highlight.title }}
      </h3>

      <ul class="mt-1 text-sm leading-[1.4] text-fg-secondary">
        <li
          data-highlight
          class="opacity-0"
          v-for="(item, j) in highlight.items"
          :key="j"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
