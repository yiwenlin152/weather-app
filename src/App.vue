<template>
  <div class="bg-weather-primary min-h-screen flex flex-col">
    <TopNav />
    <router-view></router-view>
  </div>
</template>

<script setup>
import TopNav from "./components/TopNav.vue";
</script>

<style lang="scss" scoped>
</style>
