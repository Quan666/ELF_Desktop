export function Socket() {
  // 属性
  this.socket = "";

  // 方法
  Socket.prototype.init = (url) => {
    if (typeof WebSocket === "undefined") {
      alert("Your browser does not support WebSocket");
    } else {
      // 实例化
      this.socket = new WebSocket(url);

      console.log("初始化ing");
      console.log(this.socket);
      // console.log(url);
      this.socket.onopen = this.onopen;
      this.socket.onerror = this.onerror;
      this.socket.onmessage = this.onmessage;
      this.socket.onclose = this.onclick;
      console.log("初始化完毕");
    }
  };

  // 连接成功
  Socket.prototype.onopen = () => {
    console.log("WebSocket connected successfully");
    this.socket.send("ping");
    // setInterval(() => {
    //   this.socket.send("ping");
    // }, 3000);
  };

  // 连接关闭
  Socket.prototype.onclose = () => {
    console.log("WebSocket connection closed");
  };

  // 连接失败
  Socket.prototype.onerror = () => {
    console.log(this.socket);

    console.log("WebSocket connected failed");
  };

  // 连接成功后放回数据
  Socket.prototype.onmessage = (msg) => {
    console.log("Message from server: ", msg.data);
  };

  // 发送数据
  Socket.prototype.send = (msg) => {
    this.socket.send(msg);
  };
}
