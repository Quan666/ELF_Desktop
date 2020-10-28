<template>
  <div v-if="$store.getters.getRSSObjListLength !== 0" class="content">
    <a-card :title="getContent.title" :bordered="false" class="html-text">
      <a-card
        :bordered="false"
        style="background: rgba(236, 236, 236, 0.5); border-radius: 10px"
      >
        <div>Time: {{ getContent.pubDate }}</div>
        <div>
          Link: <a :href="getContent.link">{{ getContent.title }}</a>
        </div>
      </a-card>
      <!-- <div class="html-text" v-html="getContent.description"></div> -->
      <div class="content-text">
        <h4>Content:</h4>
        <div v-for="item of contentArr" :key="item">
          <span v-html="item"></span>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
// .replace(/(?<=<img.*>)(.|\n)*?(?=<img.*>)/g, '')
export default {
  name: "Content",
  data() {
    return {
      currentMenu: 0,
      currentItem: 0,

      contentArr: [],
    };
  },

  methods: {
    getContentArr() {
      // 这里item可能只返回一个对象
      // console.log(this.currentItem);
      // console.log(this.$store.state.RSSObjList[this.currentMenu]);
      // console.log(this.$store.state.RSSObjList[this.currentMenu].item[0]);

      let contentArr = this.$store.state.RSSObjList[this.currentMenu].item[
        this.currentItem
      ].description.split("<br>");

      contentArr = contentArr
        .filter((item) => {
          return item !== "";
        })
        .map((item) => {
          if (item.indexOf("img") !== -1) {
            let newImg =
              item.slice(0, -2) +
              `" onerror="javascript:this.src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601706515600&di=9d0a3756eb00513dd0b8945714f9a836&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1e3ead27ad747c7c92e659ac5774587a680bb8d25252-mRVFlu_fw658';` +
              item.slice(-2);
            // console.log(newImg);

            return newImg;
          } else {
            return item;
          }
        });

      this.contentArr = contentArr;
    },
  },
  created() {},
  mounted() {
    this.$bus.$on("itemClick", (value) => {
      [this.currentMenu, this.currentItem] = [...value];
      // console.log(this.currentMenu, this.currentItem);
      this.getContentArr();
    });
  },
  destroyed() {
    this.$bus.$off("itemClick", () => {
      console.log("成功移除 itemClick 监听事件");
    });
  },

  computed: {
    getContent() {
      if (this.$store.getters.getRSSObjListLength !== 0) {
        this.getContentArr();

        return this.$store.state.RSSObjList[this.currentMenu].item[
          this.currentItem
        ];
      } else {
        return "暂无内容";
      }
    },
  },
};
</script>

<style scoped>
.content {
  overflow: hidden;
}
.html-text {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;

  margin-top: 10px;
}
.html-text >>> img {
  max-width: 100%;
  max-height: 400px;
}

.content-text {
  margin-top: 10px;
  border-radius: 10px;

  background: rgba(236, 236, 236, 0.5);
  padding: 10px;
  color: black;
}
</style>
