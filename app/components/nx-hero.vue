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
  const length = el.value.querySelectorAll('[data-hero-scroll]').length;
  if (length === 0) return;

  el.value.querySelectorAll('[data-hero-scroll]').forEach((child, index) => {
    // Up
    gsap.to(child, {
      opacity: 0,
      filter: 'blur(6px)',
      rotate: (length - index) * -5 + 'deg',
      x: (length - index) * -2.5 + '%',
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
      filter: 'blur(6px)',
      ease: 'none',
      rotate: (index + 1) * 5 + 'deg',
      x: (index + 1) * -2.5 + '%',
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
    <div
      v-if="data.meta.name || data.meta.period"
      data-hero-scroll
      class="origin-left"
    >
      <p class="font-serif text-xl md:text-[28px] text-fg-secondary">
        {{ data.meta.name || data.meta.period }}
      </p>
    </div>

    <div data-hero-scroll class="origin-left">
      <component
        :is="headingLevel || 'h2'"
        class="mt-1 font-semibold text-[calc(24px+4.5vw)] leading-[1.1] font-display max-w-[18ch]"
      >
        {{ data.title }}
      </component>
    </div>

    <div v-if="data.meta.descriptionShort" data-hero-scroll class="mt-2 origin-left">
      <p class="text-fg-secondary text-lg max-w-[40ch] leading-[1.4]">
        {{ data.meta.descriptionShort }}
      </p>
    </div>

    <div class="mt-8 origin-left" v-if="data.path" data-hero-scroll>
      <nuxt-link :to="data.path" class="button">Explore</nuxt-link>
    </div>
  </div>
</template>
