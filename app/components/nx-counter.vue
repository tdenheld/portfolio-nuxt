<script setup lang="ts">
const props = defineProps<{
  index: number;
  length: number;
  images?: string[];
  isFadingOut?: boolean;
  pdp?: boolean;
}>();
</script>

<template>
  <div class="fixed bottom-contain right-contain">
    <div class="flex justify-between text-fg-primary text-xs font-mono text-right">
      <p class="hidden md:block uppercase tracking-[0.16em]">Work item</p>
      <p class="grow text-right">{{ index }} / {{ length - 1 }}</p>
    </div>

    <nx-thumb
      :images="images"
      :index="index"
      class="mt-2"
      :is-fading-out="isFadingOut"
      :pdp="pdp"
    ></nx-thumb>
  </div>
</template>

<style scoped lang="postcss"></style>
