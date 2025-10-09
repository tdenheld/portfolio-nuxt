<script setup>
const fps = ref(0);
const showFps = ref(false);
const showBlobs = ref(true);

const calculateFps = () => {
  fps.value = 1;
  const times = [];

  const fpsLoop = (timestamp) => {
    while (times.length > 0 && times[0] <= timestamp - 1000) {
      times.shift();
    }

    times.push(timestamp);
    fps.value = times.length;

    showBlobs.value = fps.value >= 52;

    requestAnimationFrame(fpsLoop);
  };

  requestAnimationFrame(fpsLoop);
};

onMounted(() => {
  calculateFps();
});
</script>

<template>
  <div>
    <div v-if="showBlobs" class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="blob blob--1"></div>
      <div class="blob blob--2"></div>
    </div>

    <div v-if="showFps" class="font-mono text-[10px] fixed top-0.5 left-1">
      {{ fps }}
    </div>

    <div
      class="fixed bottom-0 left-0 p-6 z-navigation"
      @click="
        showFps = !showFps;
        calculateFps();
      "
    ></div>
  </div>
</template>
