<script setup>
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

const LOOP_COPIES = 3;
const MAIN_COPY = 1;
const LAST_ANIMATED_COPY = MAIN_COPY + 1;

// Stay below the sentinel's resting top (--spacing-contain, 48px at lg) or it hides on entry.
const NAV_TIME_FADE_OFFSET = 40;

const page = await queryCollection('pages').path('/fun').first();
const hostElement = ref(null);
const scrollContainer = ref(null);
const smoothContent = ref(null);
const lists = ref([]);
const topSentinel = ref(null);
const isNavTimeHidden = useState('isNavTimeHidden', () => false);
let loopHeight = 0;
// Scroll at which the first item reaches the viewport top; looping up is only armed past it.
let firstItemScroll = 0;
let canLoopUp = false;
let lastScroll = 0;
let smoother;
let resizeObserver;
let topObserver;

// Touch devices scroll natively through a single copy, without looping.
const { isTouchDevice } = useTouchDevice();
const listCopies = isTouchDevice.value ? 1 : LOOP_COPIES;

// 0–1 draws the oscilloscope wave in, 1–2 draws it out.
const loopProgress = ref(0);
if (!isTouchDevice.value) provide('scrollLoopProgress', loopProgress);
let previousRenderedScroll = 0;
let unwrappedScroll = 0;

useSmoothParallax({
  host: hostElement,
  scroller: scrollContainer,
  content: smoothContent,
});

const getScroll = () => smoother.scrollTrigger.scroll();

/* Shift the native target and move the smoothed position to its
   closest identical spot, so smoothing carries on seamlessly. */
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

const loopUpwards = () => {
  if (!loopHeight || !canLoopUp || getScroll() >= loopHeight / 2) return;

  shiftSmoothScroll(-loopHeight);
  lastScroll = getScroll();
};

// Only loop upwards on actual upward movement, so the page can rest at the top on entry.
const wrapScroll = () => {
  if (!loopHeight) return;

  const scroll = getScroll();
  const isScrollingUp = scroll < lastScroll;
  lastScroll = scroll;
  if (scroll >= firstItemScroll) canLoopUp = true;

  if (scroll >= loopHeight * 1.5) {
    shiftSmoothScroll(loopHeight);
    lastScroll = getScroll();
  } else if (isScrollingUp) {
    loopUpwards();
  }
};

// At the very top there is no scroll event, so detect the upward intent directly.
const onWheel = (event) => {
  if (smoother && event.deltaY < 0) loopUpwards();
};

// Undo the loop jumps so the progress keeps counting across loops.
const updateLoopProgress = () => {
  if (!loopHeight) return;

  const scroll = smoother.scrollTop();
  let delta = scroll - previousRenderedScroll;
  previousRenderedScroll = scroll;
  delta -= Math.round(delta / loopHeight) * loopHeight;

  unwrappedScroll += delta;
  loopProgress.value = gsap.utils.wrap(0, 2, unwrappedScroll / loopHeight);
};

onMounted(() => {
  topObserver = new IntersectionObserver(
    ([entry]) => {
      isNavTimeHidden.value = !entry.isIntersecting;
    },
    { rootMargin: `-${NAV_TIME_FADE_OFFSET}px 0px 0px 0px` }
  );
  topObserver.observe(topSentinel.value);

  const [firstList] = lists.value;
  smoother = ScrollSmoother.get();
  if (!firstList || !smoother) return;

  window.addEventListener('scroll', wrapScroll, { passive: true });

  resizeObserver = new ResizeObserver(() => {
    loopHeight = firstList.offsetHeight;
    firstItemScroll = smoother.offset(firstList, 'top top');
  });
  resizeObserver.observe(firstList);
  gsap.ticker.add(updateLoopProgress);
});

onBeforeUnmount(() => {
  gsap.ticker.remove(updateLoopProgress);
  window.removeEventListener('scroll', wrapScroll);
  resizeObserver?.disconnect();
  topObserver?.disconnect();
  isNavTimeHidden.value = false;
  smoother = undefined;
});

usePageColor(() => page.color);
</script>

<template>
  <div ref="hostElement">
    <div
      ref="scrollContainer"
      :data-project-scroller="page.path"
      class="fixed inset-0 p-contain overflow-x-hidden overflow-y-auto no-scrollbar"
      @wheel.passive="onWheel"
    >
      <div ref="smoothContent" class="lg:main-grid">
        <div class="relative pt-[calc(3vw+6rem)] pb-16 col-start-2" data-project-scroll-content>
          <div ref="topSentinel" class="absolute inset-x-0 top-0 h-1" aria-hidden="true"></div>
          <h1 class="sr-only">{{ page.title }}</h1>

          <ul
            v-for="copy in listCopies"
            :key="copy"
            ref="lists"
            :aria-hidden="copy !== MAIN_COPY || undefined"
          >
            <li v-for="(item, index) in page.links" :key="item.url">
              <div
                :class="{
                  'a-ti [transform:translateX(32px)] blur-sm':
                    copy <= LAST_ANIMATED_COPY,
                }"
                :style="
                  copy <= LAST_ANIMATED_COPY && {
                    animationDelay: `${50 + ((copy - 1) * page.links.length + index) * 80}ms`,
                  }
                "
              >
                <a
                  :href="item.url"
                  :tabindex="copy === MAIN_COPY ? undefined : -1"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group inline-block py-6 lg:py-10"
                  ><div
                    class="text-[calc(2.8vw+1.5rem)] font-bold leading-none transition duration-700 group-hover:text-fg-secondary"
                  >
                    {{ item.label }}
                  </div>
                  <div
                    class="mt-2 md:mt-3 text-xs font-mono text-fg-secondary text-pretty max-w-prose"
                  >
                    {{ item.description }}
                  </div></a
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
