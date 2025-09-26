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
    <div class="grid place-content-center size-20 bg-[#3c796b] rounded-xl">
      <svg-logo class="w-10 text-preloader-fg pb-1"></svg-logo>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.s-preloader {
  position: fixed;
  inset: 0;
  background-color: var(--color-preloader-bg);
  z-index: 999;
  pointer-events: none;
  display: grid;
  place-content: center;

  animation-fill-mode: both;
  animation-timing-function: var(--ease-in-out-expo);
  animation-delay: 200ms;
  animation-duration: 800ms;
  animation-name: fade-out;
}

@keyframes fade-out {
  to {
    transform: translateY(-100%);
  }
}
</style>
