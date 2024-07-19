import doButton from "./src/do-button.vue";

doButton.install = function (Vue) {
  Vue.component(doButton.name, doButton);
};

export default doButton;
