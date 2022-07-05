const { defineConfig } = require("@vue/cli-service");
const { join } = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "黑马头条";
      return args;
    });
  },
  //vant组件less样式 定制主题
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            "text-color": "#111",
            "border-color": "#eee",
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${join(
              __dirname,
              "src/styles/theme.less"
            )}";`,
          },
        },
      },
    },
  },
});
