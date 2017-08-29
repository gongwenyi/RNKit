import { Message } from 'element-ui';
// import router from '../../router';
import * as types from '../mutation-types';
// import jwt from '../../utils/jwt';
import { statistics as statisticsApi } from '../../api';

const defaultState = {
  statisticsInfo: [],  // 补丁统计信息
};

const getters = {
  statisticsInfo: state => state.statisticsInfo,  // 补丁统计信息
};

const actions = {
  getInfo({ commit, dispatch }, paramObject) {
    commit(types.GET_STATISTICS_INFO, []);  // 清空数据
    return statisticsApi.info(paramObject).then((response) => {
      if (response.errno === 0) { // 获取成功
        commit(types.GET_STATISTICS_INFO, response.data);  // 保存列表数据
      } else {  // 删除失败
        commit(types.GET_STATISTICS_INFO, []);  // 清空数据
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
};

const mutations = {
  [types.GET_STATISTICS_INFO](state, payload) {
    state.statisticsInfo = payload;
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
