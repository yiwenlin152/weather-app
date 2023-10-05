<template>
  <div class="flex flex-col text-white">
    <div class="text-center p-2 bg-weather-secondary">
      你正在预览{{ route.query.search }}的天气信息
      <span v-if="!store.isSaved">，可以通过右上角的"+"号按钮保存起来</span>
    </div>
    <!-- 展示搜索城市当日天气 -->
    <div class="container flex flex-col text-center mt-6 gap-4">
      <h3>当日气温是：{{ resLives.temperature }}摄氏度</h3>
      <h3>当日天气是：{{ resLives.weather }}</h3>
      <h3>当日风向是：{{ resLives.winddirection }}风</h3>
      <h3>当日风力是：{{ resLives.windpower }}级</h3>
    </div>
    <div class="mt-6 border-b border-white/10"></div>
    <!-- 展示搜索城市预报天气 -->
    <div class="container">
      <WeatherCard :type="1" v-if="store.resCast"/>
    </div>
  </div>
</template>

<script setup>
import WeatherCard from "../components/WeatherCard.vue";
import { ref } from "vue";
import { useMainStore } from "../store";
import { useRoute } from "vue-router";
import { getLives, getCast } from "../api";
const store = useMainStore();
const route = useRoute();
let resLives = ref("");
// 获取实时天气
const res1 = await getLives(route.params.adcode);
resLives.value = res1.lives[0];
// 获取预报天气
const res2 = await getCast(route.params.adcode);
store.setSearchCast(res2.forecasts[0].casts);
</script>

<style lang="scss" scoped></style>
