import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

import VueRouter from "vue-router";
import routes from "./routes";

import store from "./store";

Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(VueRouter);

const router = new VueRouter({ routes });
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
