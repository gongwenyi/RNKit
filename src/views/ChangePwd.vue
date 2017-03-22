<template>
  <div class="container">
    <el-form :model="changePwdForm" :rules="rules" ref="changePwdForm">
      <h3>您正在通过原密码修改密码</h3>
      <el-form-item prop="oldPassword">
        <el-input size="large" v-model="changePwdForm.oldPassword" type="password" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input size="large" v-model="changePwdForm.newPassword" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-button class="btn-reset-pwd" :loading="isLoading" size="large" type="primary" @click="changePwd('changePwdForm')">修改密码</el-button>
    </el-form>
  </div>
</template>

<script>
import md5 from 'blueimp-md5';

export default {
  name: 'changePwd',
  data() {
    return {
      changePwdForm: {
        oldPassword: '', // 原密码
        newPassword: '', // 新密码
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'change' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'change' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'change' },
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
    changePwd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('changePwd', { old_password: md5(this.changePwdForm.oldPassword), new_password: md5(this.changePwdForm.newPassword) });
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
