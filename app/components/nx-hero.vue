<script setup lang="ts">
import type { Page } from '~/interfaces';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  data: Page;
  headingLevel?: 'h1' | 'h2';
  pdp?: boolean;
}>();

const fromHome = useState('fromHome');
const route = useRoute();
const router = useRouter();
const nuxtApp = useNuxtApp();
const hostElement = ref<HTMLElement | null>(null);
const isCta = ref(true);
const isTouchDevice = ref(false);

const createScrollAnimation = () => {
  if (!hostElement.value || props.pdp) return;
  const scrollElements = hostElement.value.querySelectorAll('[data-hero-scroll]');
  const carousel = document.querySelector('[data-scroller-carousel]');
  const length = scrollElements.length;
  if (length === 0 && !carousel) return;

  const FILTER = 'blur(6px)';
  const X_FACTOR = -2.8;
  const ROTATE_FACTOR = 6.7;

  scrollElements.forEach((el, index) => {
    const child = el.childNodes[0] as HTMLElement;
    el.classList.add('origin-left');
    child.classList.add('origin-left');

    // Up
    gsap.to(child, {
      opacity: 0,
      filter: FILTER,
      rotate: (length - index) * -ROTATE_FACTOR + 'deg',
      x: (length - index) * X_FACTOR + '%',
      ease: 'none',
      scrollTrigger: {
        trigger: hostElement.value,
        scrub: 1,
        start: 'center 48%',
        end: 'top 4%',
        scroller: carousel,
      },
    });

    // Down
    gsap.from(el, {
      opacity: 0,
      filter: FILTER,
      ease: 'none',
      rotate: (index + 1) * ROTATE_FACTOR + 'deg',
      x: (index + 1) * X_FACTOR + '%',
      scrollTrigger: {
        trigger: hostElement.value,
        scrub: 1,
        start: 'bottom 96%',
        end: 'center 52%',
        scroller: carousel,
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
const goto = () => {
  if (!isTouchDevice.value || props.data.path === route.path) return;
  router.push(props.data.path || '/');
};

onMounted(() => {
  createScrollAnimation();
  isTouchDevice.value = (nuxtApp.$isTouchDevice as () => boolean)();

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
  <div ref="hostElement" @click="goto()">
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
      <div v-if="isCta && fromHome" class="absolute">
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
