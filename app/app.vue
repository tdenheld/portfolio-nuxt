<script setup>
const nuxtApp = useNuxtApp();
const isPerformant = useState('isPerformant', () => false);

onBeforeMount(async () => {
  // Only run the performance check if not already set
  if (isPerformant.value === false) {
    isPerformant.value = await nuxtApp.$runPerformanceCheck();
  }
});
</script>

<template>
  <nuxt-layout>
    <nuxt-page></nuxt-page>
  </nuxt-layout>
</template>
