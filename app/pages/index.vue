<script setup lang="ts">
const page = await queryCollection('content').path('/').first();

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').all()
);

const newPage = page
  ? {
      ...Object.fromEntries(
        Object.entries(page).filter(
          ([key]) => key !== 'path'
        )
      ),
      meta: {}, // Ensure `meta` exists
      title: page.title || 'Untitled', // Provide a default title
    }
  : null;

const sortedProjects = projects.value?.sort(
  (a, b) => (Number(a.meta.sort) || 0) - (Number(b.meta.sort) || 0)
);

const mergedData = [...(newPage ? [newPage] : []), ...(sortedProjects || [])];
</script>

<template>
  <div>
    <nx-meta-tags></nx-meta-tags>

    <div class="lg:main-grid fixed p-contain inset-0">
      <div class="col-start-2 h-full">
        <div
          class="invisible lg:visible absolute top-[calc(var(--spacing-contain)+14px)] font-mono text-[10px] text-fg-secondary tracking-wider"
        >
          Netherlands, <nx-time></nx-time>
        </div>

        <div class="h-full grid items-center">
          <div class="pb-12">
            <nx-carousel :data="mergedData"></nx-carousel>
          </div>
        </div>

        <p class="absolute bottom-contain text-sm w-[280px] text-fg-secondary">
          {{ page?.description }}
        </p>
      </div>
    </div>
  </div>
</template>
