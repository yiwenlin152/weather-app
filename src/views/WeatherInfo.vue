<template>
  <Suspense>
    <AsyncWeatherInfo />
    <template #fallback>
      <h1 class="text-white text-center text-lg">
        天气信息加载中...
      </h1>
    </template>
  </Suspense>
</template>

<script setup>
import AsyncWeatherInfo from "../components/AsyncWeatherInfo.vue";
</script>

<style lang="scss" scoped></style>
