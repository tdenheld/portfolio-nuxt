<template>
  <div class="veil" aria-hidden="true">
    <div class="veil-overlay"></div>
  </div>
</template>

<style scoped>
.veil {
  display: none;
}

/* -webkit-touch-callout matches iOS only; -apple-system-body also matches macOS Safari */
@supports (-webkit-touch-callout: none) or (font: -apple-system-body) {
  .veil {
    position: sticky;
    top: 0;
    z-index: var(--z-index-veil);
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
