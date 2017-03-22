<template>
  <div class="container">
    <el-form :model="forgetPwdForm" :rules="rules" ref="forgetPwdForm">
      <el-form-item prop="registerType" label="注册方式" class="register-type">
        <el-radio-group v-model="forgetPwdForm.registerType">
          <el-radio :label="1">手机号</el-radio>
          <el-radio :label="2">邮箱</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="phone" v-if="forgetPwdForm.registerType === 1">
        <el-input size="large" v-model="forgetPwdForm.phone" placeholder="请输入手机号">
          <el-button slot="append" @click="captchaPhone()">获取验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="email" v-if="forgetPwdForm.registerType === 2">
        <el-input size="large" v-model="forgetPwdForm.email" placeholder="请输入邮箱">
          <el-button slot="append" @click="captchaEmail()">获取验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input size="large" v-model="forgetPwdForm.verifyCode" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="large" v-model="forgetPwdForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-button class="btn-reset-pwd" :loading="isLoading" size="large" type="primary" @click="forgetPwd('forgetPwdForm')">重置密码</el-button>
    </el-form>
  </div>
</template>

<script>
import md5 from 'blueimp-md5';

export default {
  name: 'forgetPwd',
  data() {
    return {
      forgetPwdForm: {
        registerType: 1,  // 注册方式
        phone: '', // 用户手机号
        email: '', // 用户邮箱
        verifyCode: '', // 验证码
        password: '', // 密码
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { min: 11, max: 11, message: '长度 11 个字符', trigger: 'change' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'change' },
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
  },
  methods: {
    captchaPhone() {
      console.log(this.forgetPwdForm.phone);
      this.$store.dispatch('captcha', { account: this.forgetPwdForm.phone, action: 'find' });
    },
    captchaEmail() {
      this.$store.dispatch('captcha', { account: this.forgetPwdForm.email, action: 'find' });
    },
    forgetPwd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.forgetPwdForm.registerType);
          if (this.forgetPwdForm.registerType === 1) {  // 手机号注册
            this.$store.dispatch('forgetPwd', { mobile: this.forgetPwdForm.phone, find_verify: this.forgetPwdForm.verifyCode, type: 'mobile', new_password: md5(this.forgetPwdForm.password) });
          } else {  // 邮箱注册
            this.$store.dispatch('forgetPwd', { email: this.forgetPwdForm.email, find_verify: this.forgetPwdForm.verifyCode, type: 'email', new_password: md5(this.forgetPwdForm.password) });
          }
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
    margin: 0 auto;
    padding-top: 100px;
  }
  .register-type {
    margin-bottom: 10px;
  }
  .btn-reset-pwd {
    width: 100%;
  }
</style>
