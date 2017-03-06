<template>
  <div class="container">
    <!--package列表-->
    <div class="grid-package">
      <div class="package">
        <p class="package-title">package</p>
        <el-button icon="plus" size="small" @click="addPackage"></el-button>
      </div>
      <div class="package-list">
        <template v-for="(element, index) in packageList">
          <div class="package-item">
            <div class="package-item-top">
              <div class="item-top-row">
                <p>{{element.name}}</p>
                <el-dropdown>
                  <el-button type="primary" size="mini">
                    <i class="el-icon-arrow-down"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <div @click="editPackageHandle(element)">
                      <el-dropdown-item>编辑</el-dropdown-item>
                    </div>
                    <div @click="delPackageHandle(element.key)">
                      <el-dropdown-item>删除</el-dropdown-item>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="item-top-row">
                <p class="app-version">{{element.app_version}}</p>
                <p class="app-version">{{element.created_at | formatTime}}</p>
              </div>
            </div>
            <draggable v-model="element.version" class="drag-area-package" :options="{group:{name:'people', pull:false}}" @change="listChange($event, index)">
              <div class="drag-item" v-for="(item, i) in element.version">
                <div class="item-row">
                  <p>{{item.name}}</p>
                  <div class="item-row-right">
                    <p>{{item.created_at | formatTime}}</p>
                    <el-button class="delete-btn" icon="delete" size="mini"></el-button>
                  </div>
                </div>
                <el-tag v-if="item.release_type === 1" type="gray">开发预览</el-tag>
                <el-tag v-if="item.release_type === 2" type="gray">全量下发</el-tag>
                <el-tag v-if="item.release_type === 3" type="gray">灰度发布</el-tag>
                <el-tag v-if="item.release_type === 4" type="gray">条件下发</el-tag>
                <el-tag v-if="item.release_time" type="gray">发布时间{{item.release_time | formatDateTime}}</el-tag>
                <el-tag v-if="item.is_mandatory === 1" type="gray">强制更新</el-tag>
                <el-tag v-if="item.is_silent === 1" type="gray">静默更新</el-tag>
              </div>
            </draggable>
          </div>
        </template>
      </div>
    </div>
    <!--补丁包列表-->
    <div class="grid-version">
      <div class="version">
        <p class="version-title">补丁包</p>
        <el-button icon="plus" size="small" @click="addVersion"></el-button>
      </div>
      <div class="version-list">
        <draggable v-model="versionList" class="drag-area-version" :options="{group:{ name:'people',  pull:'clone', put:true }}">
          <div class="drag-item" v-for="(item, i) in versionList">
            <div class="item-row">
              <p>{{item.name}}</p>
              <div class="item-row-right">
                <p>{{item.created_at | formatTime}}</p>
                <el-dropdown>
                  <el-button class="dropdown-version-btn" size="mini">
                    <i class="el-icon-arrow-down"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <div @click="editVersionHandle(item)">
                      <el-dropdown-item>编辑</el-dropdown-item>
                    </div>
                    <div @click="delVersionHandle(item.key)">
                      <el-dropdown-item>删除</el-dropdown-item>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <el-tag v-if="item.release_type === 1" type="gray">开发预览</el-tag>
            <el-tag v-if="item.release_type === 2" type="gray">全量下发</el-tag>
            <el-tag v-if="item.release_type === 3" type="gray">灰度发布</el-tag>
            <el-tag v-if="item.release_type === 4" type="gray">条件下发</el-tag>
            <el-tag v-if="item.release_time" type="gray">发布时间{{item.release_time | formatDateTime}}</el-tag>
            <el-tag v-if="item.is_mandatory === 1" type="gray">强制更新</el-tag>
            <el-tag v-if="item.is_silent === 1" type="gray">静默更新</el-tag>
          </div>
        </draggable>
      </div>
    </div>
    <!--创建/编辑package-->
    <el-dialog :title="addPackageFormTitle" v-model="addPackageFormVisible" size="small" :close-on-click-modal="false">
      <el-form :model="addPackageForm" :rules="packageFormRules" ref="addPackageForm">
        <el-form-item prop="name" label="package名称" :label-width="formLabelWidth">
          <el-input v-model="addPackageForm.name"></el-input>
        </el-form-item>
        <el-form-item label="安装包" :label-width="formLabelWidth">
          <el-upload
            class="package-upload"
            :action="fileToken.up_host"
            :data="{token: fileToken.token}"
            type="drag"
            :multiple="false"
            :before-upload="handlePackageBeforeUpload"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="handleError"
            :default-file-list="packageFileList"
          >
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <div v-if="appInfo.platform === 1" class="el-upload__tip" slot="tip">只能上传ipa文件</div>
            <div v-if="appInfo.platform === 2" class="el-upload__tip" slot="tip">只能上传apk文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div v-if="isEditPackage === false" slot="footer" class="dialog-footer">
        <el-button @click="addPackageFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createPackage('addPackageForm')" :loading="isLoading">确 定</el-button>
      </div>
      <div v-if="isEditPackage === true" slot="footer" class="dialog-footer">
        <el-button @click="addPackageFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePackage('addPackageForm')" :loading="isLoading">编 辑</el-button>
      </div>
    </el-dialog>
    <!--创建/编辑补丁-->
    <el-dialog :title="addVersionFormTitle" v-model="addVersionFormVisible" size="small" :close-on-click-modal="false">
      <el-form :model="addVersionForm" :rules="versionFormrules" ref="addVersionForm">
        <el-form-item prop="name" label="补丁名称" :label-width="formLabelWidth">
          <el-input v-model="addVersionForm.name"></el-input>
        </el-form-item>
        <el-form-item label="安装包" :label-width="formLabelWidth">
          <el-upload
            class="package-upload"
            :action="fileToken.up_host"
            :data="{token: fileToken.token}"
            type="drag"
            :multiple="false"
            :before-upload="handleVersionBeforeUpload"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="handleError"
            :default-file-list="versionFileList"
          >
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传ppk文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="releaseType" label="发布类型" :label-width="formLabelWidth">
          <el-radio-group v-model="addVersionForm.releaseType">
            <el-radio :label="1">开发预览</el-radio>
            <el-radio :label="2">全量下发</el-radio>
            <el-radio :label="3">灰度发布</el-radio>
            <el-radio :label="4">条件下发</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--如果是灰度发布-->
        <template v-if="addVersionForm.releaseType === 3">
          <el-form-item prop="grayType" label="灰度下发类型" :label-width="formLabelWidth">
            <el-radio-group v-model="addVersionForm.grayType">
              <el-radio :label="1">百分比</el-radio>
              <el-radio :label="2">设备数量</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="addVersionForm.grayType === 1" prop="grayPercent" label="灰度百分比" :label-width="formLabelWidth">
            <el-slider v-model="addVersionForm.grayPercent" :min="10" :max="90" :step="10" show-stops></el-slider>
          </el-form-item>
          <el-form-item v-if="addVersionForm.grayType === 2" prop="grayCount" label="灰度设备数量" :label-width="formLabelWidth">
            <el-input v-model="addVersionForm.grayCount"></el-input>
          </el-form-item>
        </template>
        <!--如果是灰度发布-->
        <!--如果是条件下发-->
        <el-form-item v-if="addVersionForm.releaseType === 4" prop="condition" label="下发条件" :label-width="formLabelWidth">
          <el-select
            class="condition-select"
            v-model="addVersionForm.condition"
            multiple
            filterable
            allow-create
            placeholder="请选择或输入下发条件"
            >
            <el-option
              v-for="item in addVersionForm.conditionOptions"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!--如果是条件下发-->
        <el-form-item prop="isMandatory" label="是否强制更新" :label-width="formLabelWidth">
          <el-switch on-text="" off-text="" v-model="addVersionForm.isMandatory" @change="isMandatoryChange"></el-switch>
        </el-form-item>
        <el-form-item prop="isSilent" label="是否静默更新" :label-width="formLabelWidth">
          <el-switch on-text="" off-text="" v-model="addVersionForm.isSilent" @change="isSilentChange"></el-switch>
        </el-form-item>
        <el-form-item v-if="isEditVersion === false" prop="isReleaseNow" label="立即发布" :label-width="formLabelWidth">
          <el-switch on-text="" off-text="" v-model="addVersionForm.isReleaseNow"></el-switch>
        </el-form-item>
        <el-form-item v-if="addVersionForm.isReleaseNow === false" prop="releaseTime" label="发布时间" :label-width="formLabelWidth">
          <el-date-picker v-model="addVersionForm.releaseTime" :editable="false" type="datetime" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item prop="description" label="更新描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="addVersionForm.description"></el-input>
        </el-form-item>
        <el-form-item prop="metaInfo" label="扩展字段" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="addVersionForm.metaInfo" placeholder="格式为json字符串"></el-input>
        </el-form-item>
        <div><div id="jsoneditor" style="width: 400px; height: 400px;"></div></div>
      </el-form>
      <div v-if="isEditVersion === false" slot="footer" class="dialog-footer">
        <el-button @click="addVersionFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createVersion('addVersionForm')" :loading="isLoading">确 定</el-button>
      </div>
      <div v-if="isEditVersion === true" slot="footer" class="dialog-footer">
        <el-button @click="addVersionFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateVersion('addVersionForm')" :loading="isLoading">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import draggable from 'vuedraggable';
  import moment from 'moment';
  // import JSONEditor from 'jsoneditor';

  export default {
    name: 'drag',
    data() {
      return {
        qiniuResponse: {},  // 上传文件成功后七牛返回的hash和name等信息
        app_key: this.$route.params.key,  // 从路由中获取app的key，创建app的时候会生成一个唯一的key值
        packageListArray: [], // package列表数据
        currentEditPackageKey: '',  // 当前编辑的package的key
        isEditPackage: false, // false: 正在创建package, true: 正在编辑package
        addPackageFormVisible: false, // 创建/编辑package弹出框是否显示
        addPackageFormTitle: '创建package',  // 创建package弹出框标题，新增的时候是"创建package"，编辑的时候是"编辑package"
        packageFileList: [], // 上传的package文件列表
        addPackageForm: { // 创建/编辑package的表单数据
          name: '',
        },
        packageFormRules: {
          name: [
            { required: false, message: '请输入package名称', trigger: 'blur' },
          ],
        },
        formLabelWidth: '130px',
        versionListArray: [], // 补丁列表数据
        currentEditVersionKey: '',  // 当前编辑的补丁的key
        isEditVersion: false, // false: 正在创建补丁, true: 正在编辑补丁
        addVersionFormVisible: false, // 创建/编辑补丁弹出框是否显示
        addVersionFormTitle: '创建补丁',  // 创建补丁弹出框标题，新增的时候是"创建补丁"，编辑的时候是"编辑补丁"
        versionFileList: [], // 上传的补丁文件列表
        addVersionForm: { // 创建/编辑补丁的表单数据
          name: '', // 补丁名称
          releaseType: 2, // 发布类型
          grayType: 1,  // 灰度下发类型
          grayPercent: 20,  // 灰度百分比
          grayCount: 100, // 灰度设备数量
          condition: [],  // 灰度条件
          conditionOptions: ['ios>=9', 'ios>=10', 'ios>=11'], // 灰度条件可选项
          isMandatory: false, // 是否强制更新
          isSilent: false,  // 是否静默更新
          isReleaseNow: true, // 立即发布
          releaseTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),  // 发布时间(初始值默认当前时间)
          description: '',  // 更新描述
          metaInfo: '', // 扩展字段
        },
        versionFormrules: {
          name: [
            { required: true, message: '请输入补丁名称', trigger: 'blur' },
          ],
        },
      };
    },
    computed: {
      isLoading() { // 是否loading中
        return this.$store.state.packages.isLoading;
      },
      packageListShouldReload() {  // package列表是否需要重新加载
        return this.$store.state.packages.packageListShouldReload;
      },
      versionListShouldReload() {  // 补丁列表是否需要重新加载
        return this.$store.state.version.versionListShouldReload;
      },
      packageList: {
        get() {
          return this.$store.state.packages.packageList;
        },
        set(value) {
          this.$store.commit('PACKAGE_LIST', value);
        },
      },
      versionList: {
        get() {
          return this.$store.state.version.versionList;
        },
        set(value) {
          this.$store.commit('VERSION_LIST', value);
        },
      },
      ...mapGetters({
        // packageList: 'packageList', // package列表数据
        // versionList: 'versionList', // 补丁列表数据
        appInfo: 'appInfo', // 应用详情
        fileToken: 'fileToken', // 上传凭证（七牛）
      }),
    },
    watch: {
      // packageList: function xx() {
      //   this.packageListArray = this.packageList;
      // },
      // versionList: function xx() {
      //   this.versionListArray = this.versionList;
      // },
      packageListShouldReload: function xx() {  // 检查创建package是否成功
        if (this.packageListShouldReload) {  // 创建package成功
          this.addPackageFormVisible = false; // 关闭弹出框
          this.addPackageForm.name = '';  // 清空输入框
          this.$store.dispatch('packageList', { app_key: this.app_key, page: '' }); // 获取应用的package列表
        }
      },
      versionListShouldReload: function xx() {  // 检查创建补丁是否成功
        if (this.versionListShouldReload) {  // 创建补丁成功
          this.addVersionFormVisible = false; // 关闭弹出框
          this.addVersionForm.name = '';  // 清空输入框
          this.$store.dispatch('versionList', { app_key: this.app_key, page: '' }); // 获取应用的补丁列表
        }
      },
    },
    created: function created() {
      console.log('-----------------xxx');
      this.$store.dispatch('packageList', { app_key: this.app_key, page: '' }); // 获取应用的package列表
      this.$store.dispatch('versionList', { app_key: this.app_key, page: '' }); // 获取应用的补丁列表
      // this.packageListArray = this.packageList;
      // this.versionListArray = this.versionList;

      // const container = document.getElementById('jsoneditor');
      // const options = {};
      // const editor = new JSONEditor(container, options);
      // // set json
      // const json = {
      //   Array: [1, 2, 3],
      //   Boolean: true,
      //   Null: null,
      //   Number: 123,
      //   Object: { a: 'b', c: 'd' },
      //   String: 'Hello World',
      // };
      // editor.set(json);
      // // get json
      // const json2 = editor.get();
      // console.log(json2);
    },
    methods: {
      listChange(evt, index) {
        // console.log(this.packageListArray);
        // console.log(evt);
        // console.log(index);
        // this.packageListArray[index] = [
        //   { name: evt.added.element.name },
        // ];
        console.log(this.packageList[index].version[0]);
        console.log(evt.added.newIndex);
        if (evt.added.newIndex === 0) {
          this.packageList[index].version.splice(1, 1);
        } else {
          this.packageList[index].version.splice(0, 1);
        }
        console.log(this.packageList);
        // console.log(this.packageListArray);
        // const item = {name: evt.added.element.name};
        // this.$set(this.packageListArray[index], 0, { name: evt.added.element.name });
      },
      getFileToken() {  // 获取七牛文件上传凭证
        const nowTime = new Date().getTime() / 1000; // 当前时间戳(只到分钟)
        // console.log(nowTime);
        // console.log(this.fileToken.expires);
        // console.log(this.fileToken.expires - nowTime);
        if (this.fileToken.expires && (this.fileToken.expires - nowTime) >= 600) {
          // console.log('过期时间大于10分钟，不需要重新获取');
        } else {
          this.$store.dispatch('fileToken');  // 获取七牛文件上传凭证
        }
      },
      addPackage() {  // 新增package按钮点击事件，需要调七牛获取上传凭证的接口
        this.qiniuResponse = {};  // 清空上传文件成功后七牛返回的hash和name等信息
        this.isEditPackage = false;
        this.addPackageFormTitle = '创建package';
        this.addPackageForm.name = '';  // 清空package名称输入框
        // this.packageFileList = [];  // 清空已上传的文件列表
        this.addPackageFormVisible = true;
        this.getFileToken();  // 获取七牛文件上传凭证
      },
      addVersion() {  // 新增补丁按钮点击事件，需要调七牛获取上传凭证的接口
        this.qiniuResponse = {};  // 清空上传文件成功后七牛返回的hash和name等信息
        this.isEditVersion = false;
        this.addVersionFormTitle = '创建补丁';
        this.addVersionForm.name = '';  // 清空补丁名称输入框
        // this.VersionFileList = [];  // 清空已上传的文件列表
        this.addVersionForm.releaseType = 2;  // 发布类型
        this.addVersionForm.grayType = 1;  // 灰度下发类型
        this.addVersionForm.grayPercent = 20;  // 灰度百分比
        this.addVersionForm.grayCount = 100;  // 灰度设备数量
        this.addVersionForm.condition = [];  // 灰度条件
        this.addVersionForm.isMandatory = false;  // 是否强制更新
        this.addVersionForm.isSilent = false;  // 是否静默更新
        this.addVersionForm.isReleaseNow = true;  // 立即发布
        this.addVersionForm.releaseTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');  // 发布时间
        this.addVersionForm.description = '';  // 更新描述
        this.addVersionForm.metaInfo = '';  // 扩展字段
        this.addVersionFormVisible = true;
        this.getFileToken();  // 获取七牛文件上传凭证
      },
      handlePackageBeforeUpload(file) {  // 上传文件之前检查文件格式是否符合要求
        // console.log(file);
        if (this.appInfo.platform === 1 && file.name.lastIndexOf('.ipa') < 0) {
          this.$message.error('只能上传.ipa格式的文件！');
          return false;
        }
        if (this.appInfo.platform === 2 && file.name.lastIndexOf('.apk') < 0) {
          this.$message.error('只能上传.apk格式的文件！');
          return false;
        }
        return true;
      },
      handleVersionBeforeUpload(file) {  // 上传文件之前检查文件格式是否符合要求
        // console.log(file);
        if (file.name.lastIndexOf('.ppk') < 0) {
          this.$message.error('只能上传.ppk格式的文件！');
          return false;
        }
        return true;
      },
      handleRemove() {
        this.addPackageForm.appPackage = '';
        this.addVersionForm.appVersion = '';
      },
      handleSuccess(response) { // 上传文件成功，保存七牛返回的数据
        this.addPackageForm.appPackage = 1;
        this.addVersionForm.appVersion = 1;
        // console.log(response);
        this.qiniuResponse = Object.assign({}, this.qiniuResponse, response);
      },
      handleError() {
        this.addPackageForm.appPackage = '';
        this.addVersionForm.appVersion = '';
      },
      createPackage(formName) {  // 创建package
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 创建package
            this.$store.dispatch('createPackage', {
              name: this.addPackageForm.name,
              file_name: this.qiniuResponse.name,
              hash: this.qiniuResponse.hash,
              app_key: this.appInfo.key,
            });
          }
        });
      },
      updatePackage(formName) {  // 编辑package
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 编辑package
            this.$store.dispatch('updatePackage', {
              name: this.addPackageForm.name,
              file_name: this.qiniuResponse.name,
              hash: this.qiniuResponse.hash,
              package_key: this.currentEditPackageKey,
              app_key: this.appInfo.key,
            });
          }
        });
      },
      editPackageHandle(packageInfo) { // package列表项的dropdown编辑按钮事件处理
        // console.log(packageInfo);
        this.currentEditPackageKey = packageInfo.key; // 记录当前编辑的package的key
        this.qiniuResponse = {};  // 清空上传文件成功后七牛返回的hash和name等信息
        this.isEditPackage = true;
        this.addPackageFormTitle = '编辑package'; // 修改弹出框的标题
        this.addPackageForm.name = packageInfo.name;  // 在输入框中显示package的名称
        // this.packageFileList = [];  // 清空已上传的文件列表
        this.addPackageFormVisible = true;
        this.getFileToken();  // 获取七牛文件上传凭证
      },
      delPackageHandle(packageKey) {  // package列表项的dropdown删除按钮事件处理
        console.log(packageKey);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$store.dispatch('delPackage', { key: packageKey });
        }).catch(() => {
        });
      },
      createVersion(formName) { // 创建补丁
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 创建补丁
            this.$store.dispatch('createVersion', {
              name: this.addVersionForm.name,
              file_name: this.qiniuResponse.name,
              hash: this.qiniuResponse.hash,
              app_key: this.appInfo.key,
              release_type: this.addVersionForm.releaseType,
              gray_type: this.addVersionForm.grayType,
              gray_percent: this.addVersionForm.grayPercent / 10,
              gray_count: this.addVersionForm.grayCount,
              condition: JSON.stringify(this.addVersionForm.condition),
              is_mandatory: this.addVersionForm.isMandatory === false ? 0 : 1,
              is_silent: this.addVersionForm.isSilent === false ? 0 : 1,
              release_time: this.addVersionForm.isReleaseNow ? '' : moment(this.addVersionForm.releaseTime).format('YYYY-MM-DD HH:mm:ss'),
              description: this.addVersionForm.description,
              meta_info: this.addVersionForm.metaInfo,
              package_key: '',
            });
          }
        });
      },
      updateVersion(formName) {  // 编辑补丁
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 编辑补丁
            this.$store.dispatch('updateVersion', {
              name: this.addVersionForm.name,
              file_name: this.qiniuResponse.name,
              hash: this.qiniuResponse.hash,
              app_key: this.appInfo.key,
              version_key: this.currentEditVersionKey,
              release_type: this.addVersionForm.releaseType,
              gray_type: this.addVersionForm.grayType,
              gray_percent: this.addVersionForm.grayPercent / 10,
              gray_count: this.addVersionForm.grayCount,
              condition: JSON.stringify(this.addVersionForm.condition),
              is_mandatory: this.addVersionForm.isMandatory === false ? 0 : 1,
              is_silent: this.addVersionForm.isSilent === false ? 0 : 1,
              release_time: this.addVersionForm.isReleaseNow ? '' : moment(this.addVersionForm.releaseTime).format('YYYY-MM-DD HH:mm:ss'),
              description: this.addVersionForm.description,
              meta_info: this.addVersionForm.metaInfo,
              package_key: '',
            });
          }
        });
      },
      editVersionHandle(versionInfo) { // 补丁列表项的dropdown编辑按钮事件处理
        // console.log(versionInfo);
        this.currentEditVersionKey = versionInfo.key; // 记录当前编辑的package的key
        this.qiniuResponse = {};  // 清空上传文件成功后七牛返回的hash和name等信息
        this.isEditVersion = true;
        this.addVersionFormTitle = '编辑补丁'; // 修改弹出框的标题
        this.addVersionForm.name = versionInfo.name;  // 在输入框中显示package的名称
        this.addVersionForm.releaseType = versionInfo.release_type;  // 发布类型
        this.addVersionForm.grayType = versionInfo.gray_type;  // 灰度下发类型
        this.addVersionForm.grayPercent = versionInfo.gray_percent * 10;  // 灰度百分比
        this.addVersionForm.grayCount = versionInfo.gray_count;  // 灰度设备数量
        this.addVersionForm.condition = versionInfo.condition ? JSON.parse(versionInfo.condition) : '';  // 下发条件
        this.addVersionForm.isMandatory = versionInfo.is_mandatory === 1;  // 是否强制更新
        this.addVersionForm.isSilent = versionInfo.is_silent === 1;  // 是否静默更新
        this.addVersionForm.isReleaseNow = false;  // 立即发布
        this.addVersionForm.releaseTime = moment(versionInfo.release_time).format('YYYY-MM-DD HH:mm:ss');  // 发布时间
        this.addVersionForm.description = versionInfo.description;  // 更新描述
        this.addVersionForm.metaInfo = versionInfo.metaInfo;  // 扩展字段
        // this.versionFileList = [];  // 清空已上传的文件列表
        this.addVersionFormVisible = true;
        this.getFileToken();  // 获取七牛文件上传凭证
      },
      delVersionHandle(versionKey) {  // 补丁列表项的dropdown删除按钮事件处理
        console.log(versionKey);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$store.dispatch('delVersion', { key: versionKey });
        }).catch(() => {
        });
      },
      isMandatoryChange(value) {  // 是否强制更新改变后的回调
        if (value === true) { // 如果选择强制更新，就不能选择静默更新
          this.addVersionForm.isSilent = false;
        }
      },
      isSilentChange(value) { // 是否静默更新改变后的回调
        if (value === true) { // 如果选择静默更新，就不能选择强制更新
          this.addVersionForm.isMandatory = false;
        }
      },
    },
    filters: {
      formatTime: function xx(time) {
        return moment(time).format('YYYY-MM-DD');
      },
      formatDateTime: function xx(time) {
        return moment(time).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    components: {
      draggable,
    },
  };

</script>
<style scoped>
  .container {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
    /*height: 100%;*/
    height: -moz-calc(100vh - 64px);
    height: -webkit-calc(100vh - 64px);
    height:  calc(100vh - 64px);
    overflow: hidden;
  }
  .grid-package,
  .grid-version {
    flex: 7;
    height: 100%;
    margin-left: 20px;
    overflow: scroll;
    background-color: rgb(248, 249, 251);
    border-radius: 4px;
    padding-bottom: 40px;
  }
  .package,
  .version {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 15px;
    border-bottom: 1px solid #e4e8f1;
  }
  .package-list,
  .version-list {
    padding: 0 15px;
  }
  .package-title,
  .version-title {
    font-size: 18px;
    margin: 2px 0;
  }
  .package-item {
    margin-top: 15px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #20A0FF;
  }
  .package-item-top {
    padding: 5px 10px;
    padding-bottom: 1px;
    background: #20A0FF;
  }
  .item-top-row {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 7px;
  }
  .package-item-top p {
    margin: 0;
    text-align: center;
    font-size: 15px;
    color: #fff;
  }
  .package-item-top p.app-version {
    font-size: 14px;
  }
  .drag-area-package {
    padding: 5px;
  }
  .drag-area-package .drag-item {
    padding: 3px 5px 5px;
    background: #E5E9F2;
    border-radius: 4px;
  }
  .drag-area-version .drag-item {
    background: #fff;
    margin-top: 15px;
    padding: 3px 5px 5px 5px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
  }
  .delete-btn {
    border: none;
    background: transparent;
  }
  .drag-item p {
    margin: 0;
    padding: 6px 0px;
    font-size: 14px;
    color: #2c3e50;
  }
  .el-upload {
    width: 100%;
  }
  .item-row {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .item-row-right {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .dropdown-version-btn {
    background: transparent;
    border: none;
  }
  .condition-select {
    width: 100%;
  }
</style>
