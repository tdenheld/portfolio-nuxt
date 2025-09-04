<script setup>
const props = defineProps({
  data: Object,
});
</script>

<template>
  <div class="lg:main-grid fixed p-contain inset-0">
    <div class="col-start-2 h-full">
      <div class="invisible lg:visible absolute top-[calc(var(--spacing-contain)+14px)] font-mono text-[10px] text-fg-secondary tracking-wider">
        Netherlands, <nx-time></nx-time>
      </div>

      <div class="h-full grid items-center">
        <div>
          <p class="font-serif text-xl md:text-[28px] text-fg-secondary">
            {{ props.data.meta.name }}
          </p>

          <h1
            class="mt-1 font-semibold text-[calc(24px+4.5vw)] leading-[1.1] font-display max-w-[18ch]"
          >
            {{ props.data.title }}
          </h1>
        </div>
      </div>

      <p class="absolute bottom-contain text-sm w-[280px] text-fg-secondary">
        {{ props.data.description }}
      </p>
    </div>
  </div>
</template>
