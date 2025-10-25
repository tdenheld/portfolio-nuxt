<script setup lang="ts">
import type { Page } from '~/interfaces';

const route = useRoute();
const nuxtApp: any = useNuxtApp();
const page: Page | null = await queryCollection('projects').path(route.path).first();
const projects = await queryCollection('projects').all();
const scrollContainer = ref<HTMLElement | null>(null);

const getCurrentIndex = () => {
  return projects.findIndex((p) => p.path === page?.path) + 1;
};

const getLength = () => {
  return projects.length + 1;
};

// Set colors on document element when component mounts
onMounted(() => {
  nuxtApp.$setColor(page?.meta?.color);
  nuxtApp.$reveal(scrollContainer.value);
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
                <div
                  v-for="entry in page.meta.items"
                  :key="entry.src"
                  class="perspective-[32vw]"
                >
                  <nx-image
                    v-if="
                      entry.src.includes('.png') ||
                      entry.src.includes('.jpg') ||
                      entry.src.includes('.webp')
                    "
                    :src="entry.src"
                    :alt="entry.alt"
                    :image-class="`w-full h-auto ${entry.rounded === false ? '' : 'rounded-2xl'}`"
                    sizes="(min-width: 56rem) 60vw, 80vw"
                    :srcset="[320, 640, 1280, 2100]"
                    class="blur-sm [transform:rotate3d(1,0,0,6deg)]"
                    data-reveal-trigger
                    data-reveal
                  ></nx-image>

                  <nx-video
                    v-if="entry.src.includes('.mp4')"
                    :src="entry.src.replace(/\.(mp4)$/, '')"
                    class="blur-sm [transform:rotate3d(1,0,0,6deg)]"
                    data-reveal-trigger
                    data-reveal
                  ></nx-video>
                </div>
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
  margin-bottom: var(--space-container);
  animation-duration: 900ms;
  animation-fill-mode: both;
  animation-timing-function: var(--ease-in-out);
  animation-name: pdp-fade-up;
}

@keyframes pdp-fade-up {
  to {
    transform: translateY(var(--space-container));
  }
}

/* ---------------------------- */

.pdp-img-fade-up {
  margin-top: var(--space-img);
  opacity: 0;
  transform: translateY(80px);
  animation-duration: 1200ms;
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
