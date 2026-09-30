<script setup>
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

const LOOP_COPIES = 3;
const MAIN_COPY = 1;
// Animating copies further down flashes on iOS when they're scrolled into view.
const LAST_ANIMATED_COPY = MAIN_COPY + 1;
// Seconds, matching the iOS scroll deceleration rate (0.998 per ms).
const GLIDE_TIME_CONSTANT = 0.5;
// Over this duration expo.out starts at exactly the release velocity.
const GLIDE_DURATION = GLIDE_TIME_CONSTANT * 10 * Math.LN2;

const page = await queryCollection('pages').path('/fun').first();
const hostElement = ref(null);
const scrollContainer = ref(null);
const smoothContent = ref(null);
const lists = ref([]);
let loopHeight = 0;
let listOffset = 0;
let lastScroll = 0;
let smoother;
let resizeObserver;

// iOS can't reliably jump scrollTop during native scrolling, so touch devices move the content themselves.
const touchScroll = { value: 0 };
let renderedTouchScroll = 0;
let hasLooped = false;
let wasGliding = false;
let touchObserver;
let glide;

const { isTouchDevice } = useTouchDevice();

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

const getScroll = () => smoother.scrollTrigger.scroll();

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

const loopUpwards = () => {
  if (!loopHeight || getScroll() >= loopHeight / 2) return;

  shiftSmoothScroll(-loopHeight);
  lastScroll = getScroll();
};

// Only loop upwards on actual upward movement, so the page can rest at the top on entry.
const wrapScroll = () => {
  if (!loopHeight) return;

  const scroll = getScroll();
  const isScrollingUp = scroll < lastScroll;
  lastScroll = scroll;

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

// Rests at the top on entry, and wraps through the copies once moved away from it.
const renderTouchScroll = () => {
  if (!loopHeight) return;

  const scroll = touchScroll.value;
  if (scroll < 0 || scroll > listOffset) hasLooped = true;

  renderedTouchScroll = hasLooped
    ? listOffset + gsap.utils.wrap(0, loopHeight, scroll - listOffset)
    : scroll;
  gsap.set(smoothContent.value, { y: -renderedTouchScroll });
};

const createTouchObserver = () =>
  Observer.create({
    target: scrollContainer.value,
    type: 'touch,wheel',
    wheelSpeed: -1,
    onPress: () => {
      wasGliding = Boolean(glide?.isActive());
      glide?.kill();
    },
    onWheel: () => glide?.kill(),
    onChangeY: ({ deltaY }) => {
      touchScroll.value -= deltaY;
      renderTouchScroll();
    },
    onDragEnd: ({ velocityY }) => {
      glide = gsap.to(touchScroll, {
        value: touchScroll.value - velocityY * GLIDE_TIME_CONSTANT,
        duration: GLIDE_DURATION,
        ease: 'expo.out',
        onUpdate: renderTouchScroll,
      });
    },
  });

// A tap that stops a glide shouldn't open the link underneath.
const onClickCapture = (event) => {
  if (wasGliding) event.preventDefault();
};

// Undo the loop jumps so the progress keeps counting across loops.
const updateLoopProgress = () => {
  if (!loopHeight) return;

  const scroll = smoother ? smoother.scrollTop() : renderedTouchScroll;
  let delta = scroll - previousRenderedScroll;
  previousRenderedScroll = scroll;
  delta -= Math.round(delta / loopHeight) * loopHeight;

  unwrappedScroll += delta;
  loopProgress.value = gsap.utils.wrap(0, 2, unwrappedScroll / loopHeight);
};

onMounted(() => {
  const [firstList] = lists.value;
  if (!firstList) return;

  smoother = ScrollSmoother.get();
  if (smoother) window.addEventListener('scroll', wrapScroll, { passive: true });
  else touchObserver = createTouchObserver();

  resizeObserver = new ResizeObserver(() => {
    loopHeight = firstList.offsetHeight;
    listOffset = firstList.offsetTop;
    if (!smoother) renderTouchScroll();
  });
  resizeObserver.observe(firstList);
  gsap.ticker.add(updateLoopProgress);
});

onBeforeUnmount(() => {
  gsap.ticker.remove(updateLoopProgress);
  window.removeEventListener('scroll', wrapScroll);
  resizeObserver?.disconnect();
  touchObserver?.kill();
  glide?.kill();
  smoother = undefined;
});

usePageColor(() => page.color);
</script>

<template>
  <div ref="hostElement">
    <div
      ref="scrollContainer"
      :data-project-scroller="page.path"
      class="fixed inset-0 p-contain overflow-x-hidden no-scrollbar"
      :class="{
        'overflow-y-auto': !isTouchDevice,
        'overflow-y-hidden touch-pinch-zoom': isTouchDevice,
      }"
      @wheel.passive="onWheel"
      @click.capture="onClickCapture"
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
                :class="{
                  'a-ti [transform:translateX(32px)] blur-sm': copy <= LAST_ANIMATED_COPY,
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
