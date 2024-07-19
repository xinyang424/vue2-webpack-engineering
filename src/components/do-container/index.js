import doContainer from "./src/do-container.vue";

doContainer.install = function (Vue) {
  Vue.component(doContainer.name, doContainer);
};

export default doContainer;
