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

const hostElement = ref<HTMLElement | null>(null);
const isCta = ref(true);

const createScrollAnimation = () => {
  if (!hostElement.value || props.pdp) return;
  const scrollElements = hostElement.value.querySelectorAll('[data-hero-scroll]');
  const length = scrollElements.length;
  if (length === 0) return;

  const xFactor = -2.8;
  const rotateFactor = 6.7;

  scrollElements.forEach((el, index) => {
    const child = el.childNodes[0] as HTMLElement;
    el.classList.add('origin-left');
    child.classList.add('origin-left');

    // Up
    gsap.to(child, {
      opacity: 0,
      filter: 'blur(6px)',
      rotate: (length - index) * -rotateFactor + 'deg',
      x: (length - index) * xFactor + '%',
      ease: 'none',
      scrollTrigger: {
        trigger: hostElement.value,
        scrub: 1,
        start: 'center 48%',
        end: 'top 4%',
        scroller: '[data-scroller-carousel]',
      },
    });

    // Down
    gsap.from(el, {
      opacity: 0,
      filter: 'blur(6px)',
      ease: 'none',
      rotate: (index + 1) * rotateFactor + 'deg',
      x: (index + 1) * xFactor + '%',
      scrollTrigger: {
        trigger: hostElement.value,
        scrub: 1,
        start: 'bottom 96%',
        end: 'center 52%',
        scroller: '[data-scroller-carousel]',
      },
    });
  });
};

const cleanupAnimations = () => {
  if (hostElement.value && !props.pdp) {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === hostElement.value) {
        trigger.kill();
      }
    });
  }
};

onMounted(() => {
  createScrollAnimation();

  if (props.pdp) {
    setTimeout(() => {
      isCta.value = false;
    }, 1250);
  }
});

onBeforeUnmount(() => {
  cleanupAnimations();
});
</script>

<template>
  <div ref="hostElement">
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

    <div class="mt-8 relative h-7" v-if="data.path" data-hero-scroll>
      <div v-if="isCta" class="absolute">
        <nuxt-link
          :to="data.path"
          class="inline-block focus-visible:outline-0 group"
          :class="{ 'cta-fade-out': pdp }"
          ><nx-button>Explore</nx-button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.cta-fade-out {
  animation-duration: 1200ms;
  animation-fill-mode: both;
  animation-timing-function: var(--ease-out);
  animation-name: cta-fade-out;
  animation-delay: 50ms;
}

@keyframes cta-fade-out {
  to {
    opacity: 0;
    transform: scale(0.8);
    filter: blur(4px);
  }
}
</style>
