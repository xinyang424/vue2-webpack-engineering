import Container from "./src/container.vue";

Container.install = function (Vue) {
  Vue.component(Container.name, Container);
};

export default Container;
