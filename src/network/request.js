import axios from "axios";
// import {
//   CheckUpdateTime
// } from "../../config"

// export function pt() {
//   console.log(CheckUpdateTime);
// }


export function request(config) {
  // 1.创建实例
  const instance = axios.create({
    // 注意大写
    // baseURL:'',
    timeout: 5000
  });

  return instance(config);
}