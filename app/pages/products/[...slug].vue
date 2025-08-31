<script setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('products').path(route.path).first();
});
</script>

<template>
  <div>
    <div v-if="page" :value="page">
      <nx-meta-tags
        :title="page.title"
        :description="page.description"
        :image="page.meta.image.src"
      ></nx-meta-tags>

      <nx-hero :data="page" image-position="bottom"></nx-hero>

      <section class="section-y">
        <div class="contain">
          <article class="content">
            <content-renderer v-if="page" :value="page"></content-renderer>
          </article>
        </div>
      </section>
    </div>

    <div v-else>
      <nx-error></nx-error>
    </div>
  </div>
</template>
