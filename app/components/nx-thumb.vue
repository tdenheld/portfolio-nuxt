<script setup lang="ts">
const props = defineProps<{
  index: number;
  images?: string[];
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
          'opacity-100': index === 0 || pdp,
        }"
      >
        <nx-oscilloscope></nx-oscilloscope>
      </div>

      <div
        v-for="(image, imgIndex) in images"
        :key="imgIndex"
        class="absolute inset-0 transition-opacity opacity-0 duration-1500"
        :class="{
          'opacity-100': imgIndex === index - 1 || pdp,
          'thumb-fade-out': pdp,
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

<style scoped lang="postcss">
.thumb-fade-out {
  animation-duration: 2s;
  animation-fill-mode: both;
  animation-delay: 50ms;
  animation-timing-function: var(--ease-out);
  animation-name: thumb-fade-out;
}

@keyframes thumb-fade-out {
  50% {
    filter: blur(3px);
  }
  100% {
    opacity: 0;
  }
}
</style>
