<script setup>
const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').all()
);
</script>

<template>
  <div>
    <nx-meta-tags title="Projects"></nx-meta-tags>
  </div>
</template>
