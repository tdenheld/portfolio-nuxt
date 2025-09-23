<script setup>
const x = ref(0);
const y = ref(0);
const isTouchDevice = ref(false);

const moveMagnet = (event) => {
  if (isTouchDevice.value) return;

  const STRENGTH = 48;
  const btn = event.currentTarget;
  const bounding = btn.getBoundingClientRect();

  requestAnimationFrame(() => {
    x.value = ((event.clientX - bounding.left) / btn.offsetWidth - 0.5) * STRENGTH;
    y.value = ((event.clientY - bounding.top) / btn.offsetHeight - 0.5) * STRENGTH;
  });
};

const resetMagnet = () => {
  if (isTouchDevice.value) return;

  requestAnimationFrame(() => {
    x.value = 0;
    y.value = 0;
  });
};

onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
});
</script>

<template>
  <span
    class="inline-block"
    :class="{ 'p-10 -m-10 rounded-[50%]': !isTouchDevice }"
    @mousemove="moveMagnet($event)"
    @mouseout="resetMagnet()"
  >
    <span
      class="inline-block transition duration-600"
      :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    >
      <span class="button group-focus-visible:focus-ring-md">
        <slot></slot>
      </span>
    </span>
  </span>
</template>
