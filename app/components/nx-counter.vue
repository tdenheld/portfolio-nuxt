<script setup lang="ts">
import type { Highlight } from '~/interfaces';

const props = defineProps<{
  index: number;
  length: number;
  images?: string[];
  isFadingOut?: boolean;
  pdp?: boolean;
  highlights?: Highlight[];
}>();
</script>

<template>
  <div class="fixed bottom-contain right-contain">
    <nx-highlights v-if="pdp && highlights" :highlights="highlights"></nx-highlights>

    <div class="flex justify-between key text-right">
      <p class="hidden md:block uppercase tracking-[0.16em]">Work item</p>
      <p class="grow text-right tracking-normal">{{ index }} / {{ length - 1 }}</p>
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
