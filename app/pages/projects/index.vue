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
      <div class="grid justify-center xl:gap-[calc(3vw+3vh)] py-[calc(8vw+4rem)]">
        <div
          class="group grid grid-cols-2"
          v-for="entry in projects"
          :key="entry.title"
        >
          <nuxt-link
            :to="entry.path"
            class="group-odd:col-start-2 flex flex-col-reverse gap-4 lg:gap-6 xl:flex-row group-odd:xl:flex-row-reverse group-odd:justify-self-end group-even:justify-self-start"
          >
            <div
              class="max-w-3xs max-xl:group-odd:ml-[calc(6vw+1rem)] max-xl:group-even:mr-[calc(6vw+1rem)] group-even:xl:text-right relative xl:-top-[3px]"
            >
              <h2 class="font-display text-2xl lg:text-3xl font-[850]">
                {{ entry.title }}
              </h2>

              <p class="mt-2 text-sm text-fg-secondary/70 leading-normal">
                {{ entry.meta.descriptionShort }}
              </p>
            </div>

            <div class="flex items-center group-even:flex-row-reverse">
              <div
                class="border-t shrink-0 border-fg-primary opacity-30 border-dashed w-[calc(6vw+1rem)]"
              ></div>

              <nx-image
                :src="entry.meta.image"
                alt=""
                image-class="w-full aspect-video rounded-lg object-cover"
                sizes="15rem"
                :srcset="[320, 640, 1280, 1600]"
                :preload="true"
              ></nx-image>
            </div>
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

  &:before {
    content: '';
    position: fixed;
    inset-block: 0;
    left: 50%;
    translate: -50% 0;
    pointer-events: none;
    border-left: 1px dashed var(--color-fg-primary);
    opacity: 0.3;
  }
}
</style>
