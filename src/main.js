import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible';
import VueWechatTitle from 'vue-wechat-title';
import Loading from 'components/loading/index';
import vhCheck from 'vh-check';
vhCheck();

/* 适配微信页面无法修改title */
Vue.use(VueWechatTitle);
Vue.config.productionTip = false;

// 全局注册loading组件
Vue.use(Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
