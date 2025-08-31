<script setup>
const props = defineProps({
  data: Object,
});
</script>

<template>
  <div class="@container">
    <nuxt-link
      :to="data.path"
      class="group block focus-visible:outline-offset-8 rounded-xl @2xs:rounded-2xl"
    >
      <div class="grid">
        <h2 class="mt-2 text-base font-semibold @2xs:mt-3 @2xs:text-xl">
          {{ data.title }}
        </h2>
        
        <p class="hidden mt-3 text-front-subtle text-sm @2xs:block">
          {{ data.description }}
        </p>

        <div
          class="mt-1 text-sm text-primary link-group-hover @2xs:mt-3 @2xs:text-base"
        >
          Read more →
        </div>

        <nx-image
          :src="data.meta.image.src"
          class="order-first rounded-xl overflow-hidden aspect-video @2xs:rounded-2xl"
        ></nx-image>
      </div>
    </nuxt-link>
  </div>
</template>
