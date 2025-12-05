<script setup lang="ts">
const fromHome = useState('fromHome');
const projectIndex = useState<number>('projectIndex');

const page = await queryCollection('content').path('/').first();
const projects = await queryCollection('projects').all();

const newPage = page ? { ...page, path: undefined } : null;
const mergedData = [...(newPage ? [newPage] : []), ...(projects || [])];

onBeforeMount(() => {
  fromHome.value = true;
  projectIndex.value = 0;
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
