import doSide from "./do-aside";
import doContainer from "./do-container";
import doMain from "./do-main";
import doButton from "./do-button";
import pkg from "../../package.json";
const components = [doSide, doContainer, doMain, doButton];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  version: pkg.version,
};
