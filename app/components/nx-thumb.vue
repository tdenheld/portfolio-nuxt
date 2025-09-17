<script setup lang="ts">
const props = defineProps<{
  src?: string;
}>();
</script>

<template>
  <div class="w-32">
    <nx-image
      :src="
        src ||
        'https://res.cloudinary.com/tibor/image/upload/v1758128623/ns-02_ifft7l.png'
      "
    ></nx-image>
  </div>
</template>
