<script setup>
const data = await queryCollection('content').path('/global').first();
</script>

<template>
  <nav class="fixed inset-x-0 z-navigation pt-contain px-contain lg:main-grid">
    <nx-logo></nx-logo>

    <div class="hidden lg:block col-start-2 relative top-1">
      <p
        class="font-mono text-[10px] text-fg-secondary tracking-wider transition-clr"
      >
        Netherlands, <nx-time></nx-time>
      </p>
    </div>

    <ul
      class="absolute top-contain lg:top-[calc(var(--spacing-contain)+16px)] right-contain text-[10px] md:text-xs text-fg-secondary uppercase tracking-[0.16em] justify-end flex items-center gap-6 md:gap-12"
    >
      <li v-for="entry in data.meta.nav" :key="entry.url">
        <nuxt-link class="link" :to="entry.url"
          ><span>{{ entry.name }}</span></nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>
