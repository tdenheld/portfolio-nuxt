<script setup lang="ts"></script>

<template>
  <nav class="fixed inset-x-0 z-navigation pt-contain px-contain">
    <nx-logo class="relative z-raised"></nx-logo>

    <div
      class="hidden lg:main-grid fixed inset-x-0 px-contain top-[calc(var(--spacing-contain)+14px)]"
    >
      <p class="col-start-2 font-mono text-[10px] text-fg-secondary tracking-wider">
        Netherlands, <nx-time></nx-time>
      </p>
    </div>
  </nav>
</template>
