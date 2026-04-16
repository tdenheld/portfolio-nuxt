<script setup lang="ts">
const fromHome = useState('fromHome', () => null);
const refresh = useState('refresh', () => true);
const projectIndex = useState('projectIndex', () => 0);

const counterData = useState<{
  highlights?: any[];
  visit?: string;
  pdp?: boolean;
} | null>('counterData', () => null);

const route = useRoute();
const projects = await queryCollection('projects').all();
const isProjectDetail = computed(() => /^\/projects\/.+/.test(route.path));

const getImages = () => {
  // Return an array of all images from the data array
  return projects
    .map((entry) => entry.meta?.image)
    .filter((img): img is string => !!img);
};

onMounted(() => {
  refresh.value = true;
});

// prettier-ignore
watch(() => route.path, () => {
  refresh.value = false;
});
</script>

<template>
  <div>
    <nx-nav></nx-nav>
    <div class="fixed inset-0 bg-bg-primary transition-colors duration-1500 [will-change:background-color]"></div>
    <nx-blobs></nx-blobs>
    <!-- <nx-gradient></nx-gradient> -->

    <main class="relative">
      <slot></slot>

      <nx-counter
        v-if="counterData && (route.path === '/' || isProjectDetail)"
        :class="{ 'hidden lg:block': counterData.pdp }"
        :index="projectIndex"
        :images="getImages()"
        :length="projects.length + 1"
        :highlights="counterData.highlights"
        :visit="counterData.visit"
        :pdp="counterData.pdp"
      ></nx-counter>
    </main>

    <nx-rotate-device></nx-rotate-device>
    <nx-preloader></nx-preloader>
    <nx-veil></nx-veil>
  </div>
</template>
