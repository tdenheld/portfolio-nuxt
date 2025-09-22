<script setup lang="ts">
const props = defineProps<{
  description?: string;
}>();
</script>

<template>
  <div class="fixed inset-x-0 bottom-contain px-contain main-grid z-raised">
    <div class="col-start-2 h-full">
      <p
        class="text-[0.625rem] sm:text-xs lg:text-sm w-[32ch] text-fg-secondary transition-fg"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
