import { Message } from 'element-ui';
import router from '../../router';
import * as types from '../mutation-types';
// import jwt from '../../utils/jwt';
import { app as appApi } from '../../api';

const defaultState = {
  isLoading: false, // 是否loading状态
  createAppIsSuccess: false,  // 创建APP是否成功
  getAppListIsLoading: false,  // 获取APP列表loading状态
  editIsLoading: false, // 编辑app loading状态
  delIsLoading: false, // 删除app loading状态
  appList: [],  // app列表
  appInfo: {},  // app信息
};

const getters = {
  appList: state => state.appList,  // app列表
  appInfo: state => state.appInfo,  // app详情
};

const actions = {
  /**
   * 应用列表
   * @param {any} { commit }
   * @param {object} paramObject={ page: 当前的页码 }
   * @returns
   */
  list({ commit }, paramObject) {
    commit(types.GET_APP_LIST_IS_LOADING, { value: true });  // 开始loading
    return appApi.list(paramObject).then((response) => {
      if (response.errno === 0) { // 获取应用列表成功
        commit(types.GET_APP_LIST_IS_LOADING, { value: false });  // 结束loading
        commit(types.GET_APP_LIST, response.data.data);  // 保存APP列表数据
      } else {  // 获取应用列表失败
        commit(types.GET_APP_LIST_IS_LOADING, { value: false });  // 结束loading
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 创建APP
   * @param {any} { commit }
   * @param {object} paramObject={ name: 应用名称,
   *                               app_identifier: 应用包名,
   *                               platform: 应用平台 (1: ios, 2: android),
   *                               download_url: 应用下载地址 }
   * @returns
   */
  create({ commit, dispatch }, paramObject) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    return appApi.create(paramObject).then((response) => {
      if (response.errno === 0) { // 创建成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.CREATE_APP_IS_SUCCESS, { value: true });  // 创建APP成功
        dispatch('list'); // 重新获取APP列表
      } else {  // 创建失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.CREATE_APP_IS_SUCCESS, { value: false });  // 创建APP失败
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 获取app详情
   * @param {any} { commit }
   * @param {object} paramObject={ app_key: 应用的key }
   * @returns
   */
  info({ commit, dispatch }, paramObject) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    return appApi.info(paramObject).then((response) => {
      if (response.errno === 0) { // app详情成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.GET_APP_INFO, response.data);  // 保存app信息
      } else {  // app详情失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 编辑app
   * @param {any} { commit }
   * @param {object} paramObject={ key: 应用的key,
   *                               name: 应用名称,
   *                               download_url: 应用下载地址 }
   * @returns
   */
  edit({ commit, dispatch }, paramObject) {
    commit(types.EDIT_IS_LOADING, { value: true });  // 开始loading
    return appApi.edit(paramObject).then((response) => {
      if (response.errno === 0) { // 编辑app成功
        commit(types.EDIT_IS_LOADING, { value: false });  // 结束loading
        dispatch('info', { app_key: paramObject.key });  // 重新获取app信息
      } else {  // 编辑app失败
        commit(types.EDIT_IS_LOADING, { value: false });  // 结束loading
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 删除app
   * @param {any} { commit }
   * @param {object} paramObject={ key: 应用的key }
   * @returns
   */
  del({ commit, dispatch }, paramObject) {
    commit(types.DEL_IS_LOADING, { value: true });  // 开始loading
    return appApi.del(paramObject).then((response) => {
      if (response.errno === 0) { // 编辑app成功
        commit(types.DEL_IS_LOADING, { value: false });  // 结束loading
        router.replace({ name: 'myApp' });  // 跳转到我的APP页面
      } else {  // 编辑app失败
        commit(types.DEL_IS_LOADING, { value: false });  // 结束loading
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
};

const mutations = {
  [types.IS_LOADING](state, payload) {
    state.isLoading = payload.value;
  },
  [types.CREATE_APP_IS_SUCCESS](state, payload) {
    state.createAppIsSuccess = payload.value;
  },
  [types.GET_APP_LIST_IS_LOADING](state, payload) {
    state.getAppListIsLoading = payload.value;
  },
  [types.GET_APP_LIST](state, payload) {
    state.appList = payload;
  },
  [types.GET_APP_INFO](state, payload) {
    state.appInfo = Object.assign({}, state.appInfo, payload);
  },
  [types.EDIT_IS_LOADING](state, payload) {
    state.editIsLoading = payload.value;
  },
  [types.DEL_IS_LOADING](state, payload) {
    state.delIsLoading = payload.value;
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
