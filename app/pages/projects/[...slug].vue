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

      <div class="fixed inset-0 bg-bg-primary"></div>
    </div>

    <div v-else>
      <nx-error></nx-error>
    </div>
  </div>
</template>
