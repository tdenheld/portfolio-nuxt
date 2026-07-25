import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothParallaxOptions {
  host: Ref<HTMLElement | null>;
  scroller: Ref<HTMLElement | null>;
  content: Ref<HTMLElement | null>;
  minimumViewportWidth?: number;
  minimumScrollDistance?: number;
  useWindowWithSmoother?: boolean;
  setup?: () => void;
}

export const useSmoothParallax = ({
  host,
  scroller,
  content,
  minimumViewportWidth = 0,
  minimumScrollDistance = 0,
  useWindowWithSmoother = false,
  setup,
}: SmoothParallaxOptions) => {
  const nuxtApp = useNuxtApp();
  const isTouchDevice = nuxtApp.$isTouchDevice as () => boolean;
  let smoother: ScrollSmoother | undefined;
  let animationContext: gsap.Context | undefined;

  onMounted(() => {
    const hostElement = host.value;
    const scrollElement = scroller.value;
    const contentElement = content.value;
    if (!hostElement || !scrollElement || !contentElement) return;

    animationContext = gsap.context(() => {
      if (!isTouchDevice()) {
        smoother = ScrollSmoother.create({
          wrapper: scrollElement,
          content: contentElement,
          smooth: 0.8,
        });
      }

      if (innerWidth >= minimumViewportWidth) {
        gsap.utils
          .toArray<HTMLElement>('[data-parallax]', hostElement)
          .forEach((element) => {
            const scrollTarget =
              smoother && useWindowWithSmoother ? window : scrollElement;
            const maxScroll = ScrollTrigger.maxScroll(scrollTarget);
            const scrollDistance = Math.max(maxScroll, minimumScrollDistance);

            gsap.to(element, {
              scrollTrigger: {
                scrub: 1,
                ...(smoother ? {} : { scroller: scrollElement }),
              },
              y: () => -scrollDistance * Number(element.dataset.parallax),
              ease: 'none',
            });
          });
      }

      setup?.();
    }, hostElement);
  });

  onBeforeUnmount(() => {
    smoother?.kill();
    animationContext?.revert();
  });
};