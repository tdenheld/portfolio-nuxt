<script setup lang="ts">
const nuxtApp: any = useNuxtApp();

onMounted(() => {
  nuxtApp.$reveal();
});
</script>

<template>
  <nuxt-layout>
    <nuxt-page></nuxt-page>
  </nuxt-layout>
</template>
