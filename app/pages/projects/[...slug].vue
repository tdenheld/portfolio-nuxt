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

      <div class="h-[100svh] main-grid p-contain">
        <div class="col-start-2 h-full grid items-center">
          <nx-hero :data="page" heading-level="h1" pdp></nx-hero>
        </div>
      </div>
    </div>

    <div v-else>
      <nx-error></nx-error>
    </div>
  </div>
</template>
