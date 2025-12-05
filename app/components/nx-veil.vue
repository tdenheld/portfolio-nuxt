<template>
  <div class="veil" aria-hidden="true">
    <div class="veil-overlay"></div>
  </div>
</template>

<style scoped>
.veil {
  display: none;
}

@supports (-webkit-touch-callout: none) {
  .veil {
    position: sticky;
    top: 0;
    z-index: 9999;
    display: block;
    pointer-events: none;
  }
  .veil-overlay {
    position: fixed;
    inset: 0;
    opacity: 0;
    backdrop-filter: blur(1px);
  }
}
</style>
