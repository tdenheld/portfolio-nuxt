<script setup lang="ts">
const page = await queryCollection('content').path('/').first();
const projects = await queryCollection('projects').all();

const newPage = page ? { ...page, path: undefined } : null;
const mergedData = [...(newPage ? [newPage] : []), ...(projects || [])];
</script>

<template>
  <div>
    <nx-meta-tags></nx-meta-tags>
    <nx-carousel :data="mergedData" :description="page?.description"></nx-carousel>

    <div class="fixed inset-x-0 bottom-contain px-contain lg:main-grid z-raised">
      <div class="col-start-2 h-full">
        <p
          class="text-[0.625rem] sm:text-xs lg:text-sm w-[32ch] text-fg-secondary transition-color duration-500"
        >
          {{ page?.description }}
        </p>
      </div>
    </div>
  </div>
</template>
