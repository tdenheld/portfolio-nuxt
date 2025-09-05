<script setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('projects').path(route.path).first();
});
</script>

<template>
  <div>
    <div v-if="page" :value="page">
      <nx-meta-tags
        :title="page.title"
        :description="page.description"
        :image="page.meta.image.src"
      ></nx-meta-tags>
    </div>

    <div v-else>
      <nx-error></nx-error>
    </div>
  </div>
</template>
