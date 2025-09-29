<script setup lang="ts"></script>

<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div class="gradient-1"></div>
  </div>
</template>

<style scoped lang="postcss">
.gradient-1 {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 20% 50% at 30% 50%,
    var(--color-bg-secondary) 0%,
    transparent 100%
  );
}
</style>
