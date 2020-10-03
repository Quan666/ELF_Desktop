import { UPDATE_RSS_LIST } from "./mutations-type";

export default {
  [UPDATE_RSS_LIST](state, payload) {
    // console.log(payload);
    state.RSSObjList = payload.res;
    // console.log(state.RSSObjList);
  },
};
