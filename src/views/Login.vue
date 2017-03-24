<template>
  <div class="container">
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <el-form-item prop="username">
        <el-input size="large" v-model="loginForm.username" placeholder="请输入手机号或邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="large" v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <p class="forget-password">
        <router-link class="forget-password-link" :to="{ name: 'forgetPwd'}">忘记密码？</router-link>
      </p>
      <el-button class="btn-login" :loading="isLoading" size="large" type="primary" @click="login('loginForm')">登  录</el-button>
      <p class="register">还没有账号？<router-link class="register-link" :to="{ name: 'register' }">立即注册</router-link></p>
    </el-form>
  </div>
</template>

<script>
import md5 from 'blueimp-md5';

export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '', // 用户手机号或邮箱
        password: '', // 密码
      },
      rules: {
        username: [
          { required: true, message: '请输入手机号或邮箱', trigger: 'change' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'change' },
        ],
      },
    };
  },
  created() {
    this.$store.commit('IS_INDEX_PAGE', false); // 不在首页
  },
  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading;
    },
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('login', { loginName: this.loginForm.username, password: md5(this.loginForm.password) });
        }
      });
    },
  },
  components: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 340px;
    padding-top: 100px;
    margin: 0 auto;
  }
  .forget-password {
    float: right;
    margin-bottom: 8px;
  }
  .btn-login {
    width: 100%;
  }
  .register {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
  }
  .forget-password {
    margin-top: 0;
    text-align: right;
  }
  .forget-password-link,
  .register-link {
    color: #20a0ff;
    text-decoration: none;
  }
  .forget-password-link  {
    font-size: 14px;
  }
  .forget-password-link:hover,
  .register-link:hover {
    color: #4db3ff;
  }
</style>
