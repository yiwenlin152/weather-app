<template>
  <div
    class="mt-10 max-h-[300px] overflow-y-scroll scrollbar-thin hover:scroll-thumb-blue-300"
    v-if="savedCities.length"
  >
    <ul>
      <li
        class="flex mb-4 justify-between"
        @mouseenter="showBtn = true"
        @mouseleave="showBtn = false"
        v-for="(item, index) in savedCities"
        :key="item.lives[0].adcode"
      >
        <div
          class="flex bg-weather-secondary px-4 py-2 justify-between cursor-pointer duration-300"
          :class="{ 'w-4/5': showBtn, 'w-full': !showBtn }"
        >
          <span>{{ item.lives[0].city }}</span>
          <span>{{ item.lives[0].temperature }}度</span>
        </div>
        <div class="flex justify-between gap-2 cursor-pointer" v-show="showBtn">
          <button
            class="bg-yellow-500 w-[80px]"
            @click="toResCity(item.lives[0].adcode, item.lives[0].city)"
          >
            查看
          </button>
          <button class="bg-yellow-500 w-[80px]" @click="delCity(index)">
            删除
          </button>
        </div>
      </li>
    </ul>
  </div>
  <h1 class="text-center duration-200" v-else>
    暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。
  </h1>
</template>

<script setup>
import { ref } from "vue";
import { getLives } from "../api";
import { useRouter } from "vue-router";
let showBtn = ref(false);
let savedCities = ref([]);
const router = useRouter();
// 获取收藏的城市天气
async function getSavedCities() {
  if (!JSON.parse(localStorage.getItem("savedCities"))) {
    return;
  }
  let arr = [];
  JSON.parse(localStorage.getItem("savedCities")).forEach((item) => {
    arr.push(getLives(item.adcode));
  });
  savedCities.value = await Promise.all(arr);
}
// 删除选中的城市
function delCity(index) {
  // 在前端视图中删除
  savedCities.value.splice(index, 1);
  // 在本地存储中删除
  let arr = JSON.parse(localStorage.getItem("savedCities"));
  arr.splice(index, 1);
  localStorage.setItem("savedCities", JSON.stringify(arr));
}
// 跳转到搜索城市的信息页
function toResCity(adcode, name) {
  router.push(`/weather/${adcode}?search=${name}`);
}
await getSavedCities();
</script>

<style lang="scss" scoped>
li {
  &:hover .info {
    width: 80%;
  }
  &:hover .btn {
    display: flex;
  }
}
</style>
