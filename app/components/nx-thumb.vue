<script setup lang="ts">
const props = defineProps<{
  src?: string;
}>();
</script>

<template>
  <div class="w-48 aspect-video rounded-lg overflow-hidden">
    <nx-image v-if="src" :src="src"></nx-image>
  </div>
</template>
