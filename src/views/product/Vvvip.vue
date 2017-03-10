<template>
  <div class="container">
    <div class="vip_top">
      <span :class="{ active:isActive }" @click="vip_choose(1)">方式1</span>
      <span :class="{ active:!isActive }" @click="vip_choose(2)">方式2</span>
    </div>
    <ul class="pro_list">
      <li v-for="(item, index) in vip">
        <div class="item_header">
          <span class="header_ssd">{{ item.ssd}}GB &nbsp; SSD</span>
          <span class="header_price">￥{{item.price}}</span>
        </div>
        <div class="item_body">
          <span>{{item.cpu}} &nbsp;CPU</span>
          <span>{{item.memory}} &nbsp; Memory</span>
          <span>{{item.bandwidth}} &nbsp Bandwidth</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'vip',
  data() {
    return {
      isActive: true,
      vip: [],
      vip1: [
        { ssd: 20, price: '2.50', cpu: 1, memory: 512, bandwidth: 500 },
        { ssd: 20, price: '5', cpu: 1, memory: 1024, bandwidth: 1000 },
        { ssd: 20, price: '10', cpu: 1, memory: 2048, bandwidth: 2000 },
        { ssd: 20, price: '20', cpu: 2, memory: 4096, bandwidth: 3000 },
      ],
      vip2: [
        { ssd: 120, price: '12.50', cpu: 1, memory: 512, bandwidth: 500 },
        { ssd: 20, price: '5', cpu: 1, memory: 1024, bandwidth: 1000 },
        { ssd: 20, price: '10', cpu: 1, memory: 2048, bandwidth: 2000 },
        { ssd: 20, price: '20', cpu: 2, memory: 4096, bandwidth: 3000 },
      ],
    };
  },
  computed: {
  },
  created() {
    this.$store.commit('IS_INDEX_PAGE', true); // 不在首页
    this.vip = this.vip1;
  },
  methods: {
    vip_choose(i) {
      this.isActive = !this.isActive;
      if (i === 1) {
        this.vip = this.vip1;
      } else if (i === 2) {
        this.vip = this.vip2;
      }
    },
  },
  components: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.vip_top{
  width: 300px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid #eee;
  margin: 50px auto;
}
.vip_top span{
  display: inline-block;
  float: left;
  width: 50%;
  height: 100%;
  line-height: 50px;
  text-align: center;
}
.vip_top .active{
  background: #1e88e5;
  border-radius: 50px;
  color:#fff;
  font-weight: bold;
}
.pro_list{
  max-width: 1200px;
  height: 600px;
  margin:0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: space-around;
}
.pro_list li{
  list-style: none;
  float: left;
  width: 23%;
  height: 280px;
  margin: 1%;
  border: 1px solid #eee;
}
.pro_list li div{
  width: 100%;
  height: 50%;
  padding: 28px 20px;
}
.pro_list li span{
  width:100%;
  display: inline-block;
  text-align: center;
}
.item_header{
  border-bottom: 1px solid #eee;
}
.header_ssd{
  margin: 0 0 10px 0;
  font-size: 15px;
  font-weight: bold;
}
.header_price{
  display: block;
  color: #1e88e5;
  font-size: 38px;
  font-weight: 500;
  line-height: 50px;
}
.item_body span{
  margin: 0 0 8px 0;
  color: #616366;
  font-weight: bold;
}
</style>
