import { Message } from 'element-ui';
// import router from '../../router';
import * as types from '../mutation-types';
// import jwt from '../../utils/jwt';
import { packages as packageApi } from '../../api';

const defaultState = {
  // packageList: [],  // package列表数据
  isLoading: false, // 是否loading状态
  fileToken: {
    token: '',  // 七牛上传凭证
    expires: '',  // 上传凭证过期时间
    up_host: '',  // 上传地址
  },  // 获取上传凭证（七牛）数据
  packageListShouldReload: false,  // 创建/编辑/删除package成功后，package列表需要重新加载
};

const getters = {
  // packageList: state => state.packageList,  // package列表数据
  fileToken: state => state.fileToken,  // 上传凭证（七牛）数据
};

const actions = {
  /**
   * package列表
   * @param {any} { commit }
   * @param {object} paramObject={ app_key: 应用的key,
   *                               page: 当前的页码 }
   * @returns
   */
  // packageList({ commit, dispatch }, paramObject) {
  //   return new Promise((resolve, reject) => {
  //     packageApi.list(paramObject).then((response) => {
  //       if (response.errno === 0) { // 获取package列表成功
  //         commit(types.PACKAGE_LIST, response.data.data);  // 保存package列表数据
  //       } else {  // 获取package列表失败
  //         Message.error(response.errmsg);
  //       }
  //       resolve();
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  //   });
  // },
  /**
   * 获取上传凭证（七牛）
   * @param {any} { commit }
   * @returns
   */
  fileToken({ commit }) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    return packageApi.token().then((response) => {
      if (response.errno === 0) { // 获取上传凭证成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.FILE_TOKEN, response.data);  // 保存上传凭证数据
      } else {  // 获取上传凭证失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 创建package
   * @param {any} { commit }
   * @param {object} paramObject={ name: Package名称（可选）,
   *                               file_name: ipa/apk名称,
   *                               hash: 七牛上传文件后返回的hash,
   *                               app_key: 应用的key }
   * @returns
   */
  createPackage({ commit, dispatch }, paramObject) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: false });  // package列表不需要重新加载
    return packageApi.create(paramObject).then((response) => {
      if (response.errno === 0) { // 创建成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: true });  // package列表需要重新加载
      } else {  // 创建失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: false });  // package列表不需要重新加载
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 更新package
   * @param {any} { commit }
   * @param {object} paramObject={ name: Package名称（可选）,
   *                               file_name: ipa/apk名称（可选）,
   *                               hash: 七牛上传文件后返回的hash（可选）,
   *                               app_key: 应用的key,
   *                               package_key: package的key }
   * @returns
   */
  updatePackage({ commit, dispatch }, paramObject) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: false });  // package列表不需要重新加载
    return packageApi.update(paramObject).then((response) => {
      if (response.errno === 0) { // 更新成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: true });  // package列表需要重新加载
      } else {  // 更新失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: false });  // package列表不需要重新加载
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 删除package
   * @param {any} { commit }
   * @param {object} paramObject={ key: package的key }
   * @returns
   */
  delPackage({ commit, dispatch }, paramObject) {
    commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: false });  // package列表不需要重新加载
    return packageApi.del(paramObject).then((response) => {
      if (response.errno === 0) { // 删除成功
        commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: true });  // package列表需要重新加载
      } else {  // 删除失败
        commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: false });  // package列表不需要重新加载
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 添加补丁到package
   * @param {any} { commit, dispatch }
   * @param {any} paramObject = { package_key: Package 的key,
   *                              version_key: Version 的key }
   * @returns
   */
  addVersion({ commit, dispatch }, paramObject) {
    commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: false }); // package列表不需要重新加载
    return packageApi.addVersion(paramObject).then((response) => {
      if (response.errno === 0) {  // 添加成功
        commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: true });  // package列表需要重新加载
      } else {  // 添加失败
        commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: true });  // package列表需要重新加载
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 移除package中的补丁
   * @param {any} { commit, dispatch }
   * @param {any} paramObject = { package_key: Package 的key,
   *                              version_key: Version 的key }
   * @returns
   */
  cancelVersion({ commit, dispatch }, paramObject) {
    commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: false }); // package列表不需要重新加载
    return packageApi.cancelVersion(paramObject).then((response) => {
      if (response.errno === 0) {  // 移除成功
        commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: true });  // package列表需要重新加载
      } else {  // 移除失败
        commit(types.PACKAGE_LIST_SHOULD_RELOAD, { value: false });  // package列表不需要重新加载
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
  // [types.PACKAGE_LIST](state, payload) {
  //   state.packageList = payload;
  // },
  [types.FILE_TOKEN](state, payload) {
    state.fileToken = Object.assign({}, state.fileToken, payload);
  },
  [types.PACKAGE_LIST_SHOULD_RELOAD](state, payload) {
    state.packageListShouldReload = payload.value;
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
