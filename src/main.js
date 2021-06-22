import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible';
import VueWechatTitle from 'vue-wechat-title';

/* 适配微信页面无法修改title */
Vue.use(VueWechatTitle);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
