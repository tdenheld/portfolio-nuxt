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

      <div class="fixed inset-0 main-grid p-contain overflow-y-auto">
        <div class="col-start-2 h-full">
          <div class="h-full grid items-center">
            <nx-hero :data="page" heading-level="h1" pdp></nx-hero>
          </div>

          <div class="-mt-28 space-y-6 a a-fi pb-16">
            <nx-image
              v-for="entry in page.meta.items"
              :src="entry.src"
              :alt="entry.alt"
              class="rounded-2xl overflow-hidden"
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
