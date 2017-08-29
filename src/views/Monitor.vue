<template>
  <div class="container">
    <el-table
      :data="statisticsInfo"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="补丁名称">
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template scope="scope">
          <span>{{ scope.row.created_at | formatTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import moment from 'moment';

  export default {
    name: 'monitor',
    data() {
      return {
        app_key: this.$route.params.key,  // 从路由中获取app的key，创建app的时候会生成一个唯一的key值
        statisticsInfo: [], // 统计信息
      };
    },
    computed: {
      ...mapGetters({
        statisticsInfo: 'statisticsInfo', // app详情
      }),
    },
    created: function created() {
      this.$store.dispatch('getInfo', { appKey: this.app_key });  // 补丁统计信息
    },
    methods: {

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

</style>
