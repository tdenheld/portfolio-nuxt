<script setup lang="ts">
import type { Highlight } from '~/interfaces';
import gsap from 'gsap';

const props = defineProps<{
  highlights: Highlight[];
}>();

onMounted(() => {
  if (!document.querySelectorAll('[data-highlight]')) return;

  gsap.fromTo(
    '[data-highlight]',
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
});
</script>

<template>
  <div>
    <div class="mb-16" v-for="(highlight, i) in highlights" :key="i">
      <h3 data-highlight class="key opacity-0">{{ highlight.title }}</h3>

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
