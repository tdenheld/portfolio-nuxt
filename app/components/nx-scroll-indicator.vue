<script setup>
const el = ref(null);

onMounted(() => {
  const scroller = document.querySelector('[data-scroller-carousel]');
  if (!scroller) return;

  const handleScroll = () => {
    if (!el.value) return;
    console.log('scrolling');
    el.value.classList.add('opacity-0', '-translate-y-24');
    scroller.removeEventListener('scroll', handleScroll, true);
  };

  scroller.addEventListener('scroll', handleScroll, true);
});
</script>

<template>
  <div>
    <div
      class="md:hidden text-center fixed right-contain top-[23%] -translate-y-1/2 pointer-events-none a-si [animation-delay:700ms] [animation-duration:1s] blur-sm"
    >
      <div ref="el" class="transition duration-500">
        <div
          class="bg-fg-primary/8 rotate-12 rounded-full grid place-content-center size-18 md:size-24 transition-clr"
        >
          <p
            class="text-xs md:text-sm leading-[1.2] font-serif text-fg-secondary transition-clr"
          >
            Swipe to<br />discover
          </p>
        </div>
      </div>
    </div>

    <div
      class="hidden md:block fixed right-[calc(var(--spacing-contain)+4px)] top-1/2 -translate-y-1/2 pointer-events-none a-fi [animation-delay:1s] blur-xs"
    >
      <p
        class="text-xs font-serif text-fg-secondary rotate-90 origin-right transition-clr"
      >
        Scroll
      </p>
    </div>
  </div>
</template>
