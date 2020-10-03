<template>
  <!-- 此处外层不能加div再包裹一层我也不知道为啥 -->
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      // useTransition: false,
    });

    // 监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        console.log(position);
        // this.$emit("scroll", position);
      });
    }

    // 监听上拉事件
    // if (this.pullUpLoad) {
    //   this.scroll.on("pullingUp", () => {
    //     this.$emit("pullingUp");
    //   });
    // }
  },
  methods: {
    // 回到顶部
    scrollTo(x, y, time = 500) {
      // console.log(this.scroll.scrollTo());

      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 下拉到底部加载一次需要结束
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 重新刷新
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
}
</style>
