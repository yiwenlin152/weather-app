import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: '/weather/:adcode',
      name: 'weather',
      component: () => import ('../views/WeatherInfo.vue'),
    }
  ],
});

export default router;
