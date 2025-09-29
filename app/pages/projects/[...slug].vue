<script setup>
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

      <div class="fixed inset-0 lg:main-grid px-contain overflow-y-auto no-scrollbar">
        <div class="col-start-2">
          <div class="pdp-fade-up">
            <div class="h-[100svh] py-contain grid items-center">
              <nx-hero :data="page" heading-level="h1" pdp></nx-hero>
            </div>

            <div class="pdp-img-fade-up pb-16 space-y-contain">
              <nx-image
                v-for="entry in page.meta.items"
                :src="entry.src"
                :alt="entry.alt"
                :image-class="'w-full h-auto rounded-2xl'"
                sizes="60vw"
                :srcset="[320, 640, 1280, 2100]"
              ></nx-image>

              <div class="pt-12 lg:hidden">
                <nx-highlights
                  :highlights="page.meta.highlights"
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
        :images="[page.meta.image]"
        :length="getLength()"
        :highlights="page.meta.highlights"
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
  --space-img: calc(-32vh + 3vw);
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
