import doMain from "./src/do-main.vue";

doMain.install = function (Vue) {
  Vue.component(doMain.name, doMain);
};

export default doMain;
