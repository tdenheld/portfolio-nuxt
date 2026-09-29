<script setup>
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

const LOOP_COPIES = 3;
const MAIN_COPY = 1;

const page = await queryCollection('pages').path('/fun').first();
const hostElement = ref(null);
const scrollContainer = ref(null);
const smoothContent = ref(null);
const lists = ref([]);
let loopHeight = 0;
let lastScroll = 0;
let touchY = 0;
let smoother;
let resizeObserver;

// 0–1 draws the oscilloscope wave in, 1–2 draws it out.
const loopProgress = ref(0);
provide('scrollLoopProgress', loopProgress);
let previousRenderedScroll = 0;
let unwrappedScroll = 0;

useSmoothParallax({
  host: hostElement,
  scroller: scrollContainer,
  content: smoothContent,
});

const getScroll = () =>
  smoother ? smoother.scrollTrigger.scroll() : scrollContainer.value.scrollTop;

// Shift the native target and move the smoothed position to its closest identical spot, so smoothing carries on seamlessly.
const shiftSmoothScroll = (shift) => {
  const { scrollTrigger } = smoother;
  const scrub = scrollTrigger.getTween();
  const range = scrollTrigger.end - scrollTrigger.start;
  const target = scrollTrigger.scroll() - shift;

  scrollTrigger.scroll(target);
  if (!scrub) return smoother.scrollTop(target);

  const targetProgress = (target - scrollTrigger.start) / range;
  const loopProgress = loopHeight / range;
  const currentProgress = scrollTrigger.animation.totalProgress();
  const loopOffset =
    Math.round((targetProgress - currentProgress) / loopProgress) * loopProgress;

  scrub.resetTo('totalProgress', targetProgress, currentProgress + loopOffset);
};

const shiftScroll = (shift) => {
  if (smoother) shiftSmoothScroll(shift);
  else scrollContainer.value.scrollTop -= shift;
};

const loopUpwards = () => {
  if (!loopHeight || getScroll() >= loopHeight / 2) return;

  shiftScroll(-loopHeight);
  lastScroll = getScroll();
};

// Only loop upwards on actual upward movement, so the page can rest at the top on entry.
const wrapScroll = () => {
  if (!loopHeight) return;

  const scroll = getScroll();
  const isScrollingUp = scroll < lastScroll;
  lastScroll = scroll;

  if (scroll >= loopHeight * 1.5) {
    shiftScroll(loopHeight);
    lastScroll = getScroll();
  } else if (isScrollingUp) {
    loopUpwards();
  }
};

// At the very top there is no scroll event, so detect the upward intent directly.
const onWheel = (event) => {
  if (event.deltaY < 0) loopUpwards();
};

const onTouchStart = (event) => {
  touchY = event.touches[0].clientY;
};

const onTouchMove = (event) => {
  const { clientY } = event.touches[0];
  if (clientY > touchY) loopUpwards();
  touchY = clientY;
};

// Undo the loop jumps so the progress keeps counting across loops.
const updateLoopProgress = () => {
  if (!loopHeight) return;

  const scroll = smoother ? smoother.scrollTop() : scrollContainer.value.scrollTop;
  let delta = scroll - previousRenderedScroll;
  previousRenderedScroll = scroll;
  if (Math.abs(delta) > loopHeight / 2) delta -= Math.sign(delta) * loopHeight;

  unwrappedScroll += delta;
  loopProgress.value = gsap.utils.wrap(0, 2, unwrappedScroll / loopHeight);
};

onMounted(() => {
  const [firstList] = lists.value;
  if (!firstList) return;

  smoother = ScrollSmoother.get();
  if (smoother) window.addEventListener('scroll', wrapScroll, { passive: true });

  resizeObserver = new ResizeObserver(() => {
    loopHeight = firstList.offsetHeight;
  });
  resizeObserver.observe(firstList);
  gsap.ticker.add(updateLoopProgress);
});

onBeforeUnmount(() => {
  gsap.ticker.remove(updateLoopProgress);
  window.removeEventListener('scroll', wrapScroll);
  resizeObserver?.disconnect();
  smoother = undefined;
});

usePageColor(() => page.color);
</script>

<template>
  <div ref="hostElement">
    <div
      ref="scrollContainer"
      :data-project-scroller="page.path"
      class="fixed inset-0 p-contain overflow-y-auto overflow-x-hidden no-scrollbar"
      @scroll.passive="wrapScroll"
      @wheel.passive="onWheel"
      @touchstart.passive="onTouchStart"
      @touchmove.passive="onTouchMove"
    >
      <div ref="smoothContent" class="lg:main-grid">
        <div class="pt-[calc(3vw+6rem)] col-start-2" data-project-scroll-content>
          <h1 class="sr-only">{{ page.title }}</h1>

          <ul
            v-for="copy in LOOP_COPIES"
            :key="copy"
            ref="lists"
            :aria-hidden="copy !== MAIN_COPY || undefined"
          >
            <li v-for="(item, index) in page.links" :key="item.url">
              <div
                class="a-ti [transform:translateX(32px)] blur-md"
                :style="{ animationDelay: `${100 + index * 100}ms` }"
              >
                <a
                  :href="item.url"
                  :tabindex="copy === MAIN_COPY ? undefined : -1"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[calc(3vw+1.5rem)] font-bold inline-block py-6 lg:py-10 leading-none transition duration-700 hover:text-fg-secondary"
                  >{{ item.label }}</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <nx-counter
      :index="0"
      :length="0"
      label="Side Projects & Experiments"
      hide-index
      pdp
    ></nx-counter>
  </div>
</template>
