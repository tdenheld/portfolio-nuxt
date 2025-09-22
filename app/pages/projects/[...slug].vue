<script setup>
const route = useRoute();
const page = await queryCollection('projects').path(route.path).first();
const nuxtApp = useNuxtApp();

// Set colors on document element when component mounts
onMounted(() => {
  nuxtApp.$setColor(page?.meta?.color);
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

      <div class="fixed inset-0 main-grid px-contain overflow-y-auto no-scrollbar">
        <div class="col-start-2">
          <div class="h-[100svh] py-contain grid items-center">
            <nx-hero :data="page" heading-level="h1" pdp></nx-hero>
          </div>

          <div class="-mt-28 md:-mt-64 pb-16 space-y-contain a a-fi">
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

    <div v-else>
      <nx-error></nx-error>
    </div>
  </div>
</template>
