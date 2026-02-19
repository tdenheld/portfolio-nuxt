<script setup>
const projects = await queryCollection('projects').all();
const nuxtApp = useNuxtApp();

onMounted(() => {
  nuxtApp.$setColor();
});
</script>

<template>
  <div>
    <nx-meta-tags title="Projects"></nx-meta-tags>

    <h1 class="sr-only">Selected Work</h1>

    <div class="s-carousel no-scrollbar">
      <div class="grid justify-center py-32">
        <div class="grid grid-cols-2 gap-x-[12vw] gap-y-16">
          <nuxt-link v-for="entry in projects" :key="entry.title" :to="entry.path" class="even:mt-56">
            <h2>
              {{ entry.title }}
            </h2>
            <nx-image
              :src="entry.meta.image"
              alt=""
              image-class="w-[15rem] aspect-[5/3] rounded-lg object-cover"
              sizes="15rem"
              :srcset="[320, 640, 1280, 1600]"
              :preload="true"
            ></nx-image>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.s-carousel {
  position: fixed;
  inset: 0;
  padding: var(--spacing-contain);
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
