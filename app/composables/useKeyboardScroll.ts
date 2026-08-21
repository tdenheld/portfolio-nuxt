import type { MaybeRefOrGetter } from 'vue';

/* Pages scroll inside a fixed container instead of the document, so nothing is
   focused for arrow keys to act on. Making it focusable hands scrolling back to
   the browser, including scroll snapping. */
export const useKeyboardScroll = (
  scroller: MaybeRefOrGetter<HTMLElement | null | undefined>
) => {
  onMounted(() => toValue(scroller)?.focus({ preventScroll: true }));
};
