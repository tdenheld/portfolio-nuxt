import svgLoader from 'vite-svg-loader';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-09-01',

  ssr: false,

  hooks: {
    'prerender:routes': ({ routes }) => {
      routes.clear();
    },
  },

  devServer: {
    host: '0.0.0.0',
  },

  devtools: {
    enabled: false,
  },

  app: {
    pageTransition: { name: 'page' },

    head: {
      link: [
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          href: 'favicon-touch.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: 'favicon.ico',
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
