<script setup>
const props = defineProps({
  animation: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div
    class="fixed inset-0 overflow-hidden pointer-events-none"
    :class="{ 'a-fi [animation-duration:3s]': props.animation }"
  >
    <div class="blob blob--1"></div>
    <div class="blob blob--2"></div>
  </div>
</template>
