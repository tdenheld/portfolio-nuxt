<script setup lang="ts">
const props = defineProps<{
  src: string;
  poster?: string;
  preload?: boolean;
}>();

const video = ref<HTMLVideoElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  if (!video.value || props.preload) return;

  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLVideoElement;
        entry.isIntersecting ? target.play() : target.pause();
      });
    },
    { rootMargin: '-10% 0px' }
  );

  observer.value.observe(video.value);
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<template>
  <div>
    <video
      ref="video"
      preload="metadata"
      muted
      loop
      playsinline
      class="w-full overflow-hidden rounded-2xl"
      autoplay
      :poster="poster"
    >
      <source :src="src + '.webm#t=0.001'" type="video/webm" media="(width >= 980px)" />
      <source :src="src + '-sm.webm#t=0.001'" type="video/webm" />

      <source :src="src + '.mp4#t=0.001'" type="video/mp4" media="(width >= 980px)" />
      <source :src="src + '-sm.mp4#t=0.001'" type="video/mp4" />
    </video>
  </div>
</template>
