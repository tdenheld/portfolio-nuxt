<script setup>
const title = 'Tibor den Held — Design Engineer & Creative Developer';

const props = defineProps({
  title: String,
  description: {
    type: String,
    default: 'This is the default description for the website.',
  },
  image: {
    type: String,
    default:
      'https://res.cloudinary.com/tibor/image/upload/c_scale,q_60,w_1280/v1768574145/tdh-og_w6l3pi.png',
  },
});

const getTitle = () => {
  return props.title ? `${props.title} — ${title}` : title;
};

useHead({
  titleTemplate: () => getTitle(),

  htmlAttrs: {
    lang: 'nl',
  },

  meta: [
    {
      name: 'description',
      content: props.description,
    },
    {
      property: 'og:title',
      content: getTitle(),
    },
    {
      property: 'og:description',
      content: props.description,
    },
    {
      property: 'og:image',
      content: props.image,
    },
    {
      property: 'og:image:alt',
      content: getTitle(),
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
});
</script>

<template>
  <span v-if="false" />
</template>
