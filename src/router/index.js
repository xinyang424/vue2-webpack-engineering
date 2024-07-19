import Vue from "vue";
import VueRouter from "vue-router";
import IndexView from "../views/Index.vue";
Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   redirect: "/consumer-structure",
  // },
  {
    path: "/",
    name: "index",
    component: IndexView,
    children: [],
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
