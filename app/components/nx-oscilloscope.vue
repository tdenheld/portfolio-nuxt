<script setup lang="ts">
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const props = defineProps<{
  pdp?: boolean;
}>();

const WAVE_PATH = 'M 0 50 C 17.5 0 32.5 0 50 50 S 82.5 100 100 50';
const STROKE_WIDTH = 1.5;

const nuxtApp = useNuxtApp();
const route = useRoute();

const lineCount = ref(7);
const wavePath = ref<SVGPathElement | null>(null);
// Provided by looping pages (fun) instead of a scroll-bound tween.
const loopProgress = inject<Ref<number> | null>('scrollLoopProgress', null);
  
let waveTween: gsap.core.Tween | undefined;
let contentResizeObserver: ResizeObserver | undefined;

const setLineCount = () => {
  requestAnimationFrame(() => {
    lineCount.value = window.innerWidth >= 980 ? 9 : 7;
  });
};

const createWaveAnimation = () => {
  waveTween?.scrollTrigger?.kill();
  waveTween?.kill();
  waveTween = undefined;
  contentResizeObserver?.disconnect();

  if (loopProgress) return;

  const scrollContainer = Array.from(
    document.querySelectorAll<HTMLElement>('[data-project-scroller]')
  ).find((element) => element.dataset.projectScroller === route.path);
  const scrollContent = scrollContainer?.querySelector<HTMLElement>(
    '[data-project-scroll-content]'
  );

  if (!props.pdp || !wavePath.value || !scrollContainer || !scrollContent) return;

  // ScrollSmoother moves the scrolling to the window, so the wave must follow it there.
  const smoother = ScrollSmoother.get();
  const scrollTarget = smoother ? window : scrollContainer;

  scrollContainer.scrollTop = 0;

  waveTween = gsap.fromTo(
    wavePath.value,
    { drawSVG: '0%' },
    {
      drawSVG: '100%',
      ease: 'none',
      scrollTrigger: {
        ...(smoother ? {} : { scroller: scrollContainer }),
        start: 0,
        end: () => ScrollTrigger.maxScroll(scrollTarget),
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );

  contentResizeObserver = new ResizeObserver(() => {
    waveTween?.scrollTrigger?.refresh();
  });
  contentResizeObserver.observe(scrollContent);
};

const removePageFinishHook = nuxtApp.hook('page:finish', createWaveAnimation);

watchPostEffect(() => {
  const progress = loopProgress?.value;
  if (!props.pdp || !wavePath.value || progress === undefined) return;

  gsap.set(wavePath.value, {
    drawSVG:
      progress < 1 ? `0% ${progress * 100}%` : `${(progress - 1) * 100}% 100%`,
  });
});

onMounted(() => {
  setLineCount();
  window.addEventListener('resize', setLineCount);
  // Wait for the parent page to create its ScrollSmoother.
  nextTick(createWaveAnimation);
});

onUnmounted(() => {
  window.removeEventListener('resize', setLineCount);
  removePageFinishHook();
  waveTween?.scrollTrigger?.kill();
  waveTween?.kill();
  contentResizeObserver?.disconnect();
});
</script>

<template>
  <div class="relative size-full rounded-lg border border-fg-secondary/25">
    <div
      class="absolute inset-0 flex justify-between"
      v-for="grid in 2"
      :key="grid"
      :class="{ 'flex-col': grid === 1 }"
    >
      <div
        v-for="line in lineCount"
        :key="line"
        class="border-fg-secondary/10 first:invisible last:invisible nth-[4]:border-fg-primary/60 nth-[4]:border-dashed lg:nth-[4]:border-fg-secondary/10 lg:nth-[4]:border-solid lg:nth-[5]:border-fg-primary/60 lg:nth-[5]:border-dashed"
        :class="{ 'border-t': grid === 1, 'border-l': grid === 2 }"
      ></div>
    </div>

    <svg
      v-if="pdp"
      class="pointer-events-none absolute inset-0 size-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        :d="WAVE_PATH"
        fill="none"
        stroke="currentColor"
        :stroke-width="STROKE_WIDTH"
        vector-effect="non-scaling-stroke"
        opacity="0.2"
        class="text-fg-secondary"
      ></path>

      <path
        ref="wavePath"
        :d="WAVE_PATH"
        fill="none"
        stroke="currentColor"
        :stroke-width="STROKE_WIDTH"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
        class="text-fg-primary"
      ></path>
    </svg>
  </div>
</template>
