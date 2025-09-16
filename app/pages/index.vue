<script setup lang="ts">
const page = await queryCollection('content').path('/').first();
const projects = await queryCollection('projects').all();

const newPage = page ? { ...page, path: undefined } : null;
const mergedData = [...(newPage ? [newPage] : []), ...(projects || [])];
</script>

<template>
  <div>
    <nx-meta-tags></nx-meta-tags>

    <div class="fixed inset-0 p-contain lg:main-grid z-raised pointer-events-none">
      <div class="col-start-2 h-full">
        <div
          class="invisible lg:visible absolute top-[calc(var(--spacing-contain)+14px)] font-mono text-[10px] text-fg-secondary tracking-wider"
        >
          Netherlands, <nx-time></nx-time>
        </div>

        <p
          class="absolute bottom-contain text-xs md:text-sm w-[32ch] text-fg-secondary"
        >
          {{ page?.description }}
        </p>
      </div>
    </div>

    <nx-carousel :data="mergedData"></nx-carousel>
  </div>
</template>
