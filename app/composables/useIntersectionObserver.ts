import type { MaybeRefOrGetter, WatchStopHandle } from 'vue';

type ObservableElement = Element | null | undefined;

interface IntersectionObserverOptions {
  element: MaybeRefOrGetter<ObservableElement | ObservableElement[]>;
  root?: MaybeRefOrGetter<Element | Document | null | undefined>;
  rootMargin?: string | ((element: Element) => string);
  threshold?: number | number[];
  onScreen?: (entry: IntersectionObserverEntry) => void;
  offScreen?: (entry: IntersectionObserverEntry) => void;
}

export const useIntersectionObserver = ({
  element,
  root,
  rootMargin = '0px 0px -10%',
  threshold,
  onScreen,
  offScreen,
}: IntersectionObserverOptions) => {
  let observers: IntersectionObserver[] = [];
  let stopWatching: WatchStopHandle | undefined;

  const cleanup = () => {
    observers.forEach((observer) => observer.disconnect());
    observers = [];
  };

  const observe = () => {
    cleanup();

    const source = toValue(element);
    const elements = (Array.isArray(source) ? source : [source]).filter(
      (item): item is Element => item instanceof Element
    );
    const observerRoot = toValue(root) ?? null;

    elements.forEach((observedElement) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) onScreen?.(entry);
            else offScreen?.(entry);
          });
        },
        {
          root: observerRoot,
          rootMargin:
            typeof rootMargin === 'function'
              ? rootMargin(observedElement)
              : rootMargin,
          threshold,
        }
      );

      observer.observe(observedElement);
      observers.push(observer);
    });
  };

  onMounted(() => {
    stopWatching = watch(
      [() => toValue(element), () => toValue(root)],
      observe,
      { immediate: true, flush: 'post' }
    );
  });

  onBeforeUnmount(() => {
    stopWatching?.();
    cleanup();
  });

  return { cleanup };
};