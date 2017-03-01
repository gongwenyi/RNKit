/**
 * 创建store模拟数据
 */

import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import app from './modules/app';
import packages from './modules/package';
import version from './modules/version';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    auth,
    app,
    packages,
    version,
  },
  strict: debug, //是否开启严格模式
});

export default store;
