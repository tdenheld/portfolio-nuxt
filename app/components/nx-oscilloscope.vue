<script setup lang="ts">
const lineCount = ref(7);
const sineRef = ref<SVGPathElement | null>(null);
const sineRef2 = ref<SVGPathElement | null>(null);
const animations: Animation[] = [];

const setLineCount = () => {
  requestAnimationFrame(() => {
    lineCount.value = window.innerWidth >= 980 ? 9 : 7;
  });
};

const buildPath = (periods: number) => {
  const width = 1800;
  const height = 200;
  const amplitude = height * 0.35;
  const cy = height / 2;
  const steps = 450;

  let d = `M 0 ${cy}`;
  for (let i = 1; i <= steps; i++) {
    const x = (i / steps) * width;
    const y = cy - amplitude * Math.sin((i / steps) * periods * 2 * Math.PI);
    d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
};

// Precompute path keyframes for SMIL morph
// Use more keyframes for a smoother cycle
const lfoSteps = [6, 5.25, 4.5, 5.25, 6, 7, 8, 7, 6];
const lfoValues = lfoSteps.map((p) => buildPath(p)).join(';');
const lfoKeyTimes = lfoSteps.map((_, i) => (i / (lfoSteps.length - 1)).toFixed(3)).join(';');
const lfoKeySplines = Array(lfoSteps.length - 1)
  .fill('0.4 0 0.6 1')
  .join(';');

const sinePath = buildPath(6);

onMounted(() => {
  setLineCount();
  window.addEventListener('resize', setLineCount);

  // Animate first layer scroll
  if (sineRef.value) {
    animations.push(
      sineRef.value.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-600px)' },
        ],
        { duration: 6000, iterations: Infinity, easing: 'linear' },
      ),
    );
  }

  // Animate second layer scroll — faster
  if (sineRef2.value) {
    animations.push(
      sineRef2.value.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-600px)' },
        ],
        { duration: 3600, iterations: Infinity, easing: 'linear' },
      ),
    );
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', setLineCount);
  animations.forEach((a) => a.cancel());
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
        <!-- Second layer: faster, dimmer -->
        <path
          ref="sineRef2"
          :d="sinePath"
          fill="none"
          stroke="var(--color-fg-primary)"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
          opacity="0.25"
        >
          <animate
            attributeName="d"
            :values="lfoValues"
            :keyTimes="lfoKeyTimes"
            :keySplines="lfoKeySplines"
            calcMode="spline"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
        <!-- First layer -->
        <path
          ref="sineRef"
          :d="sinePath"
          fill="none"
          stroke="var(--color-fg-primary)"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        >
          <animate
            attributeName="d"
            :values="lfoValues"
            :keyTimes="lfoKeyTimes"
            :keySplines="lfoKeySplines"
            calcMode="spline"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  </div>
</template>


