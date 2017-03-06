/**
 * 项目中所有的mutation常量
 */

export const IS_LOADING = 'IS_LOADING'; // loading

// auth
export const AUTH_IS_LOGIN = 'AUTH_IS_LOGIN'; // 用户是否登录
export const AUTH_CURRENT_USER = 'AUTH_CURRENT_USER'; // 当前用户信息
export const AUTH_LOGOUT = 'AUTH_LOGOUT'; // 用户退出
export const AUTH_REFRESH_TOKEN = 'AUTH_REFRESH_TOKEN'; // 刷新token

// app
export const CREATE_APP_IS_SUCCESS = 'CREATE_APP_IS_SUCCESS'; // 创建APP是否成功
export const GET_APP_LIST = 'GET_APP_LIST'; // 获取APP列表
export const CLEAR_APP_LIST = 'CLEAR_APP_LIST'; // 清空APP列表
export const GET_APP_LIST_TOTAL_PAGES = 'GET_APP_LIST_TOTAL_PAGES'; // APP列表总页数
export const GET_APP_LIST_IS_LOADING = 'GET_APP_LIST_IS_LOADING'; // 获取APP列表loading
export const GET_APP_INFO = 'GET_APP_INFO'; // 获取APP信息
export const EDIT_IS_LOADING = 'EDIT_IS_LOADING'; // 编辑APP loading
export const DEL_IS_LOADING = 'DEL_IS_LOADING'; // 删除APP loading

// package
export const PACKAGE_LIST = 'PACKAGE_LIST'; // 获取package列表
export const PACKAGE_LIST_SHOULD_RELOAD = 'PACKAGE_LIST_SHOULD_RELOAD'; // 创建/编辑/删除package成功后，package列表需要重新加载
export const FILE_TOKEN = 'FILE_TOKEN'; // 获取上传凭证（七牛）

// version
export const VERSION_LIST = 'VERSION_LIST'; // 获取version列表
export const VERSION_LIST_SHOULD_RELOAD = 'VERSION_LIST_SHOULD_RELOAD'; // 创建/编辑/删除version成功后，version列表需要重新加载
export const CREATE_VERSION_SUCCESS = 'CREATE_VERSION_SUCCESS'; // 创建version是否成功
export const EDIT_VERSION_SUCCESS = 'EDIT_VERSION_SUCCESS'; // 编辑version是否成功
export const DEL_VERSION_SUCCESS = 'DEL_VERSION_SUCCESS'; // 删除version是否成功
