<script setup>
import { Gradient } from '../scripts/gradientMesh.js';

const gradient = ref(null);

const initGradient = () => {
  if (gradient.value) {
    gradient.value.disconnect();
  }
  gradient.value = new Gradient();
  gradient.value.initGradient('#gradient-canvas');
};

onMounted(() => {
  initGradient();

  // Watch for style attribute changes on document.documentElement
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        initGradient();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style'],
  });
});
</script>

<template>
  <div class="fixed inset-0 pointer-events-none">
    <canvas
      id="gradient-canvas"
      class="absolute inset-0 size-full"
      :style="{
        '--gradient-color-1': 'var(--color-bg-primary)',
        '--gradient-color-2': 'var(--color-bg-tertiary)',
        '--gradient-color-3': 'var(--color-bg-secondary)',
      }"
    />
  </div>
</template>

<style scoped lang="postcss"></style>
