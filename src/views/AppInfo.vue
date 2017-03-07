<template>
  <div class="app-info-container">
    <p class="info-row"><label>创建时间：</label>{{appInfo.created_at | formatTime}}</p>
    <p class="info-row"><label>app_key：</label>{{appInfo.key}}</p>
    <p class="info-row"><label>应用状态：</label>{{appInfo.status === 1 ? '正常' : '不正常'}}</p>
    <p class="info-row" v-if="appInfo.platform === 1"><label>应用平台：</label><i class="fa fa-apple"></i>iOS</p>
    <p class="info-row" v-if="appInfo.platform === 2"><label>应用平台：</label><i class="fa fa-android"></i>Android</p>
    <p class="info-row"><label>应用包名：</label>{{appInfo.app_identifier}}</p>
    <el-form :model="editAppForm" :rules="rules" ref="editAppForm">
      <el-form-item prop="name" label="应用名称：" :label-width="formLabelWidth">
        <el-input v-model="editAppForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="downloadUrl" label="下载地址：" :label-width="formLabelWidth">
        <el-input v-model="editAppForm.downloadUrl"></el-input>
      </el-form-item>
      <el-button class="edit-btn" type="primary" @click="edit('editAppForm')" :loading="editIsLoading">编 辑</el-button>
      <el-button class="del-btn" type="danger" @click="del" :loading="delIsLoading">删除App</el-button>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import moment from 'moment';

  export default {
    name: 'appInfo',
    data() {
      return {
        editAppForm: {
          name: '',
          downloadUrl: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入应用名称', trigger: 'blur' },
            { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'change' },
          ],
          downloadUrl: [
            { required: false, message: '请输入下载地址', trigger: 'blur' },
            { min: 4, max: 200, message: '长度在 4 到 200 个字符', trigger: 'change' },
          ],
        },
        formLabelWidth: '110px',
      };
    },
    computed: {
      editIsLoading() { // 编辑app是否loading中
        return this.$store.state.app.editIsLoading;
      },
      delIsLoading() { // 删除app是否loading中
        return this.$store.state.app.delIsLoading;
      },
      ...mapGetters({
        appInfo: 'appInfo', // app详情
      }),
    },
    created: function created() {
      this.editAppForm.name = this.appInfo.name;
      this.editAppForm.downloadUrl = this.appInfo.download_url;
      this.$store.commit('IS_INDEX_PAGE', false); // 不在首页
    },
    methods: {
      edit(formName) {  // 编辑app
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 编辑APP
            this.$store.dispatch('edit', { key: this.appInfo.key, name: this.editAppForm.name, download_url: this.editAppForm.downloadUrl });
          }
        });
      },
      del() {  // 删除app
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning',
        }).then(() => {
          this.$store.dispatch('del', { key: this.appInfo.key });
        }).catch(() => {
        });
      },
    },
    watch: {
      appInfo: function xx() { // 检测创建app是否成功
        this.editAppForm.name = this.appInfo.name;
        this.editAppForm.downloadUrl = this.appInfo.download_url;
      },
    },
    filters: {
      formatTime: function xx(time) {
        return moment(time).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    components: {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app-info-container {
    width: 500px;
    margin: 100px auto 0;
  }
  .info-row {
    font-size: 14px;
    color: #48576a;
  }
  .fa-apple {
    font-size: 16px;
    margin-right: 5px;
  }
  .fa-android {
    font-size: 16px;
    margin-right: 5px;
  }
  .info-row label {
    display: inline-block;
    width: 110px;
    text-align: right;
    vertical-align: middle;
    font-size: 14px;
    font-size: 14px;
    line-height: 1;
    padding: 11px 12px 11px 0;
  }
  .edit-btn {
    display: block;
    width: 400px;
    margin: 0 auto;
  }
  .del-btn {
    display: block;
    margin: 70px auto;
  }
</style>
