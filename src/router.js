import Vue from 'vue';
import Router from 'vue-router';
// const Home = () => import('views/home/Index.vue'); // 首页
// const People = () => import('views/peoplePage/Index.vue'); // 人员问卷列表
// const AddInfo = () => import('views/addInfo/Index'); //  人员增加资料
const Home = () => import(/* webpackChunkName:  "[request]" */ 'views/home/Index.vue'); // 首页
const People = () => import(/* webpackChunkName:  "[request]" */ 'views/peoplePage/Index.vue'); // 人员问卷列表
const AddInfo = () => import(/* webpackChunkName:  "[request]" */ 'views/addInfo/Index'); //  人员增加资料
// import Home from 'views/home/Index.vue';
// import People from 'views/peoplePage/Index.vue';
// import AddInfo from 'views/addInfo/Index';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
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
    }
  ]
});

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkLoadFailed) {
    window.location.reload();
    // router.replace(router.history.pending.fullPath);
  } else {
    console.log(error);
  }
});

export default router;
