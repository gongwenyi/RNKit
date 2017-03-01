import { Message } from 'element-ui';
// import router from '../../router';
import * as types from '../mutation-types';
// import jwt from '../../utils/jwt';
import { version as versionApi } from '../../api';

const defaultState = {
  // versionList: [],  // version列表数据
  isLoading: false, // 是否loading状态
  versionListShouldReload: false,  // 创建/编辑/删除version成功后，version列表需要重新加载
};

const getters = {
  // versionList: state => state.versionList,  // version列表数据
};

const actions = {
  /**
   * 补丁列表
   * @param {any} { commit }
   * @param {object} paramObject={ app_key: 应用的key,
   *                               page: 当前的页码 }
   * @returns
   */
  // versionList({ commit, dispatch }, paramObject) {
  //   return new Promise((resolve, reject) => {
  //     versionApi.list(paramObject).then((response) => {
  //       if (response.errno === 0) { // 获取补丁列表成功
  //         commit(types.VERSION_LIST, response.data.data);  // 保存补丁列表数据
  //       } else {  // 获取补丁列表失败
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
   * 创建补丁
   * @param {any} { commit }
   * @param {object} paramObject={ app_key: 应用的key,
   *                               name: 补丁名称,
   *                               file_name: ipa/apk名称,
   *                               hash: 七牛上传文件后返回的hash,
   *                               release_type: 发布类型(1: 开发预览, 2: 全量下发, 3: 灰度发布, 4: 条件下发, 默认: 2)
   *                               gray_type: 灰度下发类型 (1: 百分比, 2: 设备数量, 默认1)(可选)
   *                               gray_percent: 灰度百分比 (1-9 分别为百分之10-90, 默认百分之20)(可选)
   *                               gray_count: 灰度设备数量 (默认为100)(可选)
   *                               condition: 灰度条件 (如 iOS>=9)(可选)
   *                               is_mandatory: 是否强制更新 (0: 否, 1: 是, 默认: 0)(可选)
   *                               is_silent: 是否静默更新 (0: 否, 1: 是, 默认: 0)(可选)
   *                               release_time: 发布时间 (格式为 2017-02-21 00:41:55, 默认为当前时间, 表示立即发布)(可选)
   *                               description: 更新描述(可选)
   *                               meta_info: 扩展字段, 格式为 json 字符串(可选)
   *                               package_key: Package的 key(可选) }
   * @returns
   */
  createVersion({ commit, dispatch }, paramObject) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    commit(types.VERSION_LIST_SHOULD_RELOAD, { value: false });  // 补丁列表不需要重新加载
    return versionApi.create(paramObject).then((response) => {
      if (response.errno === 0) { // 创建成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.VERSION_LIST_SHOULD_RELOAD, { value: true });  // 补丁列表需要重新加载
      } else {  // 创建失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.VERSION_LIST_SHOULD_RELOAD, { value: false });  // 补丁列表不需要重新加载
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 更新补丁
   * @param {any} { commit }
   * @param {object} paramObject={ app_key: 应用的key,
   *                               version_key: 补丁的key,
   *                               name: 补丁名称,
   *                               file_name: ipa/apk名称,
   *                               hash: 七牛上传文件后返回的hash,
   *                               release_type: 发布类型(1: 开发预览, 2: 全量下发, 3: 灰度发布, 4: 条件下发, 默认: 2)
   *                               gray_type: 灰度下发类型 (1: 百分比, 2: 设备数量, 默认1)(可选)
   *                               gray_percent: 灰度百分比 (1-9 分别为百分之10-90, 默认百分之20)(可选)
   *                               gray_count: 灰度设备数量 (默认为100)(可选)
   *                               condition: 灰度条件 (如 iOS>=9)(可选)
   *                               is_mandatory: 是否强制更新 (0: 否, 1: 是, 默认: 0)(可选)
   *                               is_silent: 是否静默更新 (0: 否, 1: 是, 默认: 0)(可选)
   *                               release_time: 发布时间 (格式为 2017-02-21 00:41:55, 默认为当前时间, 表示立即发布)(可选)
   *                               description: 更新描述(可选)
   *                               meta_info: 扩展字段, 格式为 json 字符串(可选)
   *                               package_key: Package的 key(可选) }
   * @returns
   */
  updateVersion({ commit, dispatch }, paramObject) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    commit(types.VERSION_LIST_SHOULD_RELOAD, { value: false });  // 补丁列表不需要重新加载
    return versionApi.update(paramObject).then((response) => {
      if (response.errno === 0) { // 更新成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.VERSION_LIST_SHOULD_RELOAD, { value: true });  // 补丁列表需要重新加载
      } else {  // 更新失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.VERSION_LIST_SHOULD_RELOAD, { value: false });  // 补丁列表不需要重新加载
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 删除补丁
   * @param {any} { commit }
   * @param {object} paramObject={ key: 补丁的key }
   * @returns
   */
  delVersion({ commit, dispatch }, paramObject) {
    commit(types.VERSION_LIST_SHOULD_RELOAD, { value: false });  // package列表不需要重新加载
    return versionApi.del(paramObject).then((response) => {
      if (response.errno === 0) { // 删除成功
        commit(types.VERSION_LIST_SHOULD_RELOAD, { value: true });  // package列表需要重新加载
      } else {  // 删除失败
        commit(types.VERSION_LIST_SHOULD_RELOAD, { value: false });  // package列表不需要重新加载
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
  // [types.VERSION_LIST](state, payload) {
  //   state.versionList = payload;
  // },
  [types.FILE_TOKEN](state, payload) {
    state.fileToken = Object.assign({}, state.fileToken, payload);
  },
  [types.VERSION_LIST_SHOULD_RELOAD](state, payload) {
    state.versionListShouldReload = payload.value;
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
