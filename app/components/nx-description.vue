<script setup lang="ts">
const page = await queryCollection('content').path('/').first();

const props = defineProps<{
  isActive?: boolean;
}>();
</script>

<template>
  <div class="fixed inset-x-0 bottom-contain px-contain lg:main-grid z-raised">
    <div class="col-start-2 h-full">
      <div class="inline-block origin-top" :class="{ 'd-fade-out': !isActive }">
        <p
          class="text-[0.625rem] sm:text-xs lg:text-sm w-[30ch] text-fg-secondary transition-clr"
        >
          {{ page?.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.d-fade-out {
  animation-duration: 2s;
  animation-fill-mode: both;
  animation-timing-function: var(--ease-out);
  animation-name: d-fade-out;
  animation-delay: 50ms;
}

@keyframes d-fade-out {
  to {
    opacity: 0;
    filter: blur(4px);
    transform: scale(1.15);
  }
}
</style>
