<script setup>
const fromHome = useState('fromHome');

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="pt-24 pb-2 lg:pt-32 lg:pb-48">
    <nuxt-link
      :to="project.path"
      class="group cursor-pointer touch-manipulation inline-block"
      @click.native="fromHome = false"
    >
      <h2
        class="font-display font-[150] group-hover:font-[700] transition-all duration-600 text-[calc(3rem+10vw)] leading-[0.8]"
      >
        Next
      </h2>

      <p class="text-sm md:text-base md:-mt-4 text-fg-secondary">
        {{ project.title }}
      </p>
    </nuxt-link>
  </div>
</template>
