import Aside from "./src/aside.vue";

Aside.install = function (Vue) {
  Vue.component(Aside.name, Aside);
};

export default Aside;
