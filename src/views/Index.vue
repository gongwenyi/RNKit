<template>
  <div class="container">
    <div class="banner">
        <p class="slogan-title">领先的 BaaS 提供商<br/>为移动开发提供专业的云端支持</p>
    </div>
    <div class="products">
      <p class="pro_title">我们的服务</p>
      <p class="service_title">超过数十企业、数百应用托管在此,遍布各热门行业</p>
      <ul class="pro_contain">
        <li v-for="(item, index) in products" >
            <i class="pro_li_img"></i>
            <div class="pro_li_body">
              <p class="pro_li_title"> {{ item.title }} </p>
              <p class="pro_li_details"> {{ item.details }} </p>
              <p class="pro_li_price"> {{ item.price }} </p>
            </div>
        </li>
      </ul>
    </div>
    <div class="service">
      <p class="pro_title">简单、专业、独立、可靠</p>
      <p class="service_title">超越市面80%的同类产品，超级好用！我真的不骗你！</p>
      <ul class="ser_contain">
        <li v-for="(item, index) in service" >
          <i class="ser_li_img" v-bind:class="item.icon"></i>
          <p class="ser_li_title"> {{ item.message }} </p>
        </li>
      </ul>
    </div>
    <div class="cooperate">
      <p class="pro_title">他们都没在用😂</p>
      <div class="coo_body">
        <img class="coo_pic" src="../assets/index/home_tmdzsypt-792e0d19d5.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      products: [
        { title: '应用分发', price: '内侧免费', details: '提供移动应用一键分发' },
        { title: '移动统计', price: '内测免费', details: '为您提供实时、免费、专业的移动应用分析' },
        { title: '代码热更新', price: '公测免费', details: '提供基于ReactNative、JSPatch的代码热推送' },
      ],
      service: [
        { icon: 'icon-realtime-protection', message: '7x24提供服务' },
        { icon: 'icon-globe', message: '我们在全球部署了多个节点' },
        { icon: 'icon-sla', message: '99.99％SLA保证' },
        { icon: 'icon-platform', message: '提供全平台支持' },
      ],
    };
  },
  computed: {
  },
  created() {
    // 判断是否为首页
    this.$store.commit('IS_INDEX_PAGE', true);
  },
  methods: {
  },
  components: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
*{
  padding: 0;
  margin:0;
}
a{
  text-decoration: none;
}
a:visited{
/*  color: #000;*/
}
.banner{
  height: 500px;
  background-image: linear-gradient(90deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
  margin: 0 auto;
  color: #fff;
}
.banner p {
  padding-top: 200px;
  text-align: center;
}
.slogan-title{
  text-align: center;
  font-size: 42px;
  font-weight: bold;
  line-height: 68px;
}
.products{
  width: 80%;
  margin: 30px 10% 25px;
  border-bottom: 1px solid #ddd;
}
.pro_title{
  text-align: center;
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 24px;
  line-height: 34px;
}
.pro_contain{
  display: flex;
  margin-bottom: 20px;
  margin-top: 35px;
}
.pro_contain li{
  list-style: none;
  float: left;
  flex:1;
  display: inline-block;
  margin: 0 20px;
  border: 1px solid transparent;
  border-radius: 3px;
}
.pro_contain li:hover{
  border-color: #eee;
}
.pro_li_img{
  display: block;
  height: 200px;
  width: 200px;
  margin: 0 auto 25px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.pro_contain li:nth-of-type(1) i{
  background-image: url('../assets/index/application.svg');
}
.pro_contain li:nth-of-type(2) i{
  background-image: url('../assets/index/analysis.svg');
}
.pro_contain li:nth-of-type(3) i{
  background-image: url('../assets/index/codepush.svg');
}
.pro_li_body p{
  text-align: center;
}
.pro_li_title{
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 20px;
  line-height: 28px;
  font-weight: bold;
  color:#363b40;
}
.pro_li_details{
  margin-bottom: 24px;
  color: #616366;
  font-size: 16px;
  line-height: 28px;
}
.pro_li_price{
  height: 56px;
  min-width: 120px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 500;
  color: #1e88e5;
}
/*服务*/
.service{
  width: 80%;
  margin: 30px 10% 25px;
  border-bottom: 1px solid #ddd;
}
.service_title{
  text-align: center;
  color: #616366;
}
.ser_contain{
  margin-top: 80px;
  width: 100%;
  height:180px;
}
.ser_contain li{
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  flex-direction: row;
  float: left;
  width: 25%;
  padding: 0 1%;
  height:150px;
  /*border: 1px solid #eee;*/
}
.ser_li_img{
  display: block;
  height: 55px;
  width: 55px;
  // font-size: 65px;
  // color: #1e88e5;
  border-radius: 50%;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.icon-realtime-protection {
  background-image: url('../assets/index/7x24.svg');
}
.icon-globe {
  background-image: url('../assets/index/globe.svg');
}
.icon-sla {
  background-image: url('../assets/index/SLA.svg');
}
.icon-platform {
  background-image: url('../assets/index/full-platform.svg');
}

.ser_li_title{
  width: 85%;
  margin:0 auto;
  text-align: center;
}
.ser_join{
  display: block;
  width: 180px;
  height: 50px;
  background: #fff;
  border: 1px solid #1e88e5;
  color: #1e88e5;
  font-weight: bold;
  border-radius: 3px;
  margin: 10px auto;
}
.ser_join:hover{
  background: #1e88e5;
  opacity: 0.8;
  border: 1px solid #fff;
  color: #fff;
}
/*合作商*/
.cooperate{
  padding: 25px 0 0;
}
.coo_body{
  width: 70%;
  height:550px;
  margin: 25px auto;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.coo_pic{
  width: 100%;
  height: 100%;
  display: block;
}
.coo_join{margin-top: -100px;}
/*加入我们*/
.join{
  background-image: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
  padding: 50px 0;
  color: #fff;
}
</style>
