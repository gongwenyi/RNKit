<template>
  <div class="container" v-loading="getAppListIsLoading" element-loading-text="拼命加载中">
    <template v-for="item in appList">
      <el-card class="card" :body-style="{ padding: '0px' }">
        <!--app图标-->
        <img v-if="item.icon" class="logo" :src="item.icon" alt="app-logo">
        <img v-else class="logo" src="../assets/applogo-default.png" alt="app-logo">
        <!--app所属平台-->
        <p v-if="item.platform === 1" class="platform"><i class="fa fa-apple"></i>iOS</p>
        <p v-if="item.platform === 2" class="platform"><i class="fa fa-android"></i>Android</p>
        <!--app名称-->
        <h3 class="app-name">{{item.name}}</h3>
        <!--app最新版本-->
        <p class="app-version">App最新版本：{{item.app_version || ''}}</p>
        <!--应用包名-->
        <p class="app-identifier">应用包名：{{item.app_identifier}}</p>
        <router-link :to="{name: 'patch', params: { key: item.key }}"><el-button class="button" size="small">管 理</el-button></router-link>
      </el-card>
    </template>
    <el-card class="card" :body-style="{ padding: '0px' }">
      <p class="icon-add">
        <img src="../assets/add.png" alt="" width="80">
      </p>
      <el-button class="button" size="small" @click="addAppFormVisible = true">创建App</el-button>
    </el-card>
    <!--加载更多-->
    <div v-if="appListTotalPages > appListCurrentPage" class="loadmore-btn-box">
      <el-button type="text" :loading="appListLoadMoreLoading" @click="appListLoadMore">加载更多</el-button>
    </div>
    <el-dialog title="创建App" v-model="addAppFormVisible" size="small" :close-on-click-modal="false">
      <el-form :model="addAppForm" :rules="rules" ref="addAppForm">
        <el-form-item prop="platform" label="应用平台" :label-width="formLabelWidth">
          <el-radio-group v-model="addAppForm.platform">
            <el-radio :label="1">ios</el-radio>
            <el-radio :label="2">android</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="name" label="应用名称" :label-width="formLabelWidth">
          <el-input v-model="addAppForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="identifier" label="应用包名" :label-width="formLabelWidth">
          <el-input v-model="addAppForm.identifier"></el-input>
        </el-form-item>
        <el-form-item prop="downloadUrl" label="下载地址" :label-width="formLabelWidth">
          <el-input v-model="addAppForm.downloadUrl"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAppFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create('addAppForm')" :loading="isLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'login',
    data() {
      return {
        appListCurrentPage: 1,  // app列表当前页
        addAppFormVisible: false, // 创建app弹出框是否显示
        addAppForm: {
          platform: 1,
          name: '',
          identifier: '',
          downloadUrl: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入应用名称', trigger: 'blur' },
            { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'change' },
          ],
          identifier: [
            { required: true, message: '请输入应用包名', trigger: 'blur' },
          ],
          downloadUrl: [
            { required: false, message: '请输入下载地址', trigger: 'blur' },
            { min: 4, max: 200, message: '长度在 4 到 200 个字符', trigger: 'change' },
          ],
        },
        formLabelWidth: '100px',
      };
    },
    computed: {
      getAppListIsLoading() { // 获取应用列表是否loading中
        return this.$store.state.app.getAppListIsLoading;
      },
      appListTotalPages() { // 获取应用列表是否loading中
        return this.$store.state.app.appListTotalPages;
      },
      isLoading() { // 创建app是否loading中
        return this.$store.state.app.isLoading;
      },
      createAppIsSuccess() {  // 创建app是否成功的标识
        return this.$store.state.app.createAppIsSuccess;
      },
      ...mapGetters({
        appList: 'appList', // 应用列表
      }),
    },
    watch: {
      createAppIsSuccess: function xx() { // 检测创建app是否成功
        if (this.createAppIsSuccess) {  // 创建app成功
          this.addAppFormVisible = false; // 关闭弹出框
          this.addAppForm.platform = 1; // 清空输入框
          this.addAppForm.name = '';
          this.addAppForm.identifier = '';
          this.addAppForm.downloadUrl = '';
        }
      },
    },
    created: function created() {
      this.$store.commit('CLEAR_APP_LIST'); // 清空APP列表
      this.$store.dispatch('list', { page: 1 });  // 获取应用列表
      this.$store.commit('IS_INDEX_PAGE', false); // 不在首页
    },
    methods: {
      create(formName) {  // 创建app
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 创建APP
            this.$store.dispatch('create', { name: this.addAppForm.name, app_identifier: this.addAppForm.identifier, platform: `${this.addAppForm.platform}`, download_url: this.addAppForm.downloadUrl });
          }
        });
      },
      appListLoadMore() { // app列表加载更多
        this.appListCurrentPage += 1;
        this.$store.dispatch('list', { page: this.appListCurrentPage });  // 获取应用列表
      },
    },
    components: {},
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    padding-top: 20px;
  }
  .container::after {
    content: '';
    display: block;
    clear: both;
  }
  .card {
    width: 210px;
    height: 278px;
    float: left;
    margin: 0 31px 20px;
    padding: 5px 10px 10px;
    text-align: center;
  }
  .logo {
    width: 90px;
  }
  .button {
    width: 80px;
    margin-top: 5px;
  }
  .icon-add {
    margin-top: 60px;
    margin-bottom: 10px;
  }
  .platform {
    font-size: 14px;
    margin-top: 6px;
  }
  .fa-apple {
    font-size: 16px;
    /*color: #5BC0DE;*/
    margin-right: 5px;
  }
  .fa-android {
    font-size: 16px;
    /*color: #95C03B;*/
    margin-right: 5px;
  }
  .app-name{
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .app-version,
  .app-identifier {
    font-size: 12px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .loadmore-btn-box {
    clear: both;
    margin-top: 10px;
    text-align: center;
  }

</style>
