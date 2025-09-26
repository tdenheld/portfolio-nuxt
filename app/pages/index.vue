<script setup lang="ts">
const page = await queryCollection('content').path('/').first();
const projects = await queryCollection('projects').all();

const newPage = page ? { ...page, path: undefined } : null;
const mergedData = [...(newPage ? [newPage] : []), ...(projects || [])];
</script>

<template>
  <div>
    <nx-meta-tags></nx-meta-tags>
    <nx-carousel :data="mergedData"></nx-carousel>
  </div>
</template>
