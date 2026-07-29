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
const preloadObserver = ref<IntersectionObserver | null>(null);
const playbackObserver = ref<IntersectionObserver | null>(null);
const sourcesEnabled = ref(props.preload !== 'none');

const enableSources = async () => {
  if (sourcesEnabled.value) return;

  sourcesEnabled.value = true;
  await nextTick();
  video.value?.load();
};

const playVideo = async (target: HTMLVideoElement) => {
  await enableSources();

  try {
    await target.play();
  } catch {
    // Playback can still be blocked by browser or user autoplay preferences.
  }
};

onMounted(() => {
  if (!video.value) return;

  if (props.preload === 'none') {
    preloadObserver.value = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        void enableSources();
        preloadObserver.value?.disconnect();
      },
      { rootMargin: '50% 0px' }
    );

    preloadObserver.value.observe(video.value);
  }

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
  preloadObserver.value?.disconnect();
  playbackObserver.value?.disconnect();
});
</script>

<template>
  <div>
    <video
      ref="video"
      :preload="props.preload"
      muted
      loop
      playsinline
      class="w-full overflow-hidden rounded-2xl"
      :poster="poster"
    >
      <source
        v-if="sourcesEnabled"
        :src="src + '.webm#t=0.001'"
        type="video/webm"
        media="(width >= 980px)"
      />
      
      <source
        v-if="sourcesEnabled"
        :src="src + '-sm.webm#t=0.001'"
        type="video/webm"
      />

      <source
        v-if="sourcesEnabled"
        :src="src + '.mp4#t=0.001'"
        type="video/mp4"
        media="(width >= 980px)"
      />
      <source v-if="sourcesEnabled" :src="src + '-sm.mp4#t=0.001'" type="video/mp4" />
    </video>
  </div>
</template>
