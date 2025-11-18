<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const page = await queryCollection('content').path('/about').first();
const nuxtApp = useNuxtApp();
const scrollContainer = ref(null);

onMounted(() => {
  nuxtApp.$setColor(page?.meta?.color);
  nuxtApp.$reveal(scrollContainer.value);

  if (!nuxtApp.$isTouchDevice()) {
    ScrollSmoother.create({
      smooth: 0.8,
    });
  }

  document.querySelectorAll('[data-parallax]').forEach((el) => {
    // Disable on small devices
    if (innerWidth < 740) return;

    gsap.to(el, {
      scrollTrigger: {
        scrub: 1,
        scroller: scrollContainer.value,
      },
      y: (index, target) =>
        -ScrollTrigger.maxScroll(scrollContainer.value) * target.dataset.parallax,
      ease: 'none',
    });
  });
});
</script>

<template>
  <div>
    <nx-meta-tags :title="page.title" :description="page.description"></nx-meta-tags>

    <div
      ref="scrollContainer"
      class="fixed inset-0 overflow-y-auto overflow-x-hidden no-scrollbar"
      id="smooth-wrapper"
    >
      <div class="pt-32 lg:pt-64 px-contain lg:main-grid" id="smooth-content">
        <h1 class="sr-only">{{ page.title }}</h1>

        <div class="col-start-2 col-span-2">
          <div class="about-grid">
            <div
              class="md:order-last relative z-raised mb-8 md:mb-0 md:-ml-12 lg:-ml-16 a-fi blur-lg md:[animation-delay:200ms]"
            >
              <p
                data-parallax="0.1"
                class="max-w-[45ch] text-fg-secondary text-lg xl:text-[calc(16px+0.3vw)]"
              >
                {{ page.description }}
              </p>
            </div>

            <div class="perspective-[32vw]" data-parallax="0.3">
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
            class="pt-12 pb-14 md:py-24 about-grid items-start a-fi [animation-delay:250ms]"
          >
            <div class="relative space-y-12">
              <div v-for="entry in page.meta.data" class="blur-sm" data-reveal data-reveal-trigger>
                <h2 class="eyebrow">{{ entry.title }}</h2>

                <p class="mt-3 pr-16 md:pr-32 max-w-[48ch] text-fg-secondary text-sm">
                  <template v-for="(item, index) in entry.items" :key="item">
                    {{ item
                    }}<template v-if="index < entry.items.length - 1"
                      >,
                    </template>
                  </template>
                </p>
              </div>
            </div>

            <div
              class="relative max-md:mt-12 md:-ml-12 lg:-ml-16"
              data-parallax="0.15"
            >
              <div class="blur-sm" data-reveal data-reveal-trigger>
                <h2 class="eyebrow">Experience</h2>

                <div class="mt-3 space-y-4">
                  <div v-for="entry in page.meta.experience" :key="entry.title">
                    <h3 class="text-fg-secondary text-sm">
                      {{ entry.title }}
                      <span class="whitespace-nowrap">({{ entry.period }})</span>
                    </h3>

                    <ul>
                      <li
                        class="text-[11px] font-mono italic tracking-tight mt-0.5"
                        v-for="role in entry.roles"
                        :key="role"
                      >
                        {{ role }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="mt-12 md:mt-14 blur-sm" data-reveal data-reveal-trigger>
                <h2 class="eyebrow">Links</h2>

                <div class="mt-3">
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

          <footer
            class="pb-contain font-mono text-[10px] text-fg-secondary tracking-wider"
          >
            © {{ new Date().getFullYear() }} — {{ page.title.replace('About ', '') }}
          </footer>
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
