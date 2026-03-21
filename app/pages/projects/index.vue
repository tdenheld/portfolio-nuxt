<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const page = await queryCollection('content').path('/work').first();
const projects = await queryCollection('projects').all();
const nuxtApp = useNuxtApp();
const refresh = useState('refresh');
const fromHome = useState('fromHome');
const scrollContainer = ref(null);
const smoothContent = ref(null);
let smoother;

onBeforeUnmount(() => {
  smoother?.kill();
});

onMounted(() => {
  nuxtApp.$setColor(page.meta.color);

  if (!nuxtApp.$isTouchDevice()) {
    smoother = ScrollSmoother.create({
      wrapper: scrollContainer.value,
      content: smoothContent.value,
      smooth: 0.8,
    });
  }

  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const maxScroll = ScrollTrigger.maxScroll(scrollContainer.value);
    const scroll = maxScroll > 200 ? maxScroll : 200;

    gsap.to(el, {
      scrollTrigger: {
        scrub: 1,
        ...(smoother ? {} : { scroller: scrollContainer.value }),
      },
      y: (index, target) => -scroll * target.dataset.parallax,
      ease: 'none',
    });
  });

  // Animate border and cards
  // ------------------------------------------------------------

  // Add (more) delay on initial page load
  const delayBorder = refresh.value ? 0.4 : 0;
  const delayCard = refresh.value ? 0.6 : 0.2;

  gsap.to('[data-border]', {
    y: 0,
    ease: 'power4.inOut',
    duration: 1,
    delay: delayBorder,
  });

  gsap.fromTo(
    '[data-card]',
    {
      y: -16,
      opacity: 0,
      filter: 'blur(8px)',
    },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      rotateX: '0deg',
      ease: 'power4.out',
      duration: 2.5,
      delay: delayCard,
      stagger: 0.12,
    }
  );
});
</script>

<template>
  <div>
    <nx-meta-tags title="Projects"></nx-meta-tags>

    <h1 class="sr-only">Selected Work</h1>

    <div data-border class="s-border origin-top transform-[translateY(-100%)]"></div>

    <div class="s-scroller no-scrollbar" ref="scrollContainer">
      <div ref="smoothContent">
        <div class="grid justify-center xl:gap-[calc(3vw+3vh)] pb-8 pt-[calc(8vw+4rem)] md:pb-[calc(8vw+2rem)]">
          <div
            class="group grid grid-cols-2 perspective-[32vw] max-xl:not-first:-mt-8"
            v-for="(entry, index) in projects"
            :key="entry.title"
            :data-parallax="0.7 + index * -0.1"
          >
            <nuxt-link
              data-card
              :to="entry.path"
              @click.native="fromHome = false"
              class="transform-[rotateX(5deg)] lg:transform-[rotateX(9deg)] opacity-0 group-odd:col-start-2 flex flex-col-reverse gap-3 lg:gap-6 xl:flex-row group-odd:xl:flex-row-reverse group-odd:justify-self-end group-even:justify-self-start before:absolute before:-inset-y-4 before:left-[calc(6vw-1rem)] before:-right-4 group-even:before:-left-4 group-even:before:right-[calc(6vw-1rem)] before:rounded-2xl before:bg-fg-secondary/8 before:opacity-0 before:scale-[103%] before:blur-md before:transition before:duration-1000 hover:before:opacity-100 hover:before:scale-100 hover:before:blur-none hover:before:duration-500"
            >
              <div
                class="max-w-3xs max-xl:group-odd:ml-[6vw] max-xl:group-even:mr-[6vw] group-even:xl:text-right relative xl:-top-px"
              >
                <h2
                  class="font-display text-2xl lg:text-3xl leading-[1.15] font-[850]"
                >
                  {{ entry.title }}
                </h2>

                <p
                  class="mt-1 lg:mt-2 text-xs md:text-sm text-fg-secondary/70 leading-normal"
                >
                  {{ entry.meta.descriptionShort }}
                </p>
              </div>

              <div class="flex items-center group-even:flex-row-reverse">
                <div
                  class="border-t shrink-0 border-fg-primary opacity-30 border-dashed w-[6vw]"
                ></div>

                <nx-image
                  class="grow xl:min-w-56 xl:w-[13vw]"
                  :src="entry.meta.image"
                  alt=""
                  image-class="w-full aspect-video object-cover rounded-lg outline outline-fg-primary/10"
                  sizes="(min-width: 81,25rem) 13vw, (min-width: 30rem) 15rem, 40vw"
                  :srcset="[320, 480, 640]"
                  :preload="true"
                ></nx-image>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.s-scroller {
  position: fixed;
  inset: 0;
  padding: var(--spacing-contain);
  overflow-x: hidden;
  overflow-y: scroll;
}

.s-border {
  position: fixed;
  inset-block: 0;
  left: 50%;
  translate: -50% 0;
  pointer-events: none;
  border-left: 1px dashed var(--color-fg-primary);
  opacity: 0.3;
}
</style>
