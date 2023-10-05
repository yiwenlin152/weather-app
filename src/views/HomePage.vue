<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <!-- 天气搜索框 -->
      <input
        type="text"
        placeholder="请输入城市名称"
        class="py-2 px-1 w-full border-b bg-transparent focus:outline-none focus:border-weather-secondary focus:shadow-md"
        v-model.trim="city"
        @input="searchCity(city)"
      />
      <!-- 搜索结果的展示 -->
      <ul
        class="absolute bg-weather-secondary w-full shadow-md top-[62px] px-1 py-2"
        v-show="city"
      >
        <p v-show="netErr">对不起网络似乎出了点问题 请稍后再查询</p>
        <p v-show="!netErr && resErr">似乎没有找到你查找的城市</p>
        <li
          class="py-2 cursor-pointer"
          v-for="(item, index) in resCity"
          :key="index"
          @click="toResCity(item.adcode, item.name)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- 展示保存的城市 -->
    <Suspense>
      <CityList v-if="!city" />
      <template #fallback>
        <h1 class="text-white text-center">天气信息加载中。。。</h1>
      </template>
    </Suspense>
    <!-- 展示本地天气预报 -->
    <div class="mt-6" v-if="store.curCast.length">
      <h1>近期天气</h1>
      <WeatherCard :type="0" v-if="store.curCast"/>
    </div>
    <h1 class="mt-6" v-else>天气预报正在加载中。。。</h1>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "../store";
import { getCode } from "../api";
import WeatherCard from "../components/WeatherCard.vue";
import CityList from "../components/CityList.vue";
const router = useRouter();
const store = useMainStore();
let city = ref("");
let resCity = ref([]);
let timer = ref(null);
let resErr = ref(false);
let netErr = ref(false);
// 搜索城市
function searchCity() {
  // 先清空
  resCity.value = [];
  resErr.value = false;
  netErr.value = false;
  //防抖操作
  clearTimeout(timer.value);
  timer.value = setTimeout(async () => {
    try {
      const res = await getCode(city.value);
      // 没有找到对应的城市
      if (res.status !== "1") {
        return (resErr.value = true);
      }
      resCity.value = res.geocodes.map((item) => {
        let _item = {};
        if (typeof item.district === "string") {
          _item.name = item.district;
        } else if (typeof item.city === "string") {
          _item.name = item.city;
        } else if (typeof item.province === "string") {
          _item.name = item.province;
        } else {
          _item.name = "";
        }
        _item.adcode = item.adcode;
        return _item;
      });
    } catch (error) {
      // 网络不好
      netErr.value = true;
    }
  }, 500);
}
// 跳转到搜索城市的信息页
function toResCity(adcode, name) {
  router.push(`/weather/${adcode}?search=${name}`);
}
// 首页中默认不展示收藏按钮
store.isSaved = true;
</script>

<style lang="scss" scoped></style>
