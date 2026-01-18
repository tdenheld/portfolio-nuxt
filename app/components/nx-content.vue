<script setup>
import md from 'markdown-it';
import la from 'markdown-it-link-attributes';

const props = defineProps({
  content: String,
});

const renderedContent = md()
  .use(la, {
    matcher(href) {
      return href.startsWith('https:');
    },
    attrs: {
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  })
  .render(props.content);
</script>

<template>
  <article class="content" v-html="renderedContent"></article>
</template>
