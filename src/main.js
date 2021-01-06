import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: 'UA-126133790-2',
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
