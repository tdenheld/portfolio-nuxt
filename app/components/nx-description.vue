<script setup lang="ts">
const page = await queryCollection('content').path('/').first();

const props = defineProps<{
  isActive: boolean;
}>();
</script>

<template>
  <div class="fixed inset-x-0 bottom-contain px-contain lg:main-grid z-raised">
    <div class="col-start-2 h-full">
      <div
        class="inline-block transition duration-1500 origin-top"
        :class="{ 'opacity-0 blur-lg scale-110': !isActive }"
      >
        <p
          class="text-[0.625rem] sm:text-xs lg:text-sm w-[32ch] text-fg-secondary transition-fg"
        >
          {{ page?.description }}
        </p>
      </div>
    </div>
  </div>
</template>
