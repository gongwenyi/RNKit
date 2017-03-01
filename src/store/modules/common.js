import * as types from '../mutation-types';

const defaultState = {
  isLoading: false, // 全局的状态，是否请求中
};

const getters = {
  isLoading: state => state.isLoading,
};

const actions = {
  // loading开始
  startLoading({ commit }) {
    commit()
  },
  // loading结束
  stopLoading({ commit }) {
    
  },
};

const mutations = {
  [types.IS_LOADING](state) {
    state.isLoading = true;
  },
  [types.IS_LOADING](state) {
    state.isLoading = false;
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
