import X2JS from "x2js"; //xml数据处理插件
import moment from "moment";

export function xml2json(xml) {
  let jsonObj = new X2JS().xml2js(xml);
  return jsonObj;
}

export function RSS_subscription(url) {
  let socket = new Socket();

  // 重写实例的onmessage函数
  socket.__proto__.onmessage = (msg) => {
    // currentTime = moment().format("LTS");
    console.log(CurrentTime(), "Message from server: ");
    // console.log(msg.data);

    // 处理数据
    new Response(msg.data).text().then((value) => {
      let data = callBack(value);
      console.log("获取数据成功", data);
    });
  };

  // 重写实例的onopen函数

  // 初始化
  socket.init(`${WebSocketUri}${url}`);

  // onmessage 回调函数
  const callBack = xml2json;
}

export function CurrentTime() {
  return moment().format("LTS");
}
