<template>
  <div class="container">
    <el-form :model="registerForm" :rules="rules" ref="registerForm">
      <el-form-item prop="username" class="input-username">
        <el-input size="large" v-model="registerForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="registerType" label="注册方式" class="register-type">
        <el-radio-group v-model="registerForm.registerType">
          <el-radio :label="1">手机号</el-radio>
          <el-radio :label="2">邮箱</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="phone" v-if="registerForm.registerType === 1">
        <el-input size="large" v-model="registerForm.phone" placeholder="请输入手机号">
          <el-button slot="append" @click="captchaPhone()" :disabled='btnSmsCodeDisabled'>{{btnText}}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="email" v-if="registerForm.registerType === 2">
        <el-input size="large" v-model="registerForm.email" placeholder="请输入邮箱">
          <el-button slot="append" @click="captchaEmail()" :disabled='btnSmsCodeDisabled'>{{btnText}}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input size="large" v-model="registerForm.verifyCode" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="large" v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-button class="btn-register" :loading="isLoading" size="large" type="primary" @click="register('registerForm')">立即注册</el-button>
      <p class="login">已有账号？<router-link class="login-link" :to="{ name: 'login' }">登录</router-link></p>
    </el-form>
  </div>
</template>

<script>
import md5 from 'blueimp-md5';
import { mapGetters } from 'vuex';

export default {
  name: 'register',
  data() {
    return {
      btnText: '获取验证码',
      btnSmsCodeDisabled: false,
      time: 60,
      registerForm: {
        username: '', // 用户名
        registerType: 1,
        phone: '', // 用户手机号
        email: '', // 用户邮箱
        verifyCode: '', // 验证码
        password: '', // 密码
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'change' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { min: 11, max: 11, message: '长度 11 个字符', trigger: 'change' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          { min: 6, max: 100, message: '长度在 6 到 100 个字符', trigger: 'change' },
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'change' },
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
    ...mapGetters({
      countDown: 'countDown',
    }),
  },
  methods: {
    captchaPhone() {
      this.$store.dispatch('captcha', { account: this.registerForm.phone, action: 'reg' });
    },
    captchaEmail() {
      this.$store.dispatch('captcha', { account: this.registerForm.email, action: 'reg' });
    },
    startCountDown() {
      const timer = setInterval(() => {
        this.btnText = this.time;
        this.btnSmsCodeDisabled = true;
        if (this.time < 0) {
          clearInterval(timer);
          this.time = this.totalTime;
          this.btnSmsCodeDisabled = false;
          this.btnText = '重新获取';
        } else {
          this.time = this.time - 1;
        }
      }, 1000);
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.registerForm.registerType);
          if (this.registerForm.registerType === 1) {  // 手机号注册
            this.$store.dispatch('register', { name: this.registerForm.username, mobile: this.registerForm.phone, reg_verify: this.registerForm.verifyCode, reg_type: 'mobile', password: md5(this.registerForm.password) });
          } else {  // 邮箱注册
            this.$store.dispatch('register', { name: this.registerForm.username, email: this.registerForm.email, reg_verify: this.registerForm.verifyCode, reg_type: 'email', password: md5(this.registerForm.password) });
          }
        }
      });
    },
  },
  watch: {
    countDown() {
      if (this.countDown === 1) {
        this.startCountDown();
      }
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
    margin: 0 auto;
    padding-top: 100px;
  }
  .input-username {
    margin-bottom: 15px;
  }
  .el-input-group__append .el-button{
    width: 110px;
    margin: 0;
  }
  .register-type {
    margin-bottom: 10px;
  }
  .btn-register {
    width: 100%;
  }
  .login {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
  }
  .login-link {
    color: #20a0ff;
    text-decoration: none;
  }
  .login-link:hover {
    color: #4db3ff;
  }
</style>
