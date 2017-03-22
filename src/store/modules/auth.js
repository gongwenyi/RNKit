import { Message } from 'element-ui';
import router from '../../router';
import * as types from '../mutation-types';
import jwt from '../../utils/jwt';
import { auth as authApi } from '../../api';

const defaultState = {
  isLoading: false, // 是否loading状态
  authIsLogin: jwt.checkAuth() || false, // 用户是否已经登录，如果localStorage中的token不为空，则为登录状态
  refreshToken: false,  // 刷新token请求
  currentUserInfo: {},  // 当前登录用户的信息
};

const getters = {
  authIsLogin: state => state.authIsLogin,
  currentUserInfo: state => state.currentUserInfo,
};

const actions = {
  /**
   * 注册
   * @param {any} { commit }
   * @param {object} paramObject={ name: 用户名,
   *                               email: 邮箱,
   *                               mobile: 手机号(邮箱，手机号二选一),
   *                               reg_verify: 邮箱/手机验证码,
   *                               reg_type: 注册的类型，可选 email，mobile,
   *                               password: 用户密码, 请使用 md5(password) 后传输 }
   * @returns
   */
  register({ commit }, paramObject) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    return authApi.register(paramObject).then((response) => {
      if (response.errno === 0) { // 注册成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        router.replace({ name: 'login' });  // 跳转到我的APP页面
      } else {  // 注册失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 发送验证码
   * @param {any} { commit }
   * @param {object} paramObject={ account: 邮箱/手机号,
   *                               action: 验证码的类型，可选 reg(注册), find(找回密码), chanage(修改资料) }
   * @returns
   */
  captcha({ commit }, paramObject) {
    return authApi.captcha(paramObject).then((response) => {
      if (response.errno === 0) { // 发送验证码成功
        Message.success('发送验证码成功,请注意查收');
      } else {  // 发送验证码失败
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 用户登录
   * @param {any} { commit }
   * @param {object} paramObject={ loginName: 登录邮箱/用户名/手机号,
   *                               password: 用户密码, 请使用 md5(password) 后传输 }
   * @returns
   */
  login({ commit }, paramObject) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    return authApi.login(paramObject).then((response) => {
      if (response.errno === 0) { // 登录成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.AUTH_IS_LOGIN, { value: true });  // 用户登录状态
        router.replace({ name: 'myApp' });  // 跳转到我的APP页面
        // 登录成功后存储token
        jwt.setToken(response.data.token);
      } else {  // 登录失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 忘记密码
   * @param {any} { commit }
   * @param {object} paramObject={ email: 邮箱,
   *                               mobile: 手机号(邮箱，手机号二选一),
   *                               find_verify: 邮箱/手机验证码,
   *                               type: 注册的类型，可选 email，mobile,
   *                               new_password: 用户密码, 请使用 md5(password) 后传输 }
   * @returns
   */
  forgotPwd({ commit }, paramObject) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    return authApi.forgotPwd(paramObject).then((response) => {
      if (response.errno === 0) { // 重置密码成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        Message.success('重置密码成功，请重新登录');
        router.replace({ name: 'login' });
      } else {  // 重置密码失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 修改密码
   * @param {any} { commit }
   * @param {object} paramObject={ old_password: 原密码,md5(password) 后传输
   *                               new_password: 新密码,md5(password) 后传输 }
   * @returns
   */
  changePwd({ commit }, paramObject) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    return authApi.changePwd(paramObject).then((response) => {
      if (response.errno === 0) { // 修改密码成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        commit(types.AUTH_IS_LOGIN, { value: false });  // 用户登录状态
        jwt.removeToken();  // 清除token
        commit(types.AUTH_LOGOUT);
        Message.success('修改密码成功，请重新登录');
        router.replace({ name: 'login' });
      } else {  // 修改密码失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 退出登录
   * @param {any} { commit }
   * @param {object} paramObject={ token: 用户的token }
   * @returns
   */
  logout({ commit }) {
    return authApi.logout({ token: jwt.getToken() }).then((response) => {
      if (response.errno === 0) { // 退出成功
        commit(types.AUTH_IS_LOGIN, { value: false });  // 用户登录状态
        jwt.removeToken();  // 清除token
        commit(types.AUTH_LOGOUT);
        Message.success('退出登录成功，请重新登录');
        router.replace({ name: 'login' });
      } else {  // 退出失败
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  // 刷新token
  // refreshToken({ commit, state }) {
  //   if (!state.refreshToken) {
  //     commit(types.AUTH_REFRESH_TOKEN, true);
  //     return authApi.refreshToken().then((response) => {
  //       jwt.setToken(response.data.token);
  //       commit(types.AUTH_REFRESH_TOKEN, false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   }
  //   return true;
  // },
  /**
   * 获取用户信息
   * @param {any} { commit }
   * @param {object} paramObject={ token: 用户的token }
   * @returns
   */
  getCurrentUserInfo({ commit }) {
    return authApi.me({ token: jwt.getToken() }).then((response) => {
      if (response.errno === 0) { // 获取用户信息成功
        commit(types.AUTH_CURRENT_USER, response.data);
      } else {  // 获取用户信息失败
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 绑定手机号
   * @param {any} { commit }
   * @param {object} paramObject={ phone: 手机号
   *                               code: 手机验证码 }
   * @returns
   */
  bindMobile({ commit }, paramObject) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    return authApi.bindMobile(paramObject).then((response) => {
      if (response.errno === 0) { // 绑定手机号成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        Message.success('绑定手机号成功');
        router.replace({ name: 'bind' }); // 刷新页面
      } else {  // 绑定手机号失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
        Message.error(response.errmsg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  /**
   * 绑定邮箱
   * @param {any} { commit }
   * @param {object} paramObject={ email: 邮箱
   *                               code: 邮箱验证码 }
   * @returns
   */
  bindEmail({ commit }, paramObject) {
    commit(types.IS_LOADING, { value: true });  // 开始loading
    return authApi.bindEmail(paramObject).then((response) => {
      if (response.errno === 0) { // 绑定邮箱成功
        commit(types.IS_LOADING, { value: false });  // 结束loading
        Message.success('绑定邮箱成功');
        router.replace({ name: 'bind' }); // 刷新页面
      } else {  // 绑定邮箱失败
        commit(types.IS_LOADING, { value: false });  // 结束loading
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
  [types.AUTH_IS_LOGIN](state, payload) {
    state.authIsLogin = payload.value;
  },
  [types.AUTH_LOGOUT](state) {
    state.currentUserInfo = {};
  },
  [types.AUTH_CURRENT_USER](state, payload) {
    state.currentUserInfo = Object.assign({}, state.currentUserInfo, payload);
  },
  [types.AUTH_REFRESH_TOKEN](state, flag) {
    state.refreshToken = flag;
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
