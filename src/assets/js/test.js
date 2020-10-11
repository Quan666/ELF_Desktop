import { Socket } from "./websocket";
console.log("test");
var ws = new Socket();

// ws.init("ws://localhost:8080");

let ws2 = new WebSocket("ws://127.0.0.1:8765");
ws2.onopen = function(evt) {
  console.log("Connection open ...");
  ws2.send("Hello WebSockets!");
};

ws2.onmessage = function(evt) {
  console.log("Received Message: " + evt.data);
  ws2.close();
};

ws2.onclose = function(evt) {
  console.log("Connection closed.");
};

setTimeout(() => {
  console.log(ws2.readyState);
}, 5000);
