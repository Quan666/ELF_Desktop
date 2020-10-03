<!--  -->
<template>
  <div>
    <!-- 罩层 -->
    <div class="cover"></div>
    <div class="container-fluid">
      <!-- <div class="container"> -->
      <div>
        <div class="row">
          <div class="col-md-3">
            <Scroll class="wrapper" ref="sideBarScroll">
              <Sidebar @updateHeight="updateHeight" class="sidebar"></Sidebar>
            </Scroll>
          </div>
          <div class="col-md-5">
            <Scroll class="wrapper" ref="contentScroll">
              <Content></Content>
            </Scroll>
          </div>
          <div class="col-md-4">
            <div>
              <!-- {{ $store.getters.getRSSObjListLength }} -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 配置
import { WebSocketUri } from "assets/js/config";
import { UPDATE_RSS_LIST } from "store/mutations-type";

// 组件
import Sidebar from "./childHome/sidebar/Sidebar";
import Content from "./childHome/content/Content";
import Scroll from "components/common/Scroll";

// 工具
import { CurrentTime, xml2json } from "assets/js/utils";
import { RSS, CheckUpdateTime } from "assets/js/config";
import { Socket } from "assets/js/websocket";

// Swiper

export default {
  name: "Home",
  components: {
    Sidebar,
    Content,
    Scroll,
  },

  data() {
    return {
      RSSList: RSS,
      RSSDataList: [],
    };
  },
  created() {
    this.updateRSSInfo();
  },
  mounted() {},
  computed: {},

  methods: {
    updateHeight() {
      // console.log(1);
      this.$refs.sideBarScroll.refresh();
    },

    // 轮询
    updateRSSInfo() {
      console.log(CurrentTime());
      console.log("正在更新订阅信息...");

      this.RSSDataList = [];
      for (let link of this.RSSList) {
        this.RSS_subscription(link);
      }
      setInterval(() => {
        console.log("正在更新订阅信息...");
        this.RSSDataList = [];
        for (let link of this.RSSList) {
          console.log(CurrentTime());

          this.RSS_subscription(link);
        }
      }, CheckUpdateTime);
    },

    // 订阅
    RSS_subscription(url) {
      let socket = new Socket();

      // 重写实例的onmessage函数
      socket.__proto__.onmessage = (msg) => {
        // currentTime = moment().format("LTS");
        console.log(CurrentTime(), "Message from server: ");
        // console.log(msg.data);

        // 处理数据
        new Response(msg.data).text().then((value) => {
          const { rss: data } = callBack(value);
          console.log("获取数据成功", data);
          this.RSSDataList.push(data.channel);

          // console.log(UPDATE_RSS_LIST);
          this.$store.commit({
            type: UPDATE_RSS_LIST,
            res: this.RSSDataList,
          });
        });
      };

      // 重写实例的onopen函数

      // 初始化
      socket.init(`${WebSocketUri}${url}`);

      // onmessage 回调函数
      const callBack = xml2json;
    },
  },
};
</script>
<style scoped>
.cover {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.1);
}
.wrapper {
  text-align: center;
  top: 20px;
  height: calc(100vh - 20px);
  overflow: hidden;
}

.sidebar {
  display: flex;
  justify-content: center;
}
</style>
