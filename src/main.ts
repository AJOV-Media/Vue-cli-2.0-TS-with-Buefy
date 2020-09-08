import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

import VueMoment from "vue-moment";

import VueRouter from "vue-router";
import routes from "./routes";

import store from "./store";

Vue.config.productionTip = false;
Vue.use(Buefy);

Vue.use(VueMoment);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
