<script setup>
const page = await queryCollection('content').path('/about').first();
const nuxtApp = useNuxtApp();

onMounted(() => {
  nuxtApp.$setColor(page?.meta?.color);
});
</script>

<template>
  <div>
    <nx-meta-tags :title="page.title" :description="page.description"></nx-meta-tags>

    <div class="fixed inset-0 overflow-y-auto no-scrollbar">
      <div class="pt-32 lg:pt-64 px-contain lg:main-grid">
        <h1 class="sr-only">{{ page.title }}</h1>

        <div class="col-start-2 col-span-2">
          <div class="about-grid">
            <div class="md:order-last relative mb-8 md:mb-0 md:-ml-12 lg:-ml-16">
              <p class="max-w-[38ch] text-fg-secondary text-lg xl:text-xl">
                {{ page.description }}
              </p>
            </div>

            <nx-image
              :src="page.meta.image"
              :alt="page.title"
              class="max-w-md md:max-w-[initial] overflow-hidden rounded-4xl aspect-square"
              sizes="(min-width: 90rem) 32rem, (min-width: 61.25rem) 33vw, (min-width: 46.25rem) 40vw, 80vw"
              :srcset="[320, 640, 1280]"
              preload
            ></nx-image>
          </div>

          <div class="mt-12 mb-14 md:my-24 about-grid items-start">
            <div class="relative mt-8 md:mt-0">
              <div>
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

              <div class="mt-12">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
