import { defineStore } from "pinia";
import { ref } from "vue";

const useMainStore = defineStore("main", () => {
  // 定义当前ip所在天气预测信息
  let curCast = ref([]);
  // 获取搜索城市的天气预测信息
  let resCast = ref([]);
  // 定义当前城市是否在收藏列表中
  let isSaved = ref(false);

  // 获取当前ip地区天气预报
  const setCurCast = (cast) => {
    curCast.value = cast;
  };

  // 获取查找城市的天气预报
  const setSearchCast = (cast) => {
    resCast.value = cast;
  };

  return {
    curCast,
    resCast,
    isSaved,
    setCurCast,
    setSearchCast,
  };
});

export { useMainStore };
