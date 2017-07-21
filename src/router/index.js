import Vue from 'vue';
import Router from 'vue-router';
import jwt from '../utils/jwt';
import App from '../App';
import Index from '../views/Index';
// import Product from '../views/Product';
// import Vip from '../views/product/Vip';
// import Vvip from '../views/product/Vvip';
// import Vvvip from '../views/product/Vvvip';
import Login from '../views/Login';
import Register from '../views/Register';
import ForgetPwd from '../views/ForgetPwd';
import ChangePwd from '../views/ChangePwd';
import Bind from '../views/Bind';
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
    redirect: { name: 'index' },
    children: [
      { path: '/index', name: 'index', component: Index, meta: { title: 'RNKit云服务' } },
      // { path: '/product', name: 'product', component: Product, meta: { title: '价格' } },
      // { path: '/product',
      //   name: 'product',
      //   component: Product,
      //   meta: { title: '价格' },
      //   children: [
      //     { path: 'vip', name: 'vip', component: Vip, meta: { title: 'vip价格' } },
      //     { path: 'vvip', name: 'vvip', component: Vvip, meta: { title: 'vvip价格' } },
      //     { path: 'vvvip', name: 'vvvip', component: Vvvip, meta: { title: 'vvvip价格' } },
      //   ],
      // },
      { path: '/login', name: 'login', component: Login, meta: { title: '登录' } },
      { path: '/register', name: 'register', component: Register, meta: { title: '注册' } },
      { path: '/forgetPwd', name: 'forgetPwd', component: ForgetPwd, meta: { title: '忘记密码' } },
      { path: '/changePwd', name: 'changePwd', component: ChangePwd, meta: { title: '修改密码' } },
      { path: '/bind', name: 'bind', component: Bind, meta: { title: '绑定手机/邮箱' } },
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

router.beforeEach((to, from, next) => {
  if (!jwt.checkAuth() && to.name !== 'login' && to.name !== 'index' && to.name !== 'register' && to.name !== 'forgetPwd') {
    next({ name: 'login' });
  } else {
    next();
  }
});

// 动态设置页面title
router.afterEach((to) => {
  document.title = `${to.meta.title} - React Native热更新-RNKit云服务`;
});

export default router;
