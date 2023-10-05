<template>
  <div
    class="w-full px-8 bg-black bg-opacity-30 fixed top-0 left-0 h-screen flex justify-center z-20"
  >
    <div class="mt-32 bg-white p-4 self-start">
      <slot />
      <button
        class="text-white bg-weather-primary py-2 px-6 text-xs mt-8"
        @click="$emit('toggleModal')"
      >
        关闭
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
