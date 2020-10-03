const webpack = require("webpack");

module.exports = {
  publicPath: "./",
  outputDir: "elf_desktop",
  assetsDir: "static",

  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
        plugins: "@/plugins",
        store: "@/store",
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
  },
  productionSourceMap: false,
  devServer: {
    open: true, //是否自动弹出浏览器页面
    // host: "localhost",
    // port: '8081',
    https: false, //是否使用https协议
    hotOnly: true, //是否开启热更新
    proxy: {
      "/api2": {
        target: "https://rsshub.app", //API服务器的地址
        // ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          "^/api2": "https://rsshub.app",
        },
      },
      "/api1": {
        target: "https://rss.shab.fun", //API服务器的地址
        // ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          "^/api1": "https://rss.shab.fun",
        },
      },
    },
  },
};
