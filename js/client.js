function WebSocketGetHttp(HttpUrl, CallBack) {
    if ("WebSocket" in window) {
        // 打开一个 web socket
        var ws = new WebSocket(WebSocketUri + HttpUrl);

        ws.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            ws.send("");
            //alert("数据发送中...");
        };

        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            //解析返回的数据
            (new Response(received_msg)).text().then(function (value) {
                //去掉奇怪的符号
                //value = value.replace("]]>","");
                //value = value.replace("<![CDATA[","");
                //调用回调函数
                CallBack(value);
            });
        };

        ws.onclose = function () {
        };
    } else {
        alert("您的浏览器不支持 WebSocket!");
    }
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}