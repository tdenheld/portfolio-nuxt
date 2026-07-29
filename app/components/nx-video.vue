<script setup lang="ts">
type VideoPreload = 'none' | 'metadata' | 'auto';

const props = withDefaults(
  defineProps<{
    src: string;
    poster: string;
    preload?: VideoPreload;
  }>(),
  { preload: 'none' }
);

const video = ref<HTMLVideoElement | null>(null);
const playbackObserver = ref<IntersectionObserver | null>(null);
const posterVisible = ref(true);

useHead({
  link:
    props.preload === 'auto'
      ? [{ rel: 'preload', as: 'image', href: props.poster }]
      : undefined,
});

const playVideo = async (target: HTMLVideoElement) => {
  try {
    await target.play();
  } catch {
    // Playback can still be blocked by browser or user autoplay preferences.
  }
};

onMounted(() => {
  if (!video.value) return;

  playbackObserver.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) void playVideo(target);
        else target.pause();
      });
    },
    { rootMargin: '-10% 0px' }
  );

  playbackObserver.value.observe(video.value);
});

onUnmounted(() => {
  playbackObserver.value?.disconnect();
});
</script>

<template>
  <div class="grid">
    <video
      ref="video"
      :preload="props.preload"
      muted
      loop
      playsinline
      class="col-start-1 row-start-1 w-full overflow-hidden rounded-2xl"
      @playing="posterVisible = false"
    >
      <source
        :src="src + '.webm#t=0.001'"
        type="video/webm"
        media="(width >= 980px)"
      />

      <source :src="src + '-sm.webm#t=0.001'" type="video/webm" />
      <source :src="src + '.mp4#t=0.001'" type="video/mp4" media="(width >= 980px)" />
      <source :src="src + '-sm.mp4#t=0.001'" type="video/mp4" />
    </video>

    <img
      v-if="posterVisible"
      :src="poster"
      alt=""
      aria-hidden="true"
      :loading="preload === 'auto' ? 'eager' : 'lazy'"
      :fetchpriority="preload === 'auto' ? 'high' : 'auto'"
      class="col-start-1 row-start-1 z-1 size-full object-cover rounded-2xl"
    />
  </div>
</template>
