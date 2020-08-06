import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import Error from "./plugins/Error";

Vue.use(Vuex);
const store = new Vuex.Store({});

Vue.use(Error, { store });

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store
}).$mount("#app");
