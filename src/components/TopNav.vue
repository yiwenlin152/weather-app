<template>
  <header class="bg-weather-primary shadow-lg sticky top-0 z-10">
    <nav
      class="container py-6 flex flex-col gap-4 text-white items-center sm:flex-row max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
    >
      <router-link to="/">
        <div class="flex gap-3 items-center">
          <i class="fa-solid fa-sun text-2xl"></i>
          <h1 class="text-2xl">天气预报</h1>
        </div>
      </router-link>
      <!-- 本地天气展示 -->
      <Suspense>
        <LocalWeather />
        <template #fallback>
          <h1>天气信息正在努力加载中。。。</h1>
        </template>
      </Suspense>
      <div class="flex-1 justify-end flex gap-3">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary cursor-pointer duration-1000"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary cursor-pointer duration-150"
          v-if="!store.isSaved"
          @click="saveCity"
        ></i>
      </div>
      <!-- 弹出的info框-->
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <InfoModal
          class="text-black"
          v-show="modalActive"
          @toggleModal="toggleModal"
        >
          <h2>关于:</h2>
          <p class="text-xs mb-4">这个应用可以用来追踪你选择城市的当前天气</p>
          <h2>如何使用:</h2>
          <p class="text-xs mb-4">
            1.点击搜索框输入你希望追踪的城市<br />
            2.在搜索结果中选中一个城市，你将获取当地最新的天气<br />
            3.点击右侧的＋号可以将追踪城市的天气情况保存在首页
          </p>
          <h2>移除城市:</h2>
          <p class="text-xs">
            如果你不想在首页关注某个城市,可以通过底部的按钮删<br />除它
          </p>
        </InfoModal>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useMainStore } from "../store";
import InfoModal from "./InfoModal.vue";
import LocalWeather from "./LocalWeather.vue";
import { uid } from "uid";
const route = useRoute();
const store = useMainStore();
let modalActive = ref(false);
function toggleModal() {
  modalActive.value = !modalActive.value;
}
watch(
  () => route.params.adcode,
  () => {
    store.isSaved = JSON.parse(localStorage.getItem("savedCities"))?.some(
      (item) => item.adcode === route.params.adcode
    );
  }
);
// 收藏城市天气
function saveCity() {
  store.isSaved = true;
  let arr = JSON.parse(localStorage.getItem("savedCities")) || []
  arr.push({
    id: uid(),
    name: route.query.search,
    adcode: route.params.adcode,
  });
  localStorage.setItem("savedCities", JSON.stringify(arr));
}
</script>

<style lang="scss" scoped></style>
