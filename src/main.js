import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import DoComponents from "./components";
import "./styles/init.scss";
Vue.use(ElementUI);
DoComponents.install(Vue);
new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
