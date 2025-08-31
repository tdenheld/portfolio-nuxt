<script setup>
const { data: products } = await useAsyncData('products', () =>
  queryCollection('products').all()
);
</script>

<template>
  <div>
    <nx-meta-tags title="Products"></nx-meta-tags>

    <nx-hero
      :data="{
        title: 'Products',
        description:
          'You can create server-rendered applications that are optimized for search engines and social media platforms.',
      }"
    ></nx-hero>

    <section class="section-y section--tight">
      <div class="contain">
        <ul class="card-grid">
          <li v-for="entry in products" :key="entry.path">
            <nx-card :data="entry"></nx-card>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
