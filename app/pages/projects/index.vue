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

    <div class="s-scroller no-scrollbar">
      <div class="grid justify-center pb-32">
        <div class="grid grid-cols-2 gap-8 lg:gap-16 xl:gap-x-[12vw] gap-y-16">
          <div class="hidden lg:block"></div>

          <nuxt-link
            v-for="entry in projects"
            :key="entry.title"
            :to="entry.path"
            class="flex flex-col-reverse gap-6 group lg:even:mt-48 lg:flex-row lg:even:flex-row-reverse odd:justify-self-end even:justify-self-start"
          >
            <div class="max-w-3xs group-odd:text-right relative lg:-top-[3px]">
              <h2 class="font-display text-3xl font-[850]">
                {{ entry.title }}
              </h2>

              <p class="mt-2 text-sm text-fg-secondary/70 leading-normal">{{ entry.meta.descriptionShort }}</p>
            </div>

            <nx-image
              :src="entry.meta.image"
              alt=""
              image-class="w-[15rem] aspect-[7/4] rounded-lg object-cover"
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
.s-scroller {
  position: fixed;
  inset: 0;
  padding: var(--spacing-contain);
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
