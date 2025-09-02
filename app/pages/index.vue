<script setup>
const page = await queryCollection('content').path('/').first();
</script>

<template>
  <div>
    <nx-meta-tags></nx-meta-tags>

    <nx-hero :data="page"></nx-hero>
  </div>
</template>
