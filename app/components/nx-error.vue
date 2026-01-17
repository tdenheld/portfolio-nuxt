<template>
  <div>
    <nx-meta-tags title="404"></nx-meta-tags>

    <div class="pt-48 lg:pt-72 px-contain">
      <div class="grid justify-center text-center">
        <h1
          class="font-semibold text-[calc(24px+4.5vw)] leading-[1.1] font-display max-w-[18ch]"
        >
          Oops!
        </h1>

        <p class="mt-6 text-lg text-fg-secondary">
          We couldn't find the page you were looking for
        </p>

        <p class="text-xs mt-2 font-mono">Error code: 404</p>

        <p class="mt-8">
          <nuxt-link to="/" class="button">Go home</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>
