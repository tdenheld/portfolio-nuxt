<script setup>
const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').all()
);
</script>

<template>
  <div>
    <nx-meta-tags title="Projects"></nx-meta-tags>

    <nx-hero
      :data="{
        title: 'Projects',
        description:
          'You can create server-rendered applications that are optimized for search engines and social media platforms.',
      }"
    ></nx-hero>

    <section class="section-y section--tight">
      <div class="contain">
       
      </div>
    </section>
  </div>
</template>
