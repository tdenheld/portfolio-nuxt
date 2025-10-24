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

      <div class="col-start-2 col-span-2">
        <div class="about-grid">
          <nx-image
            :src="page.meta.image"
            :alt="page.title"
            class="overflow-hidden rounded-4xl aspect-square"
            sizes="(min-width: 90rem) 32rem, (min-width: 61.25rem) 33vw, (min-width: 46.25rem) 40vw, 80vw"
            :srcset="[320, 640, 1280]"
            preload
          ></nx-image>

          <div class="relative mt-8 md:mt-0 md:-ml-12 lg:-ml-16">
            <p class="max-w-[38ch] text-fg-secondary text-base md:text-lg xl:text-xl">
              {{ page.description }}
            </p>
          </div>
        </div>

        <div class="mt-16 about-grid">
          <div class="col-start-2 relative mt-8 md:mt-0 md:-ml-12 lg:-ml-16">
            <h2 class="font-mono text-xs uppercase tracking-widest">Experience</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
