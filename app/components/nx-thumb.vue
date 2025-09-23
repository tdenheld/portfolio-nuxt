<script setup lang="ts">
const props = defineProps<{
  index: number;
  images?: string[];
  isFadingOut?: boolean;
  pdp?: boolean;
}>();
</script>

<template>
  <div>
    <div
      class="w-[clamp(6rem,calc(48px+10vw),14rem)] aspect-video rounded-md md:rounded-lg overflow-hidden relative"
    >
      <div
        class="absolute inset-0 transition-opacity duration-1500 opacity-0"
        :class="{
          'opacity-100': index === 0 || isFadingOut || pdp,
        }"
      >
        <nx-oscilloscope></nx-oscilloscope>
      </div>

      <div
        v-for="(image, imgIndex) in images"
        :key="imgIndex"
        class="absolute inset-0 transition-opacity opacity-0"
        :class="{
          'opacity-100': imgIndex === index - 1 && !isFadingOut,
          'duration-1500': !isFadingOut,
          'duration-500': isFadingOut,
        }"
      >
        <nx-image
          :src="image"
          :srcset="[240, 400, 640]"
          :lazy="false"
          sizes="(min-width: 81.25rem) 14rem, (min-width: 46.25rem) 12rem, 6rem"
          class="size-full"
        ></nx-image>
      </div>
    </div>
  </div>
</template>
