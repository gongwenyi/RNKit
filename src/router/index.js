import Vue from 'vue';
import Router from 'vue-router';
// import jwt from '../utils/jwt';
import App from '../App';
import Index from '../views/Index';
import Login from '../views/Login';
import Register from '../views/Register';
import ResetPwd from '../views/ResetPwd';
import MyApp from '../views/MyApp';
import AppCont from '../views/AppCont';
import Patch from '../views/Patch';
import Monitor from '../views/Monitor';
import AppInfo from '../views/AppInfo';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: App,
    redirect: 'index',
    children: [
      { path: '/index', name: 'index', component: Index, meta: { title: 'RNKit云服务' } },
      { path: '/login', name: 'login', component: Login, meta: { title: '登录' } },
      { path: '/register', name: 'register', component: Register, meta: { title: '注册' } },
      { path: '/resetPwd', name: 'resetPwd', component: ResetPwd, meta: { title: '重置密码' } },
      { path: '/myApp', name: 'myApp', component: MyApp, meta: { title: '我的应用' } },
      { path: '/myApp/:key',
        name: 'appCont',
        component: AppCont,
        meta: { title: '我的应用' },
        children: [
          { path: 'patch', name: 'patch', component: Patch, meta: { title: '补丁下发' } },
          { path: 'monitor', name: 'monitor', component: Monitor, meta: { title: '实时监控' } },
          { path: 'appInfo', name: 'appInfo', component: AppInfo, meta: { title: 'App信息' } },
        ],
      },
    ],
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

// router.beforeEach((to, from, next) => {
//   // 已经登录的状态
//   if (jwt.checkAuth()) {
//     if (to.name === 'home') {
//       next({ name: 'admin.dashboard' });
//     } else {
//       next();
//     }
//   } else if (to.name !== 'home') {
//     next({ name: 'home' });
//   } else {
//     next();
//   }
// });

// 动态设置页面title
router.afterEach((to) => {
  document.title = to.meta.title || 'RNKit云服务';
});

export default router;
