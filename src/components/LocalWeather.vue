<template>
    <div class="flex gap-4 items-center">
        <span class="text-lg">{{city}}</span>
        <span class="text-sm">实时天气:{{curLives.weather}} {{curLives.temperature}}°C</span>
        <span class="text-sm">{{curLives.winddirection}}风{{curLives.windpower}}级</span>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getCity, getLives, getCast } from '../api';
import {useMainStore} from '../store'
const store = useMainStore()
let city = ref('')
let adcode = ref('')
let curLives = ref([])
const res1 = await getCity()
city.value = res1.city
adcode.value = res1.adcode
//根据adcode获取本地的当日天气信息
const res2 = await getLives(adcode.value)
curLives.value = res2.lives[0]
//根据adcode获取本地的天气预报信息
const res3 = await getCast(adcode.value)
store.setCurCast(res3.forecasts[0].casts)
</script>

<style lang="scss" scoped>

</style>