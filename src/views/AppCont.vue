<template>
  <div class="container">
    <div class="grid">
      <div class="grid-nav">
        <div class="app-info">
          <!--app图标-->
          <img v-if="appInfo.icon" class="app-logo" :src="appInfo.icon" alt="app-logo">
          <img v-else class="app-logo" src="../assets/applogo-default.png" alt="app-logo">
          <!--app所属平台-->
          <p v-if="appInfo.platform === 1" class="platform"><i class="fa fa-apple"></i>iOS</p>
          <p v-if="appInfo.platform === 2" class="platform"><i class="fa fa-android"></i>Android</p>
          <p class="app-name">{{appInfo.name}}</p>
          <!--app最新版本-->
          <p class="app-version">App最新版本：{{appInfo.app_version || ''}}</p>
          <!--应用包名-->
          <p class="app-identifier">应用包名：{{appInfo.app_identifier}}</p>
        </div>
        <div class="nav">
          <router-link class="nav-item" :to="{name: 'patch'}">
            <span>补丁下发</span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
          <router-link class="nav-item" :to="{name: 'monitor'}">
            <span>实时监控</span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
          <router-link class="nav-item" :to="{name: 'appInfo'}">
            <span>App信息</span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </div>
      </div>
      <div class="grid-content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'appCont',
    data() {
      return {
        app_key: this.$route.params.key,  // 从路由中获取app的key，创建app的时候会生成一个唯一的key值
      };
    },
    computed: {
      ...mapGetters({
        appInfo: 'appInfo', // app详情
      }),
    },
    created: function created() {
      this.$store.dispatch('info', { app_key: this.app_key });  // 获取app详情
    },
    methods: {
    },
    components: {
    },
  };

</script>
<style scoped>
  .container {
    margin: 0 auto;
    min-height: -moz-calc(100vh - 64px);
    min-height: -webkit-calc(100vh - 64px);
    min-height:  calc(100vh - 64px);
  }
  .grid {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
  }
  .grid-nav {
    flex: 5;
    max-width: 30%;
    overflow: hidden;
  }
  .grid-content {
    flex: 16;
    height: 100%;
    margin-left: 20px;
    margin-top: 20px;
  }
  .app-info {
    padding-top: 100px;
    text-align: center;
    max-height: 500px;
    overflow: hidden;
  }
  .app-logo {
    width: 100px;
  }
  .app-name,
  .app-key {
    font-size: 16px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .app-identifier{
    word-break:break-all;
  }
  .platform {
    font-size: 14px;
  }
  .fa-apple {
    font-size: 16px;
    margin-right: 5px;
  }
  .fa-android {
    font-size: 16px;
    margin-right: 5px;
  }
  .nav {
    padding: 50px 10px 0;
  }
  .nav-item {
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    padding: 16px 20px;
    font-size: 14px;
    text-decoration: none;
    color: #2c3e50;
  }
  .nav-item.router-link-active,
  .nav-item:hover{
    background-color: #20A0FF;
    color: #fff;
  }
</style>
