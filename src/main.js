// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'normalize.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'font-awesome/css/font-awesome.min.css';
// import 'jsoneditor/dist/jsoneditor.min.css';
import axios from 'axios';
import vueAxios from 'vue-axios';
import router from './router';
import store from './store';
import jwt from './utils/jwt';

Vue.use(ElementUI);
Vue.use(vueAxios, axios);

// axios配置
axios.defaults.baseURL = 'http://10.1.17.90:8360/api/v1/';

// 请求hook
axios.interceptors.request.use((config) => {
  // 请求headers中加入token
  if (jwt.checkAuth()) {
    config.headers['X-Authorization'] = jwt.getToken();
  }
  return config;
});

// 返回结果filter
axios.interceptors.response.use((response) => {
  // 如果token过期，清除token，跳转到登录页面
  if (response.data.errno === 401 && jwt.checkAuth()) {
    jwt.removeToken();
    router.replace({ name: 'login' });
    return false;
  }
  return response.data;
}, error => Promise.reject(error));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
});
