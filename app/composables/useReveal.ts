import type { MaybeRefOrGetter } from 'vue';

const REVEAL_SELECTOR = '[data-reveal]';
const TRIGGER_SELECTOR = '[data-reveal-trigger]';

export const useReveal = (root: MaybeRefOrGetter<HTMLElement | null | undefined>) => {
  const getRoot = () => toValue(root);
  const getTriggers = () => {
    const rootElement = getRoot();
    return rootElement
      ? Array.from(rootElement.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR))
      : [];
  };
  const toggleReveal = (element: Element, active: boolean) => {
    const revealElements = element.matches(REVEAL_SELECTOR)
      ? [element]
      : Array.from(element.querySelectorAll(REVEAL_SELECTOR));

    revealElements.forEach((revealElement) => {
      revealElement.classList.toggle('is-active', active);
    });
  };

  onMounted(() => {
    getRoot()
      ?.querySelectorAll(REVEAL_SELECTOR)
      .forEach((element) => element.classList.add('reveal'));
  });

  useIntersectionObserver({
    root,
    element: getTriggers,
    rootMargin: (element) =>
      (element as HTMLElement).dataset.revealTrigger || '0px 0px -2%',
    onScreen: ({ target }) => toggleReveal(target, true),
    offScreen: ({ target }) => toggleReveal(target, false),
  });
};
