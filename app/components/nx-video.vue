<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();

const video = ref<HTMLVideoElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  if (!video.value) return;

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
      preload="auto" 
      muted 
      loop 
      playsinline 
      class="w-full" 
      autoplay
    >
      <source :src="src + '.mp4'" type="video/mp4" />
      <source :src="src + '.webm'" type="video/webm" />
    </video>
  </div>
</template>
