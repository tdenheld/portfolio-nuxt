<script setup lang="ts">
const props = defineProps<{
  index: number;
  length: number;
  images?: string[];
  isFadingOut?: boolean;
  pdp?: boolean;
  featured?: boolean;
}>();
</script>

<template>
  <div class="fixed bottom-contain right-contain">
    <div v-if="pdp">
      <div class="mb-16">
        <h3 class="key">Involvement</h3>

        <ul class="mt-1 text-sm leading-[1.4] text-fg-secondary">
          <li>Senior Design Engineer</li>
          <li>Design Systems</li>
        </ul>
      </div>

      <div class="mb-16">
        <h3 class="key">Featured</h3>

        <ul class="mt-1 text-sm leading-[1.4] text-fg-secondary">
          <li>Zeroheight Showcase</li>
          <li>The Component Gallery</li>
        </ul>
      </div>
    </div>

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

<style scoped lang="postcss"></style>
