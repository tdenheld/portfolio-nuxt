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

const sinePath = computed(() => {
  const width = 1200;
  const height = 200;
  const amplitude = height * 0.35;
  const cy = height / 2;
  const steps = 400;
  const periods = 6;

  let d = `M 0 ${cy}`;
  for (let i = 1; i <= steps; i++) {
    const x = (i / steps) * width;
    const y = cy - amplitude * Math.sin((i / steps) * periods * 2 * Math.PI);
    d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
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

    <svg
      class="absolute inset-0 size-full overflow-hidden"
      viewBox="0 0 600 200"
      preserveAspectRatio="none"
    >
      <defs>
        <clipPath id="oscilloscope-clip">
          <rect x="0" y="0" width="600" height="200" />
        </clipPath>
      </defs>
      <g clip-path="url(#oscilloscope-clip)">
        <path
          class="sine-wave"
          :d="sinePath"
          fill="none"
          stroke="var(--color-fg-primary)"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.sine-wave {
  animation: scroll-sine 4s linear infinite;
}

@keyframes scroll-sine {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-600px);
  }
}
</style>


