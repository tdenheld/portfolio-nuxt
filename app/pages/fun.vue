<script setup>
const page = await queryCollection('pages').path('/fun').first();
const hostElement = ref(null);
const scrollContainer = ref(null);
const smoothContent = ref(null);

useSmoothParallax({
  host: hostElement,
  scroller: scrollContainer,
  content: smoothContent,
  minimumScrollDistance: 200,
});

usePageColor(() => page.color);
</script>

<template>
  <div ref="hostElement">
    <div
      ref="scrollContainer"
      :data-project-scroller="page.path"
      class="fixed inset-0 p-contain overflow-y-auto overflow-x-hidden no-scrollbar"
    >
      <div ref="smoothContent" class="lg:main-grid">
        <div
          class="pt-[calc(3vw+6rem)] pb-[calc(4vw+10rem)] col-start-2"
          data-project-scroll-content
        >
          <h1 class="sr-only">{{ page.title }}</h1>

          <div>
            <ul>
              <li
                v-for="(item, index) in page.links"
                :key="item.url"
                :data-parallax="
                  0.3 * (1 - index / Math.max(page.links.length - 1, 1))
                "
              >
                <div
                  class="a-ti translate-x-8 blur-md"
                  :style="{ animationDelay: `${100 + index * 100}ms` }"
                >
                  <a
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-[calc(3.3vw+1.5rem)] font-bold inline-block py-6 lg:py-8 leading-none transition hover:text-fg-secondary"
                    >{{ item.label }}</a
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <nx-counter
      :index="0"
      :length="0"
      label="Side Projects & Experiments"
      hide-index
      pdp
    ></nx-counter>
  </div>
</template>
