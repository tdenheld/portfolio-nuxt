<script setup>
const page = await queryCollection('content').path('/about').first();
</script>

<template>
  <div>
    <nx-meta-tags
      :title="page.title"
      :description="page.description"
    ></nx-meta-tags>

    <nx-hero :data="page"></nx-hero>

    <section class="section-y">
      <div class="contain">
        <article class="content">
          <content-renderer v-if="page" :value="page"></content-renderer>
        </article>
      </div>
    </section>
  </div>
</template>
