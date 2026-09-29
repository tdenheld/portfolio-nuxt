<script setup>
const page = await queryCollection('pages').path('/fun').first();
usePageColor(() => page.color);
</script>

<template>
  <div class="p-contain">
    <div class="lg:main-grid">
      <div class="py-48 col-start-2">
        <h1 class="text-xl text-fg-secondary">{{ page.title }}</h1>

        <div class="pt-8">
          <ul>
            <li v-for="item in page.links" :key="item.url">
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[calc(3.3vw+1.5rem)] font-bold inline-block py-6 lg:py-8 leading-none"
                >{{ item.label }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
