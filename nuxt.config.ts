import svgLoader from 'vite-svg-loader';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-09-01',

  devServer: {
    host: '0.0.0.0',
  },

  app: {
    pageTransition: { name: 'page' },

    head: {
      link: [
        {
          rel: 'apple-touch-icon',
          href: 'favicon-touch.png',
        },
      ],
    },
  },

  css: ['@/assets/css/main.css'],

  modules: ['@nuxt/content'],

  content: {
    renderer: {
      anchorLinks: false,
    },
  },

  vite: {
    plugins: [svgLoader(), tailwindcss()],
  },

  build: {
    transpile: ['gsap'],
  },
});
