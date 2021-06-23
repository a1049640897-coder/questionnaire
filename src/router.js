import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import('views/home/Index.vue'); // 首页
const People = () => import('views/peoplePage/Index.vue'); // 首页
const Test = () => import('views/test/Index.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '问卷调查'
      }
    },
    {
      path: '/people',
      name: 'people',
      component: People,
      meta: {
        title: '问卷调查'
      }
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        title: '测试页面'
      }
    }

  ]
});

export default router;
