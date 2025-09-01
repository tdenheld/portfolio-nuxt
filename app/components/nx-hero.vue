<script setup>
const props = defineProps({
  data: Object,
  imagePosition: { type: String, default: 'right' },
});
</script>

<template>
  <div class="section">
    <div class="contain">
      <h1 class="heading-xl font-display tracking-normal">{{ props.data.title }}</h1>
      <p class="intro mt-6">{{ props.data.description }}</p>
    </div>
  </div>
</template>