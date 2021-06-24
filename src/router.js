import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import('views/home/Index.vue'); // 首页
const People = () => import('views/peoplePage/Index.vue'); // 人员问卷列表
const AddInfo = () => import('views/addInfo/Index'); //  人员增加资料
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
        title: '人员问卷'
      }
    },
    {
      path: '/add-info',
      name: 'addInfo',
      component: AddInfo,
      meta: {
        title: '人员问卷'
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
