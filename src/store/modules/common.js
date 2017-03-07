import * as types from '../mutation-types';

const defaultState = {
  isIndexPage: false, // 是否位于首页
};

const getters = {
  isIndexPage: state => state.isIndexPage,
};

const actions = {
};

const mutations = {
  [types.IS_INDEX_PAGE](state, value) {
    state.isIndexPage = value;
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
