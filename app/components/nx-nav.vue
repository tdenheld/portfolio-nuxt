<script setup>
const data = await queryCollection('pages').path('/global').first();
</script>

<template>
  <header class="fixed inset-x-0 z-navigation pt-contain px-contain lg:main-grid">
    <nx-logo></nx-logo>

    <div class="hidden lg:block col-start-2 relative top-1">
      <p
        class="font-mono text-[10px] text-fg-secondary tracking-wider transition-clr"
      >
        Netherlands, <nx-time></nx-time>
      </p>
    </div>

    <ul
      class="absolute top-contain lg:top-[calc(var(--spacing-contain)+16px)] right-contain text-[10px] md:text-xs text-fg-secondary transition-clr uppercase tracking-[0.16em] justify-end flex items-center gap-6 md:gap-12"
    >
      <li v-for="entry in data?.nav" :key="entry.url">
        <nuxt-link class="link" :to="entry.url"
          ><span class="nav-label">{{ entry.name }}</span></nuxt-link
        >
      </li>
    </ul>
  </header>
</template>

<style scoped lang="postcss">
.nav-label {
  &:before {
    content: '';
    position: absolute;
    bottom: calc(var(--spacing) * -1.5);
    width: calc(var(--spacing) * 4);
    border-bottom: 1px solid color-mix(in oklab, currentColor 70%, transparent);
    opacity: 0;
    scale: 0 1;
    transform-origin: left;
    transition-property: opacity, scale;
    transition-duration: 600ms;
    transition-timing-function: var(--default-transition-timing-function);
  }

  [aria-current='page'] > &:before {
    opacity: 1;
    scale: none;
  }

  @media (hover: hover) {
    [aria-current='page']:hover > &:before {
      opacity: 0;
      scale: 0 1;
    }
  }
}
</style>
