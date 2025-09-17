<script setup lang="ts">
const page = await queryCollection('content').path('/').first();
const projects = await queryCollection('projects').all();

const newPage = page ? { ...page, path: undefined } : null;
const mergedData = [...(newPage ? [newPage] : []), ...(projects || [])];
</script>

<template>
  <div>
    <nx-meta-tags></nx-meta-tags>

    <div class="fixed inset-x-0 bottom-contain px-contain lg:main-grid z-raised">
      <div class="col-start-2 h-full">
        <p class="text-xs md:text-sm w-[32ch] text-fg-secondary">
          {{ page?.description }}
        </p>
      </div>
    </div>

    <nx-carousel :data="mergedData"></nx-carousel>
  </div>
</template>
