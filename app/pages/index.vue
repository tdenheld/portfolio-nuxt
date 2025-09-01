<script setup>
const page = await queryCollection('content').path('/').first();

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').all()
);
</script>

<template>
  <div>
    <nx-meta-tags></nx-meta-tags>

    <section class="section-y">
      <div class="contain">
        <nx-hero :data="page"></nx-hero>
      </div>
    </section>
  </div>
</template>
