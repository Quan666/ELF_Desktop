let config = {
  RSS: ["https://rss.shab.fun/twitter/user/key_official/exclude_rts"],
  port: 8765,
  CheckUpdateTime: 5,
};

//检查更新时间 ms
export const CheckUpdateTime = config.CheckUpdateTime * 60 * 1000;

//配置 WebSocket 服务器
export const WebSocketUri = `ws://localhost:${config.port}/`;

// RSS列表
export const RSS = config.RSS;
