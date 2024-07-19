import doAside from "./src/do-aside.vue";

doAside.install = function (Vue) {
  Vue.component(doAside.name, doAside);
};

export default doAside;
