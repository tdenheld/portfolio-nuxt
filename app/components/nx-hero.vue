<script setup lang="ts">
import type { Project } from '~/interfaces';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  data: Project;
  headingLevel?: 'h1' | 'h2';
  pdp?: boolean;
}>();

const el = ref<HTMLElement | null>(null);

const createScrollAnimation = () => {
  if (!el.value || props.pdp) return;
  const length = el.value.querySelectorAll('[data-hero-scroll]').length;
  if (length === 0) return;

  const xFactor = -2.8;
  const rotateFactor = 6.7;

  el.value.querySelectorAll('[data-hero-scroll]').forEach((child, index) => {
    const grandChild = child.childNodes[0] as HTMLElement;
    child.classList.add('origin-left');
    grandChild.classList.add('origin-left');

    // Up
    gsap.to(grandChild, {
      opacity: 0,
      filter: 'blur(6px)',
      rotate: (length - index) * -rotateFactor + 'deg',
      x: (length - index) * xFactor + '%',
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
      rotate: (index + 1) * rotateFactor + 'deg',
      x: (index + 1) * xFactor + '%',
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
  if (el.value && !props.pdp) {
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
    <div v-if="data.meta.name || data.meta.period" data-hero-scroll>
      <div>
        <p class="font-serif text-xl md:text-[28px] text-fg-secondary">
          {{ data.meta.name || data.meta.period }}
        </p>
      </div>
    </div>

    <div data-hero-scroll>
      <div>
        <component
          :is="headingLevel || 'h2'"
          class="mt-1 font-semibold text-[calc(24px+4.5vw)] leading-[1.1] font-display max-w-[18ch]"
        >
          {{ data.title }}
        </component>
      </div>
    </div>

    <div v-if="data.meta.descriptionShort" data-hero-scroll class="mt-2">
      <div>
        <p class="text-fg-secondary text-lg max-w-[40ch] leading-[1.4]">
          {{ data.meta.descriptionShort }}
        </p>
      </div>
    </div>

    <div class="mt-8" v-if="data.path" data-hero-scroll>
      <div>
        <nuxt-link :to="data.path" class="button" :class="{ invisible: pdp }"
          >Explore</nuxt-link
        >
      </div>
    </div>
  </div>
</template>
