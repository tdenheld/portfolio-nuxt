<script setup lang="ts">
import type { Page } from '~/interfaces';

const route = useRoute();
const nuxtApp: any = useNuxtApp();
const page: Page | null = await queryCollection('projects').path(route.path).first();
const projects = await queryCollection('projects').all();
const scrollContainer = ref<HTMLElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

const getCurrentIndex = () => {
  return projects.findIndex((p) => p.path === page?.path) + 1;
};

const getLength = () => {
  return projects.length + 1;
};

const buildThresholdList = () => {
  const thresholds = [];
  const numSteps = 16;

  for (let i = 1.0; i <= numSteps; i++) {
    const ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
};

const getOpacity = (ratio: number) => {
  return Math.min(1, ratio * 2).toFixed(2);
};

const getBlur = (ratio: number) => {
  return Math.max(0, (1 - ratio * 2) * 4).toFixed(2);
};

const createObserver = () => {
  observer.value = new IntersectionObserver(
    (entries: any) => {
      entries.map((entry: any) => {
        const ratio = entry.intersectionRatio;

        entry.target.style.opacity = getOpacity(ratio);
        entry.target.style.filter = `blur(${getBlur(ratio)}px)`;
      });
    },
    {
      root: scrollContainer.value,
      rootMargin: '0px',
      threshold: buildThresholdList(),
    }
  );

  scrollContainer.value?.querySelectorAll('[data-reveal]').forEach((el, index) => {
    if (!observer.value) return;
    observer.value.observe(el);
  });
};

// Set colors on document element when component mounts
onMounted(() => {
  nuxtApp.$setColor(page?.meta?.color);
  createObserver();
});
</script>

<template>
  <div class="host">
    <div v-if="page" :value="page">
      <nx-meta-tags
        :title="page.title"
        :description="page.description"
        :image="page.meta.image"
      ></nx-meta-tags>

      <div
        ref="scrollContainer"
        class="fixed inset-0 lg:main-grid px-contain overflow-y-auto no-scrollbar"
      >
        <div class="col-start-2">
          <div class="pdp-fade-up">
            <div class="h-[100svh] py-contain grid items-center">
              <nx-hero :data="page" heading-level="h1" pdp></nx-hero>
            </div>

            <div class="pdp-img-fade-up pb-16">
              <div class="space-y-contain">
                <nx-image
                  v-for="entry in page.meta.items"
                  :src="entry.src"
                  :alt="entry.alt"
                  :image-class="`w-full h-auto ${entry.rounded === false ? '' : 'rounded-2xl'}`"
                  sizes="60vw"
                  :srcset="[320, 640, 1280, 2100]"
                  data-reveal
                  class="transition duration-1200"
                ></nx-image>
              </div>

              <div class="pt-12 lg:hidden">
                <nx-highlights
                  :highlights="page.meta.highlights || []"
                  :visit="page.meta.visit"
                ></nx-highlights>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nx-counter
        class="hidden lg:block"
        :index="getCurrentIndex()"
        :images="[page.meta.image || '']"
        :length="getLength()"
        :highlights="page.meta.highlights || []"
        :visit="page.meta.visit"
        pdp
      ></nx-counter>

      <nx-description></nx-description>
    </div>

    <div v-else>
      <nx-error></nx-error>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.host {
  --space-container: calc(-26vh + 4vw + 96px);
  --space-img: calc(-36vh + 64px);
}

.pdp-fade-up {
  animation-duration: 800ms;
  animation-fill-mode: both;
  animation-timing-function: var(--ease-out);
  animation-name: pdp-fade-up;
}

@keyframes pdp-fade-up {
  to {
    margin-top: var(--space-container);
  }
}

/* ---------------------------- */

.pdp-img-fade-up {
  margin-top: var(--space-img);
  opacity: 0;
  transform: translateY(80px);
  animation-duration: 800ms;
  animation-fill-mode: both;
  animation-timing-function: var(--ease-out);
  animation-delay: 200ms;
  animation-name: pdp-img-fade-up;
}

@keyframes pdp-img-fade-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
