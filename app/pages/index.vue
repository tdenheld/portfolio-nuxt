<script setup>
const page = await queryCollection('content').path('/').first();

const { data: products } = await useAsyncData('products', () =>
  queryCollection('products').all()
);
</script>

<template>
  <div>
    <nx-meta-tags></nx-meta-tags>
    <nx-hero :data="page"></nx-hero>

    <section class="section-y">
      <div class="contain">


        <ul class="card-grid mt-12">
          <li v-for="entry in products" :key="entry.path">
            <nx-card :data="entry"></nx-card>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
