import { config } from "../../../config";

//检查更新时间 ms
export const CheckUpdateTime = config.CheckUpdateTime * 60 * 1000;

//配置 WebSocket 服务器
export const WebSocketUri = `ws://localhost:${config.port}/`;

// RSS列表
export const RSS = config.RSS;

//显示的 RSS 条数
export const MaxRSSItem = config.MaxRSSItem;
