import { defineContentConfig, defineCollection } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    content: defineCollection({ type: 'page', source: '**/*.md' }),
    products: defineCollection({ type: 'page', source: 'products/*.md' }),
  },
});
