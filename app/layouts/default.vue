<template>
  <div>
    <nx-nav></nx-nav>
    <div class="fixed inset-0 bg-bg-primary transition duration-1500"></div>

    <main>
      <slot></slot>
    </main>

    <nx-preloader></nx-preloader>
  </div>
</template>
