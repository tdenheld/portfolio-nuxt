<script setup>
const props = defineProps({
  data: Object,
});
</script>

<template>
  <div class="lg:main-grid fixed p-contain inset-0">
    <div class="col-start-2 h-full grid grid-rows-[max-content_1fr_max-content]">
      <div class="invisible lg:visible relative top-3.5 font-mono text-[10px] text-fg-secondary tracking-wider">
        Netherlands, <nx-time></nx-time>
      </div>

      <div class="grid items-center">
        <h1
          class="font-semibold text-[calc(24px+4.5vw)] leading-[1.1] font-display max-w-[18ch]"
        >
          {{ props.data.title }}
        </h1>
      </div>

      <p class="text-sm w-[280px] text-fg-secondary">
        {{ props.data.description }}
      </p>
    </div>
  </div>
</template>
