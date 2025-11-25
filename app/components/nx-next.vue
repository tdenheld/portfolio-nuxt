<script setup>
const props = defineProps({
  project: Object,
  root: HTMLElement | undefined,
});

const fromHome = useState('fromHome');
const element = ref(null);
const observer = ref(null);

const initObserver = ({ onScreen, offScreen }) => {
  observer.value = new IntersectionObserver(
    (entries, self) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          onScreen();
        } else {
          offScreen();
        }
      });
    },
    { root: props.root, rootMargin: '0px 0px -10%' }
  );

  observer.value.observe(element.value);
};

onMounted(() => {
  initObserver({
    onScreen: () => {
      console.log('on screen');
    },
    offScreen: () => {
      console.log('off screen');
    },
  });
});

onUnmounted(() => {
  if (observer.value && element.value) {
    observer.value.unobserve(element.value);
  }
});
</script>

<template>
  <div class="pt-24 pb-2 lg:pt-32 lg:pb-48">
    <div ref="element">
      <nuxt-link
        :to="project.path"
        class="group cursor-pointer touch-manipulation inline-block"
        @click.native="fromHome = false"
      >
        <h2
          class="font-display font-[150] group-hover:font-[750] transition-all duration-600 text-[calc(3rem+10vw)] leading-[0.8]"
        >
          Next
        </h2>

        <p class="text-sm md:text-base md:-mt-4 text-fg-secondary">
          {{ project.title }}
        </p>
      </nuxt-link>
    </div>
  </div>
</template>
