<script setup>
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/all';
gsap.registerPlugin(ScrollSmoother);

const route = useRoute();
const page = await queryCollection('projects').path(route.path).first();
const projects = await queryCollection('projects').all();
const nuxtApp = useNuxtApp();

const getCurrentIndex = () => {
  return projects.findIndex((p) => p.path === page.path) + 1;
};

const getLength = () => {
  return projects.length + 1;
};

// Set colors on document element when component mounts
onMounted(() => {
  nuxtApp.$setColor(page?.meta?.color);

  if (!nuxtApp.$isTouchDevice()) {
    ScrollSmoother.create({
      smooth: 0.7,
      effects: true, // looks for data-speed and data-lag attr
      smoothTouch: 0.2, // much lower smoothing on touch devices
      normalizeScroll: true, // prevents address bar from showing/hiding on scroll
    });
  }
});

onUnmounted(() => {
  if (!nuxtApp.$isTouchDevice()) {
    ScrollSmoother.get().kill();
  }
});
</script>

<template>
  <div>
    <div v-if="page" :value="page">
      <nx-meta-tags
        :title="page.title"
        :description="page.description"
        :image="page.meta.image"
      ></nx-meta-tags>

      <div
        id="smooth-wrapper"
        class="fixed inset-0 main-grid px-contain overflow-y-auto no-scrollbar"
      >
        <div id="smooth-content" class="col-start-2">
          <div class="pdp-fade-up">
            <div class="h-[100svh] py-contain grid items-center">
              <nx-hero :data="page" heading-level="h1" pdp></nx-hero>
            </div>

            <div
              class="pdp-img-fade-up mt-[calc(-32vh+48px)] pb-16 space-y-contain"
            >
              <nx-image
                v-for="entry in page.meta.items"
                :src="entry.src"
                :alt="entry.alt"
                class="rounded-2xl overflow-hidden"
                sizes="60vw"
                :srcset="[320, 640, 1280, 2100]"
              ></nx-image>
            </div>
          </div>
        </div>
      </div>

      <nx-counter
        class="hidden md:block"
        :index="getCurrentIndex()"
        :length="getLength()"
        pdp
      ></nx-counter>
    </div>

    <div v-else>
      <nx-error></nx-error>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.pdp-fade-up {
  animation-duration: 1000ms;
  animation-fill-mode: both;
  animation-timing-function: var(--ease-out);
  animation-name: pdp-fade-up;
}

@keyframes pdp-fade-up {
  to {
    margin-top: calc(-26vh + 140px);
  }
}

/* ---------------------------- */

.pdp-img-fade-up {
  opacity: 0;
  transform: translateY(80px);
  animation-duration: 1000ms;
  animation-fill-mode: both;
  animation-timing-function: var(--ease-out);
  animation-delay: 300ms;
  animation-name: pdp-img-fade-up;
}

@keyframes pdp-img-fade-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
