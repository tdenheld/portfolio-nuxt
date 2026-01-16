<template>
  <div
    class="s-rotate bg-bg-primary"
  >
    <p class="font-extrabold font-display text-4xl text-center leading-tight text-elevated">
      Draai apparaat
    </p>
  </div>
</template>

<style scoped lang="postcss">
.s-rotate {
  display: none;
  position: fixed;
  inset: 0;
  place-content: center;
  z-index: 9999;

  @media (height < 36rem) and (aspect-ratio >= 3/2) {
    display: grid;
  }
}
</style>
