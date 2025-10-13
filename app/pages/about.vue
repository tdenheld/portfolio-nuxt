<script setup>
const page = await queryCollection('content').path('/about').first();
const nuxtApp = useNuxtApp();

onMounted(() => {
  nuxtApp.$setColor(page?.meta?.color);
});
</script>

<template>
  <div v-if="page">
    <nx-meta-tags :title="page.title" :description="page.description"></nx-meta-tags>

    <div class="pt-32 lg:pt-64 px-contain lg:main-grid">
      <h1 class="sr-only">{{ page.title }}</h1>

      <div class="col-start-2 md:flex md:items-center">
        <nx-image
          :src="page.meta.image"
          :alt="page.title"
          class="overflow-hidden rounded-4xl max-w-md grow"
          sizes="33vw"
          :srcset="[320, 640, 1280]"
        ></nx-image>

        <p class="relative mt-8 lg:mt-0 lg:-ml-16 max-w-sm text-fg-secondary text-lg md:text-xl">
          {{ page.description }}
        </p>
      </div>
    </div>
  </div>
</template>
