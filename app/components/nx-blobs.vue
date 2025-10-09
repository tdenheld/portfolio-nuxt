<script setup>
const isPerformant = useState('isPerformant');
</script>

<template>
  <div>
    <div
      v-if="isPerformant"
      class="fixed inset-0 overflow-hidden pointer-events-none a-fi [animation-duration:3s]"
    >
      <div class="blob blob--1"></div>
      <div class="blob blob--2"></div>
    </div>
  </div>
</template>
