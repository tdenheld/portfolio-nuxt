<script setup>
const props = defineProps({
  data: Object,
});
</script>

<template>
  <div class="contain fixed inset-0 grid items-center ml-[16vw]">
    <div class="pb-4">
      <h1 class="font-semibold text-[calc(16px+5vw)] leading-[1.1] font-display max-w-[18ch]">
        {{ props.data.title }}
      </h1>
    </div>
  </div>

  <div class="contain fixed bottom-0 ml-[16vw]">
    <p class="text-sm w-[280px] text-fg-secondary">{{ props.data.description }}</p>
  </div>
</template>
