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
      class="text-fg-primary transition-clr link before:size-15 before:-top-2.5 before:-left-3.5"
      aria-label="Home page"
    >
      <svg-logo class="w-8"></svg-logo>
    </nuxt-link>

    <button
      v-else
      aria-label="Scroll to top"
      @click="scrollToTop"
      class="text-fg-primary transition-clr link before:size-15 before:-top-2.5 before:-left-3.5"
    >
      <svg-logo class="w-8"></svg-logo>
    </button>
  </div>
</template>
