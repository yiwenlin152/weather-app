import request from "./axios";
const key = 'xxxxx' //高德api个人密钥

// 根据ip地址获取当前城市信息
export const getCity = () =>
  request.get(`/ip?key=${key}`);

// 根据城市名获取adcode
export const getCode = (city) =>
  request.get(
    `/geocode/geo?address=${city}&key=${key}`
  );

// 根据adcode获取实时天气
export const getLives = (adcode) =>
  request.get(
    `/weather/weatherInfo?city=${adcode}&key=${key}&extensions=base`
  );

// 根据adcode获取天气预报
export const getCast = (adcode) =>
  request.get(
    `/weather/weatherInfo?city=${adcode}&key=${key}&extensions=all`
  );
