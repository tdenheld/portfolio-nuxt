import type { Color } from '~/interfaces';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('setColor', (color: Color) => {
    const root = document.documentElement;

    // Define color variable mappings
    const colorVariables = {
      '--color-fg-primary': color?.fg.primary,
      '--color-fg-secondary': color?.fg.secondary,
      '--color-fg-tertiary': color?.fg.tertiary,
      '--color-bg-primary': color?.bg.primary,
      '--color-bg-secondary': color?.bg.secondary,
      '--color-bg-tertiary': color?.bg.tertiary,
    };

    Object.entries(colorVariables).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(key, value);
      } else {
        root.style.removeProperty(key);
      }
    });
  });
});
