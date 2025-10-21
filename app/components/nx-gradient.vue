<script setup>
import { Gradient } from '../scripts/gradientMesh.js';

const gradient = new Gradient();

const initGradient = () => {
  gradient.initGradient('#gradient-canvas');
};

onMounted(() => {
  initGradient();
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
