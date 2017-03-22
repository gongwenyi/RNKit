import Vue from 'vue';

// Auth
const auth = {
  // 注册
  register(paramObject) {
    return Vue.axios.post('/auth/register', paramObject);
  },
  // 发送验证码
  captcha(paramObject) {
    return Vue.axios.get('/auth/captcha', { params: paramObject });
  },
  // 登录
  login(paramObject) {
    return Vue.axios.post('/auth/login', paramObject);
  },
  // 忘记密码
  forgotPwd(paramObject) {
    return Vue.axios.post('/auth/forgot', paramObject);
  },
  // 修改密码
  changePwd(paramObject) {
    return Vue.axios.post('/auth/change_password', paramObject);
  },
  // 退出登录
  logout(paramObject) {
    return Vue.axios.post('/auth/logout', paramObject);
  },
  // 绑定手机号
  bindMobile(paramObject) {
    return Vue.axios.post('/auth/bind_mobile', paramObject);
  },
  // 绑定邮箱
  bindEmail(paramObject) {
    return Vue.axios.post('/auth/bind_email', paramObject);
  },
  // 当前登录用户信息
  me(paramObject) {
    return Vue.axios.get('/auth/me', { params: paramObject });
  },
  // 刷新token
  // refreshToken() {
  //   return Vue.axios.post('/refresh_token');
  // },
};

// app
const app = {
  // 应用列表
  list(paramObject) {
    return Vue.axios.get('/app/list', { params: paramObject });
  },
  // 创建APP
  create(paramObject) {
    return Vue.axios.post('/app/create', paramObject);
  },
  // app详情
  info(paramObject) {
    return Vue.axios.get('/app/info', { params: paramObject });
  },
  // 编辑app
  edit(paramObject) {
    return Vue.axios.post('/app/edit', paramObject);
  },
  // 删除app
  del(paramObject) {
    return Vue.axios.post('/app/del', paramObject);
  },
};

// package
const packages = {
  // package列表
  list(paramObject) {
    return Vue.axios.get('/package/list', { params: paramObject });
  },
  // 获取上传凭证（七牛）
  token() {
    return Vue.axios.get('/file/token');
  },
  // 创建package
  create(paramObject) {
    return Vue.axios.post('/package/create', paramObject);
  },
  // 更新package
  update(paramObject) {
    return Vue.axios.post('/package/update', paramObject);
  },
  // 删除package
  del(paramObject) {
    return Vue.axios.post('/package/del', paramObject);
  },
  // 添加补丁到package
  addVersion(paramObject) {
    return Vue.axios.post('/package/add_version', paramObject);
  },
  // 移除package中的补丁
  cancelVersion(paramObject) {
    return Vue.axios.post('/package/cancel_version', paramObject);
  },
};

// version(补丁包)
const version = {
  // 补丁列表
  list(paramObject) {
    return Vue.axios.get('/version/list', { params: paramObject });
  },
  // 创建补丁
  create(paramObject) {
    return Vue.axios.post('/version/create', paramObject);
  },
  // 更新补丁
  update(paramObject) {
    return Vue.axios.post('/version/update', paramObject);
  },
  // 删除补丁
  del(paramObject) {
    return Vue.axios.post('/version/del', paramObject);
  },
};

export {
  auth,
  app,
  packages,
  version,
};
