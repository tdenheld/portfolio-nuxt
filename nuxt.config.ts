import svgLoader from 'vite-svg-loader';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-09-01',

  // Use Nuxt in SPA mode only
  ssr: false,
  spaLoadingTemplate: true,

  devServer: {
    host: '0.0.0.0',
  },

  devtools: {
    enabled: false,
  },

  app: {
    pageTransition: { name: 'page' },

    head: {
      title: 'Tibor den Held – Design Engineer & Creative Developer',
      meta: [
        {
          name: 'description',
          content:
            'Tibor crafts scalable and accessible experiences. He specializes in design systems, product design and engineering.',
        },
      ],
      style: [
        {
          innerHTML: `html{background-color:#232927}.p-grid{display:grid;place-content:center;position:fixed;inset:0;width:100%;height:100%;box-sizing:border-box}.p-logo{position:relative;display:grid;place-content:center;width:80px;height:80px}.p-logo:before{content:'';position:absolute;inset:0;background-color:#3c796b;border-radius:12px;animation:rotate 1.5s linear infinite}.p-logo svg{position:relative;padding-bottom:4px;color:#cdd388;width:40px}@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`,
        },
      ],

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
