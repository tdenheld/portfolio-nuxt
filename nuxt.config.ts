import svgLoader from 'vite-svg-loader';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-09-01',

  // Use Nuxt in SPA mode only
  ssr: false,
  spaLoadingTemplate: true,

  devServer: {
    host: 'localhost',
  },

  devtools: {
    enabled: true,
  },

  app: {
    pageTransition: { name: 'page' },

    head: {
      link: [
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          href: '/favicon-touch.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.ico',
        },
        {
          rel: 'preload',
          type: 'font/woff2',
          as: 'font',
          crossorigin: '',
          href: '/fonts/display-var.woff2',
        },
        {
          rel: 'preload',
          type: 'font/woff2',
          as: 'font',
          crossorigin: '',
          href: '/fonts/serif-400-italic.woff2',
        },
        {
          rel: 'preload',
          type: 'font/woff2',
          as: 'font',
          crossorigin: '',
          href: '/fonts/sans-400.woff2',
        },
        {
          rel: 'preload',
          type: 'font/woff2',
          as: 'font',
          crossorigin: '',
          href: '/fonts/mono-400.woff2',
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
