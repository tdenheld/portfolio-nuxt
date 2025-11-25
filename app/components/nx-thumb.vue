<script setup lang="ts">
const props = defineProps<{
  index: number;
  images?: string[];
  pdp?: boolean;
}>();

const fromHome = useState('fromHome');
</script>

<template>
  <div>
    <div
      class="relative w-[clamp(6rem,calc(48px+10vw),14rem)] aspect-video rounded-md md:rounded-lg overflow-hidden"
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
        v-if="fromHome"
        class="transition duration-[2s]"
        :class="{ 'opacity-0': pdp }"
      >
        <div
          v-for="(image, imgIndex) in images"
          :key="imgIndex"
          class="absolute inset-0 transition-opacity opacity-0 duration-1500"
          :class="{
            'opacity-100': imgIndex === index - 1,
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
  </div>
</template>
