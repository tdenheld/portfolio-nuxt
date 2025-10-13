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

      <div class="col-start-2 col-span-2 md:flex md:items-center">
        <nx-image
          :src="page.meta.image"
          :alt="page.title"
          class="overflow-hidden rounded-4xl md:max-w-md grow"
          sizes="33vw"
          :srcset="[320, 640, 1280]"
          preload
        ></nx-image>

        <p
          class="relative mt-8 md:mt-0 md:-ml-12 lg:-ml-16 max-w-[38ch] text-fg-secondary text-base md:text-lg xl:text-xl"
        >
          {{ page.description }}
        </p>
      </div>
    </div>
  </div>
</template>
