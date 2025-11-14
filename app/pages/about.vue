<script setup>
const page = await queryCollection('content').path('/about').first();
const nuxtApp = useNuxtApp();
const scrollContainer = ref(null);

onMounted(() => {
  nuxtApp.$setColor(page?.meta?.color);
  nuxtApp.$reveal(scrollContainer.value);
});
</script>

<template>
  <div>
    <nx-meta-tags :title="page.title" :description="page.description"></nx-meta-tags>

    <div ref="scrollContainer" class="fixed inset-0 overflow-y-auto no-scrollbar">
      <div class="pt-32 lg:pt-64 px-contain lg:main-grid">
        <h1 class="sr-only">{{ page.title }}</h1>

        <div class="col-start-2 col-span-2">
          <div class="about-grid">
            <div
              class="md:order-last relative z-raised mb-8 md:mb-0 md:-ml-12 lg:-ml-16 a-fi blur-lg md:[animation-delay:200ms]"
            >
              <p
                class="max-w-[38ch] text-fg-secondary text-lg xl:text-[calc(16px+0.3vw)]"
              >
                {{ page.description }}
              </p>
            </div>

            <div class="perspective-[32vw]">
              <div class="about-image">
                <nx-image
                  :src="page.meta.image"
                  :alt="page.title"
                  class="max-w-md md:max-w-[initial] overflow-hidden rounded-4xl aspect-square"
                  sizes="(min-width: 90rem) 32rem, (min-width: 61.25rem) 33vw, (min-width: 46.25rem) 40vw, 80vw"
                  :srcset="[320, 640, 1280]"
                  preload
                ></nx-image>
              </div>
            </div>
          </div>

          <div
            class="mt-12 mb-14 md:my-24 about-grid items-start a-fi [animation-delay:250ms]"
          >
            <div class="relative mt-8 md:mt-0">
              <div class="blur-sm" data-reveal data-reveal-trigger>
                <h2 class="font-mono text-xs uppercase tracking-[0.16em]">Brands</h2>

                <p class="mt-4 pr-32 max-w-[48ch] text-fg-secondary text-sm">
                  <template v-for="(item, index) in page.meta.brands" :key="item">
                    {{ item
                    }}<template v-if="index < page.meta.brands.length - 1"
                      >,
                    </template>
                  </template>
                </p>
              </div>

              <div class="mt-12 blur-sm" data-reveal data-reveal-trigger>
                <h2 class="font-mono text-xs uppercase tracking-[0.16em]">
                  Coverage
                </h2>

                <p class="mt-4 pr-32 max-w-[48ch] text-fg-secondary text-sm">
                  <template v-for="(item, index) in page.meta.coverage" :key="item">
                    {{ item
                    }}<template v-if="index < page.meta.coverage.length - 1"
                      >,
                    </template>
                  </template>
                </p>
              </div>
            </div>

            <div class="relative mt-12 md:mt-0 md:-ml-12 lg:-ml-16">
              <div class="blur-sm" data-reveal data-reveal-trigger>
                <h2 class="font-mono text-xs uppercase tracking-[0.16em]">
                  Experience
                </h2>
                <div class="mt-4 space-y-5">
                  <div v-for="entry in page.meta.experience" :key="entry.title">
                    <h3 class="text-fg-secondary text-sm">
                      {{ entry.title }}
                      <span class="whitespace-nowrap">({{ entry.period }})</span>
                    </h3>

                    <ul>
                      <li
                        class="text-xs font-mono italic mt-0.5"
                        v-for="role in entry.roles"
                        :key="role"
                      >
                        {{ role }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="mt-12 blur-sm" data-reveal data-reveal-trigger>
                <h2 class="font-mono text-xs uppercase tracking-[0.16em]">Links</h2>

                <div class="mt-3.5">
                  <ul>
                    <li
                      class="text-fg-secondary text-sm"
                      v-for="entry in page.meta.links"
                      :key="entry.label"
                    >
                      <a
                        :href="entry.url"
                        target="_blank"
                        rel="noreferrer"
                        class="inline-block py-0.5 hover:underline underline-offset-2"
                        >{{ entry.label }}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.about-image {
  animation-duration: 1500ms;
  animation-fill-mode: both;
  animation-timing-function: var(--ease-out);
  animation-name: about-image;
  animation-delay: 100ms;
}

@keyframes about-image {
  0% {
    opacity: 0;
    filter: blur(8px);
    transform: rotate3d(1, 0, 0, 6deg);
  }
  100% {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>
