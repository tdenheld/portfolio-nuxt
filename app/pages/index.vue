<script setup>
const page = await queryCollection('content').path('/').first();
</script>

<template>
  <div>
    <nx-meta-tags></nx-meta-tags>

    <div class="lg:main-grid fixed p-contain inset-0">
      <div class="col-start-2 h-full">
        <div
          class="invisible lg:visible absolute top-[calc(var(--spacing-contain)+14px)] font-mono text-[10px] text-fg-secondary tracking-wider"
        >
          Netherlands, <nx-time></nx-time>
        </div>

        <div class="h-full grid items-center">
          <div class="pb-12">
            <p class="font-serif text-xl md:text-[28px] text-fg-secondary">
              {{ page.meta.name }}
            </p>

            <h1
              class="mt-1 font-semibold text-[calc(24px+4.5vw)] leading-[1.1] font-display max-w-[18ch]"
            >
              {{ page.title }}
            </h1>

            <p class="mt-5 text-fg-secondary text-lg max-w-[32ch] leading-[1.4]">
              NS is the leading railway company of the Netherlands.
            </p>

            <div class="mt-8">
              <nuxt-link to="/projects" class="button">Explore</nuxt-link>
            </div>
          </div>
        </div>

        <p class="absolute bottom-contain text-sm w-[280px] text-fg-secondary">
          {{ page.description }}
        </p>
      </div>
    </div>
  </div>
</template>
