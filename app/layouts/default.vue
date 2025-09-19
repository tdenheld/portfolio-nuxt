<script setup>
import svgLogo from '../assets/images/logo.svg?component';
</script>

<template>
  <div>
    <nx-nav></nx-nav>

    <main>
      <slot></slot>
    </main>

    <div
      class="fixed inset-0 bg-[#3c796b] z-[999] pointer-events-none grid place-content-center a a-fo"
    >
      <svg-logo class="w-12 text-[#cdd388]"></svg-logo>
    </div>
  </div>
</template>
