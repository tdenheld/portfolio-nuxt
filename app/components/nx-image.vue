<script setup lang="ts">
import { getCloudinaryImageUrl, getCloudinarySrcset } from '~/utils/cloudinary';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  sizes: {
    type: String,
    default: '(min-width: 90rem) 24rem, (min-width: 61.25rem) 20vw, 36vw',
  },
  srcset: {
    type: Array as PropType<number[]>,
    default: () => [160, 320, 640, 960, 1280],
  },
  ariaHidden: Boolean,
  imageClass: String,
  preload: Boolean,
  lazy: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: Boolean,
    default: true,
  },
});

const loaded = ref(false);

const defaultSize = {
  width: props.srcset[0] as number,
  height: (props.srcset[0] as number) * 0.75,
};

const getSrc = ({ width, blur }: { width: number; blur?: boolean }) => {
  return getCloudinaryImageUrl(props.src, { width, blur });
};

const getSrcset = () => getCloudinarySrcset(props.src, props.srcset);

const getClass = () => {
  return props.imageClass || 'size-full object-cover';
};

const getLoading = (): 'lazy' | 'eager' | undefined => {
  return props.lazy && !props.preload ? 'lazy' : undefined;
};

const getLinkPreload = () => {
  if (props.preload) {
    return [
      {
        rel: 'preload',
        as: 'image' as const,
        href: getSrc({ width: defaultSize.width }),
        imagesrcset: getSrcset(),
        imagesizes: props.sizes,
      },
    ];
  }
  return undefined;
};

useHead({
  link: getLinkPreload(),
});
</script>

<template>
  <figure class="grid">
    <img
      v-if="placeholder && !loaded"
      :width="defaultSize.width"
      :height="defaultSize.height"
      :src="getSrc({ width: defaultSize.width, blur: true })"
      alt=""
      aria-hidden="true"
      :class="getClass()"
      :loading="getLoading()"
      class="col-start-1 row-start-1"
    />

    <img
      :width="defaultSize.width"
      :height="defaultSize.height"
      :src="getSrc({ width: defaultSize.width })"
      :srcset="getSrcset()"
      :sizes="sizes"
      :alt="alt"
      :aria-hidden="ariaHidden || undefined"
      :class="getClass()"
      :loading="getLoading()"
      class="col-start-1 row-start-1"
      @load="loaded = true"
    />
  </figure>
</template>
