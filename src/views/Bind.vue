<template>
  <div class="container">
    <!--如果用户是手机号注册，但是还没绑定邮箱-->
    <template v-if="currentUserInfo.reg_type === 'mobile' && !currentUserInfo.email">
      <h3>用户{{ currentUserInfo.name }}，您注册的手机号为：{{ currentUserInfo.mobile }}</h3>
      <h3>您还可以绑定邮箱</h3>
      <el-form :model="bindForm" :rules="rules" ref="bindForm">
        <el-form-item prop="email">
          <el-input size="large" v-model="bindForm.email" placeholder="请输入邮箱">
            <el-button slot="append" @click="captchaEmail()">获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input size="large" v-model="bindForm.verifyCode" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-button class="btn-reset-pwd" :loading="isLoading" size="large" type="primary" @click="bind('bindForm')">确 定</el-button>
      </el-form>
    </template>
    <!--如果用户是邮箱注册，但是还没绑定手机号-->
    <template v-if="currentUserInfo.reg_type === 'email' && !currentUserInfo.mobile">
      <h3>用户{{ currentUserInfo.name }}，您注册的邮箱为：{{ currentUserInfo.email }}</h3>
      <h3>您还可以绑定手机号</h3>
      <el-form :model="bindForm" :rules="rules" ref="bindForm">
        <el-form-item prop="phone">
          <el-input size="large" v-model="bindForm.phone" placeholder="请输入手机号">
            <el-button slot="append" @click="captchaPhone()">获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input size="large" v-model="bindForm.verifyCode" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-button class="btn-reset-pwd" :loading="isLoading" size="large" type="primary" @click="bind('bindForm')">确 定</el-button>
      </el-form>
    </template>
    <!--如果用户已经绑定手机号/邮箱，提示信息如下-->
    <template v-if="currentUserInfo.mobile && currentUserInfo.email">
      <h3>您已完成绑定，可使用以下三种方式登录：</h3>
      <h3>用户名：{{ currentUserInfo.name }}</h3>
      <h3>手机号：{{ currentUserInfo.mobile }}</h3>
      <h3>邮箱：{{ currentUserInfo.email }}</h3>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'bind',
  data() {
    return {
      bindForm: {
        phone: '', // 用户手机号
        email: '', // 用户邮箱
        verifyCode: '', // 验证码
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
      },
    };
  },
  created() {
    this.$store.commit('IS_INDEX_PAGE', false); // 不在首页
    this.$store.dispatch('getCurrentUserInfo'); // 获取用户信息，主要是拿到用户的注册方式，从而确定需要用户绑定邮箱还是手机号
  },
  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading;
    },
    ...mapGetters({
      currentUserInfo: 'currentUserInfo', // 用户信息
    }),
  },
  methods: {
    captchaPhone() {
      console.log(this.bindForm.phone);
      this.$store.dispatch('captcha', { account: this.bindForm.phone, action: 'change' });
    },
    captchaEmail() {
      this.$store.dispatch('captcha', { account: this.bindForm.email, action: 'change' });
    },
    bind(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.bindForm.registerType);
          if (this.currentUserInfo.registerType === 'email') {  // 绑定手机号
            this.$store.dispatch('bindMobile', { phone: this.bindForm.phone, code: this.bindForm.verifyCode });
          } else {  // 绑定邮箱
            this.$store.dispatch('bindEmail', { email: this.bindForm.email, code: this.bindForm.verifyCode });
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
