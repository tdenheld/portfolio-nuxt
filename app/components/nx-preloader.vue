<script setup lang="ts">
import svgLogo from '../assets/images/logo.svg?component';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<template>
  <div v-if="isLoading" class="s-preloader">
    <svg-logo class="w-12 text-[#cdd388]"></svg-logo>
  </div>
</template>

<style scoped lang="postcss">
.s-preloader {
  position: fixed;
  inset: 0;
  background-color: #3c796b;
  z-index: 999;
  pointer-events: none;
  display: grid;
  place-content: center;

  animation-fill-mode: both;
  animation-timing-function: theme('transitionTimingFunction.DEFAULT');
  animation-delay: 500ms;
  animation-duration: 500ms;
  animation-name: fade-out;
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}
</style>
