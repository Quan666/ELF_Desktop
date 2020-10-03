<template>
  <div>
    <a-menu
      mode="inline"
      :open-keys="openKeys"
      class="menu-wrapper"
      @openChange="onOpenChange"
    >
      <a-sub-menu
        :key="RSSItem.title"
        v-for="RSSItem of RSSObjList"
        class="sub-menu"
      >
        <span slot="title"
          ><a-icon type="appstore" /><span>{{ RSSItem.title }}</span></span
        >
        <a-menu-item
          :key="index"
          v-for="(item, index) of RSSItem.item"
          @click="click"
        >
          {{ item.title }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
    <!-- <div>{{ RSSObjList }}</div> -->
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  components: {},

  created() {},
  data() {
    return {
      rootSubmenuKeys: [],
      // 标志哪个是打开的，不用赋值 (用官方案列测试)
      openKeys: [],
      scroll: null,
    };
  },
  methods: {
    onOpenChange(openKeys) {
      // this.scroll = new Bscroll(this.$refs.wrapper);

      // 最后一个点击的RSS标题
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );

      // console.log("openKeys", openKeys);
      // console.log("latestOpenKey", latestOpenKey);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        // 更新当前item位置
        this.$store.state.currentItem[0] = -1;
        this.openKeys = openKeys;
      } else {
        // 更新当前item位置
        this.$store.state.currentItem[0] = this.rootSubmenuKeys.indexOf(
          latestOpenKey
        );
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
      // console.log("this.rootSubmenuKeys", this.rootSubmenuKeys);
      // console.log("this.openKeys", this.openKeys);
    },

    click({ item, key, keyPath }) {
      /**
       * item: 组件
       * key: 下标
       * keyPath: [key]
       */
      // 更新当前item位置
      this.$store.state.currentItem[1] = key;
      // console.log(item);
      // console.log(key);
      // console.log(keyPath);
      // console.log(this.$store.state.currentItem);

      this.$bus.$emit("itemClick", this.$store.state.currentItem);

      this.$emit("updateHeight");
    },
  },
  computed: {
    RSSObjList() {
      this.rootSubmenuKeys = [];
      this.openKeys = [];
      for (let RSSItem of this.$store.state.RSSObjList) {
        // console.log(RSSItem);
        this.rootSubmenuKeys.push(RSSItem.title);
        // for (let item of RSSItem.item) {
        //   this.openKeys.push(item.title);
        // }
      }
      // console.log(this.$store.state.RSSObjList);
      // console.log(this.rootSubmenuKeys);
      // console.log(this.openKeys);

      // 需要对数据进行一次处理(item为Object或者Array的时候)
      let objList = this.$store.state.RSSObjList;
      for (let RSSItem of objList) {
        if (RSSItem.item.__proto__ === Object.prototype) {
          let itemArray = [];
          itemArray.push(RSSItem.item);
          RSSItem.item = itemArray;
        }
      }

      // console.log(objList);
      return objList;
    },
  },
};
</script>

<style scoped>
.menu-wrapper {
  width: 300px;
  margin-top: 10px;

  border-radius: 10px;
}

.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: 1px solid rgba(236, 236, 236, 0.5);
}
.ant-menu {
  background-color: rgba(236, 236, 236, 0.5);
}

/* 
  此处是操作子组件当中的样式
  此 style 被 scoped 限制了作用域
  应该使用深度选择器 >>> 进行选择
 */
.sub-menu >>> .ant-menu {
  background-color: transparent !important;
}
</style>
