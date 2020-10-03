import Vuex from "vuex";
import Vue from "vue";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);
Vue.prototype.$bus = new Vue();

const state = {
  RSSObjList: [],
  currentItem: [0, 0],
};
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

export default store;
