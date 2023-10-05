<template>
  <div class="bg-weather-secondary mt-2 pt-10 px-12 rounded">
    <div class="flex gap-6">
      <div
        class="flex-1 flex flex-col gap-4 text-center"
        v-for="(item, index) in cityCast"
        :key="index"
      >
        <span>{{ item.week }}</span>
        <span>{{ item.date }}</span>
        <span>{{ item.weather }}</span>
        <span>风力&nbsp;{{ item.daypower }}级</span>
      </div>
    </div>
    <div class="chart mt-10 h-40"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useMainStore } from "../store";
import * as echarts from "echarts";
const props = defineProps(["type"]);
const store = useMainStore();
const cityCast = ref([])
const weekList = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const option = ref({})
// 格式化天气预报信息
function formatInfo(cast){
  return cast.map((item, index) => {
    let _item = {};
    _item.date = item.date.split("-")[1] + "-" + item.date.split("-")[2];
    if (index === 0) {
      _item.week = "今天";
    } else if (index === 1) {
      _item.week = "明天";
    } else {
      _item.week = weekList[+item.week - 1];
    }
    _item.daytemp = item.daytemp;
    _item.nighttemp = item.nighttemp;
    _item.weather = item.dayweather;
    _item.daypower = item.daypower;
    return _item;
  });
};
// 绘制折线图
function renderChart(cast){
  const dayTempList = cast.map((item) => {
    return item.daytemp;
  });
  const nightTempList = cast.map((item) => {
    return item.nighttemp;
  });
  option.value = {
    xAxis: {
      type: "category",
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    grid: {
      left: 0,
      top: "15%",
      right: 0,
      bottom: 0,
    },
    series: [
      {
        name: "白",
        type: "line",
        data: dayTempList,
        smooth: true,
        label: {
          show: true,
          color: "#fff",
          formatter: (params) => {
            return params.seriesName + params.data + "°C";
          },
        },
      },
      {
        name: "晚",
        type: "line",
        data: nightTempList,
        smooth: true,
        label: {
          show: true,
          position: "bottom",
          color: "#fff",
          formatter: "晚{c}°C",
        },
      },
    ],
  };
};
// 判断传进来的是实时天气(type=0)还是预报天气(type=1)
if(props.type===0){
  cityCast.value = store.curCast
  renderChart(formatInfo(store.curCast))
}else{
  cityCast.value = store.resCast
  renderChart(formatInfo(store.resCast))
}
onMounted(() => {
  let chart = echarts.init(document.querySelector(".chart"));
  chart.setOption(option.value);
});
</script>

<style lang="scss" scoped></style>
