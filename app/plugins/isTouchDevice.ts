export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('isTouchDevice', () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  });
});
