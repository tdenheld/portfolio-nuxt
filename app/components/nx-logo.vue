<script setup>
import svgLogo from '../assets/images/logo.svg?component';
const route = useRoute();

const scrollToTop = () => {
  const carousel = document.querySelector('[data-scroller-carousel]');
  carousel.scrollTo({ top: 0 });
};
</script>

<template>
  <div>
    <nuxt-link
      v-if="route.path !== '/'"
      to="/"
      class="inline-block text-fg-secondary transition-fg before:absolute before:-inset-2"
      aria-label="Home page"
    >
      <svg-logo class="w-8"></svg-logo>
    </nuxt-link>

    <button
      v-else
      aria-label="Scroll to top"
      @click="scrollToTop"
      class="before:absolute before:-inset-2"
    >
      <svg-logo class="w-8"></svg-logo>
    </button>
  </div>
</template>
