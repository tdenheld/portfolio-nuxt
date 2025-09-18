<script setup lang="ts">
const lineCount = ref(7);

const setLineCount = () => {
  requestAnimationFrame(() => {
    lineCount.value = window.innerWidth >= 980 ? 9 : 7;
  });
};

onMounted(() => {
  setLineCount();
  window.addEventListener('resize', setLineCount);
});

onUnmounted(() => {
  window.removeEventListener('resize', setLineCount);
});
</script>

<template>
  <div class="relative size-full rounded-lg border border-fg-secondary/25">
    <div
      class="absolute inset-0 flex justify-between"
      v-for="grid in 2"
      :key="grid"
      :class="{ 'flex-col': grid === 1 }"
    >
      <div
        v-for="line in lineCount"
        :key="line"
        class="border-fg-secondary/10 first:invisible last:invisible nth-[4]:border-fg-primary/60 nth-[4]:border-dashed lg:nth-[4]:border-fg-secondary/10 lg:nth-[4]:border-solid lg:nth-[5]:border-fg-primary/60 lg:nth-[5]:border-dashed"
        :class="{ 'border-t': grid === 1, 'border-l': grid === 2 }"
      ></div>
    </div>
  </div>
</template>
