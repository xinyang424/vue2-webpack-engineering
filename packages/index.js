import Side from "./aside";
import Container from "./container";
import Main from "./main";
import Button from "./button";
import pkg from "../package.json";
import * as utilsHooks from "./utils";
const components = [Side, Container, Main, Button];

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
  ...utilsHooks,
  ...components,
  version: pkg.version,
};
