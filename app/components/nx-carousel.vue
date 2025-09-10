<script setup lang="ts">
interface CarouselEntry {
  meta: {
    name?: string;
    period?: string;
    descriptionShort?: string;
  };
  title: string;
  path?: string;
}

const props = defineProps<{
  data: CarouselEntry[];
}>();

const currentIndex = ref(0);
const listening = ref(true);

const touch = reactive({
  startX: 0,
  startY: 0,
  dx: 0,
  dy: 0,
  startTime: 0,
  dt: 0,
});

const wheelTimeout = ref<NodeJS.Timeout | null>(null);
const wheelDelta = ref(0);
const isScrolling = ref(false);

const next = () => {
  if (currentIndex.value === props.data.length - 1) {
    currentIndex.value = 0;
  } else {
    currentIndex.value += 1;
  }
};

const prev = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = props.data.length - 1;
  } else {
    currentIndex.value -= 1;
  }
};

const handleDirection = (direction: 'up' | 'down') => {
  direction === 'up' ? prev() : next();
  listening.value = false;

  setTimeout(() => {
    listening.value = true;
  }, 1000);
};

const handleWheel = (e: WheelEvent) => {
  if (!listening.value) return;

  const direction = e.deltaY < 0 ? 'up' : 'down';
  handleDirection(direction);
};

const handleTouchStart = (e: TouchEvent) => {
  if (!listening.value) return;
  const t = e.changedTouches[0];

  if (!t) return;
  touch.startX = t.pageX;
  touch.startY = t.pageY;
};

const handleTouchMove = (e: TouchEvent) => {
  if (!listening.value) return;
  e.preventDefault();
};

const handleTouchEnd = (e: TouchEvent) => {
  if (!listening.value) return;

  let direction: 'up' | 'down' = 'down';
  const t = e.changedTouches[0];

  if (!t) return;
  touch.dx = t.pageX - touch.startX;
  touch.dy = t.pageY - touch.startY;

  if (touch.dy > 10) direction = 'up';
  if (touch.dy < -10) direction = 'down';

  handleDirection(direction);
};

onMounted(() => {
  document.addEventListener('wheel', handleWheel);
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
});

onUnmounted(() => {
  document.removeEventListener('wheel', handleWheel);
  document.removeEventListener('touchstart', handleTouchStart);
  document.removeEventListener('touchmove', handleTouchMove);
  document.removeEventListener('touchend', handleTouchEnd);
});
</script>

<template>
  <div>
    <template v-for="(entry, index) in props.data" :key="index">
      <div v-if="index === currentIndex">
        <p
          v-if="entry.meta.name || entry.meta.period"
          class="font-serif text-xl md:text-[28px] text-fg-secondary"
        >
          {{ entry.meta.name || entry.meta.period }}
        </p>

        <h1
          class="mt-1 font-semibold text-[calc(24px+4.5vw)] leading-[1.1] font-display max-w-[18ch]"
        >
          {{ entry.title }}
        </h1>

        <p
          v-if="entry.meta.descriptionShort"
          class="mt-5 text-fg-secondary text-lg max-w-[40ch] leading-[1.4]"
        >
          {{ entry.meta.descriptionShort }}
        </p>

        <div class="mt-8" v-if="entry.path">
          <nuxt-link :to="entry.path" class="button">Explore</nuxt-link>
        </div>
      </div>
    </template>
  </div>
</template>
