<script setup lang="ts"></script>

<template>
  <nav class="fixed inset-x-0 z-navigation pt-contain px-contain grid grid-cols-[max-content_1fr] lg:main-grid">
    <nx-logo></nx-logo>

    <div class="hidden lg:block col-start-2 relative top-1">
      <p class="font-mono text-[10px] text-fg-secondary tracking-wider transition-fg">
        Netherlands, <nx-time></nx-time>
      </p>
    </div>

    <ul
      class="text-xs text-fg-secondary uppercase tracking-[0.16em] justify-end flex items-center gap-6 md:gap-12"
    >
      <li>About</li>
      <li>Work</li>
      <li>Gallery</li>
    </ul>
  </nav>
</template>
