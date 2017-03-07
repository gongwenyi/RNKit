<template>
  <header class="nav" :class="{'index' : isIndexPage }">
    <div class="nav-content">
      <router-link :to="{name: 'index'}">
        <img class="logo" src="../assets/logo.png" alt="RNKit云服务">
      </router-link>
      <div class="nav-list">
        <router-link v-show="authIsLogin === true" class="item" :to="{name: 'myApp'}">我的应用</router-link>
        <router-link class="item" :to="{name: 'register'}">价格</router-link>
        <router-link class="item" :to="{name: 'register'}">文档</router-link>
        <router-link class="item" :to="{name: 'register'}">工具</router-link>
        <router-link class="item" :to="{name: 'resetPwd'}">SDK下载</router-link>
        <router-link v-show="authIsLogin === false" class="item" :to="{name: 'login'}">登录</router-link>
        <router-link v-show="authIsLogin === false" class="item" :to="{name: 'register'}">注册</router-link>
        <div v-show="authIsLogin === true" class="item-me">
          <el-dropdown class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <img src="../assets/avatar.png" style="width: 30px; border-radius: 30px;" alt="avatar">
            </span>
            <el-dropdown-menu slot="dropdown">
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
    watch: {
      index: function xx() {
        console.log(121212121);
        return this.$route.name === 'index';
      },
    },
    computed: {
      ...mapGetters([
        'authIsLogin',
        'isIndexPage',
      ]),
    },
    methods: {
      handleCommand(command) {
        // console.log(command);
        if (command === 'logout') {
          // console.log('退出');
          this.$store.dispatch('logout');
        }
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
    background-color: #20a0ff;
    z-index: 10;
  }
  .index{
    background-color: rgba(255,255,255,0);
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
