<script setup lang="ts">
const props = defineProps<{
  index: number;
  images?: string[];
}>();
</script>

<template>
  <div>
    <div
      class="w-24 md:w-48 xl:w-56 aspect-video rounded-md md:rounded-lg overflow-hidden relative"
    >
      <div
        class="absolute inset-0 transition-opacity duration-1500 opacity-0"
        :class="{
          'opacity-100': index === 0,
        }"
      >
        <nx-oscilloscope></nx-oscilloscope>
      </div>

      <div
        v-for="(image, imgIndex) in images"
        :key="imgIndex"
        class="absolute inset-0 transition-opacity duration-1500 opacity-0"
        :class="{
          'opacity-100': imgIndex === index - 1,
        }"
      >
        <nx-image
          :src="image"
          :srcset="[240, 400, 640]"
          :lazy="false"
          sizes="(min-width: 46.25rem) 12rem, (min-width: 81.25rem) 14rem, 6rem"
          class="size-full"
        ></nx-image>
      </div>
    </div>
  </div>
</template>
