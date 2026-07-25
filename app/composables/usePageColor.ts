import type { MaybeRefOrGetter, WatchStopHandle } from 'vue';

import type { Color } from '~/interfaces';

export const usePageColor = (color: MaybeRefOrGetter<Color | null | undefined>) => {
  let stopWatching: WatchStopHandle | undefined;

  const applyColor = (value: Color | null | undefined) => {
    const colorVariables = {
      '--color-fg-primary': value?.fg.primary,
      '--color-fg-secondary': value?.fg.secondary,
      '--color-fg-tertiary': value?.fg.tertiary,
      '--color-bg-primary': value?.bg.primary,
      '--color-bg-secondary': value?.bg.secondary,
      '--color-bg-tertiary': value?.bg.tertiary,
    };

    Object.entries(colorVariables).forEach(([property, propertyValue]) => {
      if (propertyValue) {
        document.documentElement.style.setProperty(property, propertyValue);
      } else {
        document.documentElement.style.removeProperty(property);
      }
    });
  };

  onMounted(() => {
    stopWatching = watch(() => toValue(color), applyColor, { immediate: true });
  });

  onBeforeUnmount(() => {
    stopWatching?.();
  });
};
