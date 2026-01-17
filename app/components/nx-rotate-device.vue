<template>
  <div class="s-rotate bg-preloader-bg text-preloader-fg">
    <p
      class="relative font-extrabold font-display text-4xl text-center leading-tight text-elevated"
    >
      Rotate device
    </p>
  </div>
</template>

<style scoped lang="postcss">
.s-rotate {
  display: none;
  position: fixed;
  inset: 0;
  place-content: center;
  z-index: 998;

  @media (height < 36rem) and (aspect-ratio >= 3/2) {
    display: grid;
  }
}
</style>
