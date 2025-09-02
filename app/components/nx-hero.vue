<script setup>
const props = defineProps({
  data: Object,
});
</script>

<template>
  <div class="p-contain fixed inset-0 main-grid">

    <div class="col-start-2 pb-4">
      <h1 class="font-semibold text-[calc(24px+4.5vw)] leading-[1.1] font-display max-w-[18ch]">
        {{ props.data.title }}
      </h1>
    </div>

  </div>

  <div class="p-contain fixed bottom-0 inset-x-0 main-grid">
    <p class="col-start-2 text-sm w-[280px] text-fg-secondary">{{ props.data.description }}</p>
  </div>
</template>
