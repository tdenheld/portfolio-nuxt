<script setup lang="ts">
const fromHome = useState('fromHome');
const page = await queryCollection('content').path('/').first();
const projects = await queryCollection('projects').all();

const newPage = page ? { ...page, path: undefined } : null;
const mergedData = [...(newPage ? [newPage] : []), ...(projects || [])];

onBeforeMount(() => {
  fromHome.value = true;
});
</script>

<template>
  <div>
    <nx-meta-tags></nx-meta-tags>
    
    <nx-carousel
      class="a-fi [animation-delay:100ms]"
      :data="mergedData"
    ></nx-carousel>
  </div>
</template>
