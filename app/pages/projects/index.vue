<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const projects = await queryCollection('projects').all();
const nuxtApp = useNuxtApp();
const scrollContainer = ref(null);

onMounted(() => {
  nuxtApp.$setColor();

  if (!nuxtApp.$isTouchDevice()) {
    ScrollSmoother.create({
      smooth: 0.8,
    });
  }

  document.querySelectorAll('[data-parallax]').forEach((el) => {
    // Disable on small devices
    if (innerWidth < 740) return;

    gsap.to(el, {
      scrollTrigger: {
        scrub: 1,
        scroller: scrollContainer.value,
      },
      y: (index, target) =>
        -ScrollTrigger.maxScroll(scrollContainer.value) * target.dataset.parallax,
      ease: 'none',
    });
  });

  gsap.to('[data-border]', {
    scaleY: 1,
    ease: 'power4.inOut',
    duration: 1,
  });

  document.querySelectorAll('[data-card]').forEach((el) => {
    let tl = gsap.timeline();
    gsap.set(el, { opacity: 1 });

    tl.fromTo(
      el.querySelector('[data-card-border]'),
      {
        scaleX: 0,
        ease: 'power4.out',
      },
      {
        scaleX: 1,
        delay: 0.5,
        duration: 0.2,
      }
    )
      .fromTo(
        el.querySelector('[data-card-image]'),
        {
          scaleX: 0,
          ease: 'power4.out',
        },
        {
          scaleX: 1,
          duration: 0.2,
        }
      )
      .fromTo(
        el.querySelector('[data-card-heading]'),
        {
          opacity: 0,
          filter: 'blur(6px)',
          ease: 'power4.out',
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.2,
        }
      )
      .fromTo(
        el.querySelector('[data-card-description]'),
        {
          opacity: 0,
          filter: 'blur(6px)',
          ease: 'power4.out',
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.2,
        }
      );
  });
});
</script>

<template>
  <div>
    <nx-meta-tags title="Projects"></nx-meta-tags>

    <h1 class="sr-only">Selected Work</h1>

    <div class="s-scroller no-scrollbar" ref="scrollContainer" id="smooth-wrapper">
      <div data-border class="s-border origin-top [transform:scaleY(0)]"></div>

      <div id="smooth-content">
        <div class="grid justify-center xl:gap-[calc(3vw+3vh)] py-[calc(8vw+4rem)]">
          <div
            class="group grid grid-cols-2"
            v-for="(entry, index) in projects"
            :key="entry.title"
            :data-parallax="0.7 + index * -0.1"
          >
            <nuxt-link
              data-card
              :to="entry.path"
              class="opacity-0 group-odd:col-start-2 flex flex-col-reverse gap-4 lg:gap-6 xl:flex-row group-odd:xl:flex-row-reverse group-odd:justify-self-end group-even:justify-self-start"
            >
              <div
                class="max-w-3xs max-xl:group-odd:ml-[6vw] max-xl:group-even:mr-[6vw] group-even:xl:text-right relative xl:-top-[3px]"
              >
                <h2
                  data-card-heading
                  class="font-display text-2xl lg:text-3xl hyphens-auto leading-[1.15] font-[850]"
                >
                  {{ entry.title }}
                </h2>

                <p
                  data-card-description
                  class="mt-2 text-sm text-fg-secondary/70 leading-normal"
                >
                  {{ entry.meta.descriptionShort }}
                </p>
              </div>

              <div class="flex items-center group-even:flex-row-reverse">
                <div
                  data-card-border
                  class="origin-right group-odd:origin-left border-t shrink-0 border-fg-primary opacity-30 border-dashed w-[6vw]"
                ></div>

                <nx-image
                  data-card-image
                  class="origin-right group-odd:origin-left"
                  :src="entry.meta.image"
                  alt=""
                  image-class="w-full aspect-video rounded-lg object-cover"
                  sizes="15rem"
                  :srcset="[320, 640, 1280, 1600]"
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
