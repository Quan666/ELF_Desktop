import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./plugins/AntDesign";
import x2js from "x2js"; //xml数据处理插件
Vue.prototype.$x2js = new x2js(); //创建x2js对象，挂到vue原型上

import "assets/css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
