export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('reveal', (root: HTMLElement) => {
    const { $intersectionObserver } = useNuxtApp() as any;
    const obj = '[data-reveal-trigger]';
    if (!document.querySelector(obj)) return;

    // Add .reveal class on page load
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('reveal');
    });

    const observers: Array<{ cleanup: () => void }> = [];

    const init = (element: HTMLElement) => {
      const rootMargin = element.dataset.revealTrigger || '0px 0px -2%';

      const onScreen = () => {
        if (element.hasAttribute('data-reveal')) {
          element.classList.add('is-active');
        } else {
          element.querySelectorAll('[data-reveal]').forEach((el) => {
            el.classList.add('is-active');
          });
        }
      };

      const offScreen = () => {
        if (element.hasAttribute('data-reveal')) {
          element.classList.remove('is-active');
        } else {
          element.querySelectorAll('[data-reveal]').forEach((el) => {
            el.classList.remove('is-active');
          });
        }
      };

      const observerInstance = $intersectionObserver({
        root,
        element,
        rootMargin,
        onScreen,
        offScreen,
      });

      observers.push(observerInstance);
    };

    document.querySelectorAll(obj).forEach((el) => init(el as HTMLElement));

    // Return cleanup function for all observers
    return {
      cleanup() {
        observers.forEach((obs) => obs.cleanup());
      },
    };
  });
});
