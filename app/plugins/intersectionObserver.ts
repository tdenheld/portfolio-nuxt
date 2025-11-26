interface IntersectionObserverOptions {
  root?: HTMLElement | null;
  element: HTMLElement;
  rootMargin?: string;
  onScreen: () => void;
  offScreen: () => void;
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide(
    'intersectionObserver',
    ({
      root,
      element,
      rootMargin = '0px 0px -10%',
      onScreen,
      offScreen,
    }: IntersectionObserverOptions) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onScreen();
            } else {
              offScreen();
            }
          });
        },
        { root, rootMargin }
      );

      observer.observe(element);

      return {
        observer,
        cleanup() {
          observer.unobserve(element);
          observer.disconnect();
        }
      };
    }
  );
});
