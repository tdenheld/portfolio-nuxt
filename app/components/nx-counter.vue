<script setup lang="ts">
import type { Highlight } from '~/interfaces';

withDefaults(
  defineProps<{
    index: number;
    length: number;
    images?: string[];
    pdp?: boolean;
    highlights?: Highlight[];
    visit?: string;
    label?: string;
    hideIndex?: boolean;
  }>(),
  { label: 'Work item' }
);
</script>

<template>
  <div class="fixed bottom-contain right-contain">
    <nx-highlights
      v-if="pdp && highlights"
      :highlights="highlights"
      :visit="visit"
      animated
      class="mb-12"
    ></nx-highlights>

    <div class="w-min ml-auto">
      <div class="flex justify-between key">
        <p
          class="hidden md:block uppercase tracking-[0.16em]"
          :class="{ 'text-fg-secondary': hideIndex }"
        >
          {{ label }}
        </p>
        <p v-if="!hideIndex" class="grow text-right tracking-normal">
          {{ index }} / {{ length - 1 }}
        </p>
      </div>

      <nx-thumb :images="images" :index="index" class="mt-2" :pdp="pdp"></nx-thumb>
    </div>
  </div>
</template>
