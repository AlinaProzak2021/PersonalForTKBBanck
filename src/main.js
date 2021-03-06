import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import store from './store.js';
import { router } from './router.js';

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
