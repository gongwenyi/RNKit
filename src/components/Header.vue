<template>
  <header class="nav">
    <div class="nav-content">
      <router-link :to="{name: 'index'}">
        <img class="logo" src="../assets/logo.png" alt="RNKit云服务">
      </router-link>
      <div class="nav-list">
        <router-link class="item" :to="{name: 'index'}">首页</router-link>
        <router-link v-show="authIsLogin === true" class="item" :to="{name: 'myApp'}">我的应用</router-link>
        <!-- <router-link class="item" :to="{name: 'index'}">价格</router-link> -->
        <a class="item" target="_blank" href="https://github.com/rnkit/rnkit-code-push-docs">文档</a>
        <a class="item" target="_blank" href="https://github.com/rnkit/rnkit-code-push-cli">工具</a>
        <a class="item" target="_blank" href="https://github.com/rnkit/rnkit-code-push">SDK下载</a>
        <!-- <router-link class="item" :to="{name: 'index'}">工具</router-link>
        <router-link class="item" :to="{name: 'index'}">SDK下载</router-link> -->
        <router-link v-show="authIsLogin === false" class="item" :to="{name: 'login'}">登录</router-link>
        <router-link v-show="authIsLogin === false" class="item" :to="{name: 'register'}">注册</router-link>
        <div v-show="authIsLogin === true" class="item-me">
          <el-dropdown class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <img src="../assets/avatar.png" style="width: 30px; border-radius: 30px;" alt="avatar">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="bind">绑定手机/邮箱</el-dropdown-item>
              <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

  </header>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'header',
    props: {
    },
    data() {
      return {
        index: false,
      };
    },
    computed: {
      ...mapGetters([
        'authIsLogin',  // 用户是否登录
      ]),
    },
    watch: {
    },
    created: function created() {
    },
    methods: {
      handleCommand(command) {
        // console.log(command);
        if (command === 'bind') {  // 绑定手机/邮箱
          this.$router.push({ name: 'bind' });
          return false;
        }
        if (command === 'changePwd') {  // 修改密码
          this.$router.push({ name: 'changePwd' });
          return false;
        }
        if (command === 'logout') { // 退出登录
          // console.log('退出');
          this.$store.dispatch('logout');
          return false;
        }
        return false;
      },
    },
  };
</script>

<style scoped>
  .nav {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 54px;
    background-image: linear-gradient(90deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    z-index: 10;
  }
  .nav-content {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1200px;
    min-width: 1100px;
    margin: 0 auto;
  }
  .item {
    display: inline-block;
    height: 53px;
    padding: 0 15px;
    line-height: 53px;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
  }
  .item:hover,
  .item.router-link-active {
    color: #fff;
    border-bottom: 2px solid #E5E9F2;
  }
  .item-me {
    display: inline-block;
    position: relative;
    padding-left: 10px;
  }
  .dropdown {
    top: 10px;
  }
</style>
