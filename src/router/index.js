import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("views/home/Home");

// 安装
Vue.use(VueRouter);

// 创建
const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
];
const router = new VueRouter({
  routes,
  // mode: "history",
});

export default router;
