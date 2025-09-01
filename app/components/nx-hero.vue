<script setup>
const props = defineProps({
  data: Object,
});
</script>

<template>
  <div class="contain fixed inset-0 grid items-center ml-[16vw]">
    <div class="pb-4 max-w-4xl">
      <h1 class="font-semibold text-3xl md:text-5xl xl:text-8xl font-display">
        {{ props.data.title }}
      </h1>
    </div>
  </div>

  <div class="contain fixed bottom-0 ml-[16vw]">
    <p class="text-sm w-[280px] text-fg-secondary">{{ props.data.description }}</p>
  </div>
</template>
