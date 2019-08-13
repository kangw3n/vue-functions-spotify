import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { plugin } from "vue-function-api";

import './assets/css/style.styl';

Vue.config.productionTip = false
Vue.use(plugin);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
