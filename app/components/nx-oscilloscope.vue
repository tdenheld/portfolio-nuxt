<script setup lang="ts"></script>

<template>
  <div class="relative size-full rounded-lg border border-fg-secondary/25">
    <div
      class="absolute inset-0 flex justify-between"
      v-for="grid in 2"
      :key="grid"
      :class="{ 'flex-col': grid === 1 }"
    >
      <div
        v-for="line in 7"
        :key="line"
        class="border-fg-secondary/10 first:invisible last:invisible nth-[4]:border-fg-primary/60 nth-[4]:border-dashed"
        :class="{ 'border-t': grid === 1, 'border-l': grid === 2 }"
      ></div>
    </div>
  </div>
</template>
