<script setup>
const page = await queryCollection('content').path('/about').first();
</script>

<template>
  <div v-if="page">
    <nx-meta-tags :title="page.title" :description="page.description"></nx-meta-tags>

    <div class="pt-32 lg:pt-64 px-contain mx-auto max-w-3xl">
      <h1 class="sr-only">{{ page.title }}</h1>

      <p class="max-w-lg text-fg-secondary text-lg md:text-xl">
        {{ page.description }}
      </p>
    </div>
  </div>
</template>
