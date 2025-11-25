<script setup lang="ts">
import type { Page } from '~/interfaces';

const fromHome = useState('fromHome');
const counterData = useState<any>('counterData');
const projectIndex = useState<number>('projectIndex');

const route = useRoute();
const nuxtApp: any = useNuxtApp();
const page: Page | null = await queryCollection('content').path(route.path).first();
const projects = await queryCollection('projects').all();
const scrollContainer = ref<HTMLElement | null>(null);

const nextProject = computed(() => {
  const nextIndex = projectIndex.value % projects.length;
  return projects[nextIndex];
});

onBeforeMount(() => {
  projectIndex.value = projects.findIndex((p) => p.path === page?.path) + 1;
});

onMounted(() => {
  nuxtApp.$setColor(page?.meta?.color);
  nuxtApp.$reveal(scrollContainer.value);

  // Update counter data for the layout component
  counterData.value = {
    highlights: page?.meta?.highlights || [],
    visit: page?.meta?.visit || '',
    pdp: true,
  };
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
        class="fixed inset-0 lg:main-grid px-contain overflow-y-auto overflow-x-hidden no-scrollbar"
      >
        <div class="col-start-2">
          <div class="pdp-fade-up">
            <div
              class="h-svh py-contain grid items-center"
              :class="{ 'a-fi blur-md': !fromHome }"
            >
              <nx-hero :data="page" heading-level="h1" pdp></nx-hero>
            </div>

            <div class="pdp-img-fade-up lg:pb-contain">
              <div class="space-y-contain">
                <div
                  v-for="(entry, index) in page.meta.items"
                  :key="index"
                  class="perspective-[32vw]"
                >
                  <nx-image
                    v-if="
                      entry.src?.includes('.png') ||
                      entry.src?.includes('.jpg') ||
                      entry.src?.includes('.webp') ||
                      entry.src?.includes('.svg')
                    "
                    :src="entry.src"
                    :alt="entry.alt"
                    :image-class="`w-full h-auto ${entry.rounded === false ? '' : 'rounded-2xl'}`"
                    sizes="(min-width: 56rem) 60vw, 80vw"
                    :srcset="[320, 640, 1280, 1600, 2200]"
                    class="blur-sm transform-[rotate3d(1,0,0,6deg)]"
                    data-reveal-trigger
                    data-reveal
                    :preload="index === 0"
                  ></nx-image>

                  <nx-video
                    v-if="entry.src?.includes('.mp4')"
                    :src="entry.src?.replace(/\.(mp4)$/, '')"
                    class="blur-sm transform-[rotate3d(1,0,0,6deg)]"
                    data-reveal-trigger
                    data-reveal
                  ></nx-video>

                  <nx-content
                    v-if="entry.copy"
                    :content="entry.copy"
                    class="blur-sm transform-[rotate3d(1,0,0,9deg)]"
                    data-reveal-trigger
                    data-reveal
                  ></nx-content>
                </div>
              </div>

              <div class="pt-12 lg:hidden perspective-[32vw]">
                <nx-highlights
                  :highlights="page.meta.highlights || []"
                  :visit="page.meta.visit"
                  class="blur-sm transform-[rotate3d(1,0,0,6deg)]"
                  data-reveal-trigger
                  data-reveal
                ></nx-highlights>
              </div>
            </div>

            <nx-next :project="nextProject" :root="scrollContainer"></nx-next>
          </div>
        </div>
      </div>

      <nx-description v-if="fromHome"></nx-description>
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
