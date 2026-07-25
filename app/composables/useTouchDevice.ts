export const useTouchDevice = () => {
  const isTouchDevice = ref(
    import.meta.client &&
      (window.matchMedia('(hover: none), (pointer: coarse)').matches ||
        navigator.maxTouchPoints > 0)
  );
  let pointerQuery: MediaQueryList | undefined;

  const update = () => {
    isTouchDevice.value =
      Boolean(pointerQuery?.matches) || navigator.maxTouchPoints > 0;
  };

  onMounted(() => {
    pointerQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    update();
    pointerQuery.addEventListener('change', update);
  });

  onBeforeUnmount(() => {
    pointerQuery?.removeEventListener('change', update);
  });

  return { isTouchDevice: readonly(isTouchDevice) };
};