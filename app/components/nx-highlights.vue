<script setup lang="ts">
import type { Highlight } from '~/interfaces';
import gsap from 'gsap';

const props = defineProps<{
  visit?: string;
  highlights: Highlight[];
  animated?: boolean;
}>();

const hostElement = ref<HTMLElement | null>(null);

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
      stagger: -0.1,
      delay: 0.4,
      duration: 1.5,
      ease: 'power3.out',
    }
  );
};

onMounted(() => {
  if (props.animated) initAnimation();
});
</script>

<template>
  <div ref="hostElement" class="space-y-12">
    <div
      data-highlight
      v-if="visit"
      :class="{ 'opacity-0': animated }"
    >
      <a :href="visit" target="_blank" rel="noreferrer" class="group">
        <nx-button>Visit</nx-button>
      </a>
    </div>

    <div v-for="(highlight, i) in highlights" :key="i">
      <h3 data-highlight class="key" :class="{ 'opacity-0': animated }">
        {{ highlight.title }}
      </h3>

      <ul class="mt-1 text-sm leading-[1.4] text-fg-secondary">
        <li
          data-highlight
          :class="{ 'opacity-0': animated }"
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
