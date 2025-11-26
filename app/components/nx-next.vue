<script setup>
const props = defineProps({
  project: Object,
  root: HTMLElement | undefined,
});

const fromHome = useState('fromHome');
const element = ref(null);
const isActive = ref(false);
const nuxtApp = useNuxtApp();
let observer;

onMounted(() => {
  observer = nuxtApp.$intersectionObserver({
    root: props.root,
    element: element.value,
    onScreen: () => {
      if (!isActive.value) {
        isActive.value = true;
      }
    },
    offScreen: () => {
      if (isActive.value) {
        isActive.value = false;
      }
    },
  });
});

onBeforeUnmount(() => {
  observer?.cleanup();
});
</script>

<template>
  <div class="pt-16 pb-2 lg:pt-32 lg:pb-48">
    <div ref="element">
      <nuxt-link
        :to="project.path"
        class="group cursor-pointer touch-manipulation inline-block"
        @click.native="fromHome = false"
      >
        <h2
          class="font-display font-[150] group-hover:font-[750] transition-all duration-600 text-[calc(3rem+10vw)] leading-[0.8] tracking-tighter"
        >
          <span
            v-for="(char, index) in 'Next'.split('')"
            :key="index"
            class="inline-block reveal reveal--stag blur-md last:ml-[0.04em]"
            :class="{ 'is-active': isActive }"
            >{{ char }}</span
          >
        </h2>

        <p
          class="text-sm md:text-base -mt-1 md:-mt-2 lg:-mt-4 text-fg-secondary reveal blur-xs delay-350"
          :class="{ 'is-active': isActive }"
        >
          {{ project.title }}
        </p>
      </nuxt-link>
    </div>
  </div>
</template>
