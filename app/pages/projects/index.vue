<script setup>
const projects = await queryCollection('projects').all();
</script>

<template>
  <div>
    <nx-meta-tags title="Projects"></nx-meta-tags>
  </div>
</template>
