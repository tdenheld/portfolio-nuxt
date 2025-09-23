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

  ScrollSmoother.create({
    smooth: 0.8,
    effects: true, // looks for data-speed and data-lag attr
    smoothTouch: 0.1,
  });
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
          <div class="h-[100svh] py-contain grid items-center">
            <nx-hero :data="page" heading-level="h1" pdp></nx-hero>
          </div>

          <div class="-mt-28 md:-mt-64 pb-16 space-y-contain a a-fi-up">
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

      <nx-counter :index="getCurrentIndex()" :length="getLength()" pdp></nx-counter>
    </div>

    <div v-else>
      <nx-error></nx-error>
    </div>
  </div>
</template>
