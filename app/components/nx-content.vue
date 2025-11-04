<script setup>
import md from 'markdown-it';

const props = defineProps({
  content: String,
});

const renderedContent = md().render(props.content);
</script>

<template>
  <article class="content" v-html="renderedContent"></article>
</template>
