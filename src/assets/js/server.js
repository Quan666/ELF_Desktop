// 加载node上websocket模块 ws;
var ws = require("ws");

// 启动基于websocket的服务器,监听我们的客户端接入进来。
var server = new ws.Server({
  host: "127.0.0.1",
  port: 8765,
});

// 监听接入进来的客户端事件
function websocket_add_listener(client_sock) {
  // close事件
  client_sock.on("close", function() {
    console.log("client close");
  });

  // error事件
  client_sock.on("error", function(err) {
    console.log("client error", err);
  });
  // end

  // message 事件, data已经是根据websocket协议解码开来的原始数据；
  // websocket底层有数据包的封包协议，所以，绝对不会出现粘包的情况。
  // 每解一个数据包，就会触发一个message事件;
  // 不会出现粘包的情况，send一次，就会把send的数据独立封包。
  // 如果我们是直接基于TCP，我们要自己实现类似于websocket封包协议就可以完全达到一样的效果；
  client_sock.on("message", function(data) {
    console.log(data);
    client_sock.send("Thank you!");
  });
  // end
}

// connection 事件, 有客户端接入进来;
function on_server_client_comming(client_sock) {
  console.log("client comming");
  websocket_add_listener(client_sock);
}

server.on("connection", on_server_client_comming);

// error事件,表示的我们监听错误;
function on_server_listen_error(err) {}
server.on("error", on_server_listen_error);

// headers事件, 回给客户端的字符。
function on_server_headers(data) {
  // console.log(data);
}
server.on("headers", on_server_headers);
