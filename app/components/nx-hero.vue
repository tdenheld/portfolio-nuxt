<script setup lang="ts">
import type { CarouselEntry } from '~/interfaces';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  data: CarouselEntry;
}>();

const el = ref<HTMLElement | null>(null);

const createScrollAnimation = () => {
  if (!el.value) return;

  gsap.fromTo(
    el.value,
    { opacity: 1, filter: 'blur(0px)' },
    {
      opacity: 0,
      filter: 'blur(8px)',
      ease: 'none',
      scrollTrigger: {
        trigger: el.value,
        scrub: true,
        start: 'center 45%',
        end: 'top top',
        scroller: '[data-scroller-carousel]',
      },
    }
  );

  gsap.fromTo(
    el.value,
    { opacity: 0, filter: 'blur(8px)' },
    {
      opacity: 1,
      filter: 'blur(0px)',
      ease: 'none',
      scrollTrigger: {
        trigger: el.value,
        scrub: true,
        start: 'bottom bottom',
        end: 'center 55%',
        scroller: '[data-scroller-carousel]',
      },
    }
  );
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
      class="font-serif text-xl md:text-[28px] text-fg-secondary"
    >
      {{ data.meta.name || data.meta.period }}
    </p>

    <h1
      class="mt-1 font-semibold text-[calc(24px+4.5vw)] leading-[1.1] font-display max-w-[18ch]"
    >
      {{ data.title }}
    </h1>

    <p
      v-if="data.meta.descriptionShort"
      class="mt-5 text-fg-secondary text-lg max-w-[40ch] leading-[1.4]"
    >
      {{ data.meta.descriptionShort }}
    </p>
    
    <div class="mt-8" v-if="data.path">
      <nuxt-link :to="data.path" class="button">Explore</nuxt-link>
    </div>
  </div>
</template>
