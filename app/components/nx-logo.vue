<script setup>
import svgLogo from '../assets/images/logo.svg?component';
</script>

<template>
  <nuxt-link
    to="/"
    class="inline-block text-fg-secondary transition-fg"
    aria-label="Home page"
  >
    <svg-logo class="w-8"></svg-logo>
  </nuxt-link>
</template>
