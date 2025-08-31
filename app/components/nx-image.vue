<script setup lang="ts">
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
    default: [160, 320, 640, 960, 1280],
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

const getFileExtension = () => {
  const extension = props.src.split('.').pop();

  if (extension === 'png' || extension === 'jpg') {
    return extension;
  } else {
    return null;
  }
};

const getSrc = ({ width, blur }: { width: number; blur?: boolean }) => {
  const transform = blur ? `q_10,w_32,e_blur:300` : `q_50,w_${width}`;

  return props.src
    .replace('upload/', `upload/c_scale,${transform}/`)
    .replace(`.${getFileExtension()}`, '.webp');
};

const getSrcset = () => {
  return props.srcset
    .map((width) => `${getSrc({ width: width as number })} ${width}w`)
    .join(',\n    ');
};

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
  <figure class="relative">
    <img
      :width="defaultSize.width"
      :height="defaultSize.height"
      :src="getSrc({ width: defaultSize.width, blur: true })"
      :alt="alt"
      :aria-hidden="ariaHidden"
      :class="getClass()"
      :loading="getLoading()"
      :style="{ visibility: loaded || !placeholder ? 'hidden' : 'visible' }"
    />

    <img
      :width="defaultSize.width"
      :height="defaultSize.height"
      class="absolute inset-0"
      :src="getSrc({ width: defaultSize.width })"
      :srcset="getSrcset()"
      :sizes="sizes"
      :alt="alt"
      :aria-hidden="ariaHidden"
      :class="getClass()"
      :loading="getLoading()"
      @load="loaded = true"
    />
  </figure>
</template>
