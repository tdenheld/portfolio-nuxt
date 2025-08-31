<script setup>
import md from 'markdown-it';

const props = defineProps({
  data: Object,
});

const renderer = md();
</script>

<template>
  <div class="pr-16 shrink-0 lg:w-[50vw] lg:max-w-2xl xl:max-w-3xl">
    <p v-if="data.eyebrow" class="eyebrow mb-1">{{ data.eyebrow }}</p>

    <h2 class="heading-lg">{{ data.title }}</h2>

    <article
      v-if="data.description"
      class="mt-6 content"
      v-html="renderer.render(data.description)"
    ></article>

    <div v-if="data.cta" class="mt-10 button-group">
      <a :href="data.cta.primary.url" class="button">{{ data.cta.primary.name }}</a>

      <a
        v-if="data.cta.secondary"
        :href="data.cta.secondary.url"
        class="button button--text"
      >
        {{ data.cta.secondary.name }}
      </a>
    </div>
  </div>
</template>
