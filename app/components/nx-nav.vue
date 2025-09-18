<script setup lang="ts"></script>

<template>
  <nav
    class="fixed inset-x-0 z-navigation pt-contain px-contain lg:main-grid"
  >
    <div>
      <nx-logo></nx-logo>
    </div>

    <div
      class="hidden lg:block col-start-2 absolute top-[calc(var(--spacing-contain)+14px)]"
    >
      <p class="font-mono text-[10px] text-fg-secondary tracking-wider transition-fg">
        Netherlands, <nx-time></nx-time>
      </p>
    </div>
  </nav>
</template>
