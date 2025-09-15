<script setup lang="ts">
import type { CarouselEntry } from '~/interfaces';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  data: CarouselEntry;
  headingLevel?: 'h1' | 'h2';
}>();

const el = ref<HTMLElement | null>(null);

const createScrollAnimation = () => {
  if (!el.value) return;

  el.value.querySelectorAll('[data-hero-scroll]').forEach((child, index) => {
    const rotateUp = 50 * (4 - index) * -0.1 + 'deg';
    const rotateDown = 50 * (1 + index) * 0.1 + 'deg';

    // Up
    gsap.to(child, {
      opacity: 0,
      filter: 'blur(8px)',
      rotate: rotateUp,
      ease: 'none',
      scrollTrigger: {
        trigger: el.value,
        scrub: 1,
        start: 'center 48%',
        end: 'top 4%',
        scroller: '[data-scroller-carousel]',
      },
    });

    // Down
    gsap.from(child, {
      opacity: 0,
      filter: 'blur(8px)',
      ease: 'none',
      rotate: rotateDown,
      scrollTrigger: {
        trigger: el.value,
        scrub: 1,
        start: 'bottom 96%',
        end: 'center 52%',
        scroller: '[data-scroller-carousel]',
      },
    });
  });
};

const cleanupAnimations = () => {
  if (el.value) {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === el.value) {
        trigger.kill();
      }
    });
  }
};

onMounted(() => {
  createScrollAnimation();
});

onBeforeUnmount(() => {
  cleanupAnimations();
});
</script>

<template>
  <div ref="el">
    <p
      v-if="data.meta.name || data.meta.period"
      data-hero-scroll
      class="font-serif text-xl md:text-[28px] text-fg-secondary origin-left"
    >
      {{ data.meta.name || data.meta.period }}
    </p>

    <div data-hero-scroll class="origin-left">
      <component
        :is="headingLevel || 'h2'"
        class="mt-1 font-semibold text-[calc(24px+4.5vw)] leading-[1.1] font-display max-w-[18ch]"
      >
        {{ data.title }}
      </component>
    </div>

    <p
      v-if="data.meta.descriptionShort"
      data-hero-scroll
      class="mt-5 text-fg-secondary text-lg max-w-[40ch] leading-[1.4] origin-left"
    >
      {{ data.meta.descriptionShort }}
    </p>

    <div class="mt-8 origin-left" v-if="data.path" data-hero-scroll>
      <nuxt-link :to="data.path" class="button">Explore</nuxt-link>
    </div>
  </div>
</template>
