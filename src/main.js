import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
import Toutiaoicon from "@/components/Toutiaoicon.vue";
import vant from "vant";
import "vant/lib/index.less";
import "amfe-flexible"; //动态设置 REM 基准值
import request from "@/utils/request";

request.get("v1_0/user/channels").then((res) => console.log(res));

Vue.component("Toutiaoicon", Toutiaoicon);
Vue.config.productionTip = false;
Vue.use(vant);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
