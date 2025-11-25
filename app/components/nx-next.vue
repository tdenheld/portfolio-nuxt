<script setup>
const fromHome = useState('fromHome');

const props = defineProps({
  project: Object,
  root: HTMLElement | undefined,
});

const element = ref(null);

const init = ({ element, onScreen, offScreen, rootMargin = '0px 0px -10%' }) => {
  const observer = new IntersectionObserver(
    (entries, self) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          onScreen();
        } else {
          offScreen();
        }
      });
    },
    { root: props.root, rootMargin }
  );

  observer.observe(element);
};

onMounted(() => {
  init({
    element: element.value,
    onScreen: () => {
      console.log('on screen');
    },
    offScreen: () => {
      console.log('off screen');
    },
  });
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
