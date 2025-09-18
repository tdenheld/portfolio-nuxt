<script setup lang="ts">
const props = defineProps<{
  index: number;
  images?: string[];
}>();
</script>

<template>
  <div>
    <div class="w-28 md:w-48 aspect-video rounded-lg overflow-hidden relative">
      <div
        v-for="(image, imgIndex) in images"
        :key="imgIndex"
        class="absolute inset-0 transition-opacity duration-1000 opacity-0"
        :class="{
          'opacity-100': imgIndex === index - 1,
        }"
      >
        <nx-image
          :src="image"
          :srcset="[160, 240, 320]"
          :lazy="false"
          sizes="(min-width: 740px) 192px, 112px"
        ></nx-image>
      </div>
    </div>
  </div>
</template>
