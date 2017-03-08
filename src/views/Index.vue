<template>
  <div class="container">
    <div class="banner">
        <p class="slogan-title">RNKit  云服务</p>
    </div>
    <div class="products">
      <p class="pro_title">我们的产品</p>
      <ul class="pro_contain">
        <li v-for="(item, index) in products" >
          <i class="pro_li_img"></i>
          <div class="pro_li_body">
            <p class="pro_li_title"> 类型：{{ item.title }} </p>
            <p class="pro_li_details"> 详情：{{ item.details }} </p>
            <p class="pro_li_price"> 价格：{{ item.price }} 元起</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="service">
      <p class="pro_title">简洁、有效、可靠</p>
      <p class="service_title">超越市面80%的同类产品，超级好用！我真的不骗你！</p>
      <ul class="ser_contain">
        <li v-for="(item, index) in service" >
          <i class="ser_li_img"></i>
            <p class="ser_li_title"> {{ item.message }} </p>
        </li>
      </ul>
      <button class="ser_join">join us —></button>
    </div>
    <div class="cooperate">
      <p class="pro_title">他们都在用</p>
      <div class="coo_body">
        <img class="coo_pic" src="../assets/index/home_tmdzsypt-792e0d19d5.png">
      </div>
      <button class="ser_join coo_join">join us —></button>
    </div>
    <div class="join">
      <p class="slogan-title">加入我们，拥有更多可能!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      products: [
        { title: 'VIP', price: 121212, details: 'ABS德川家康拉不舍得吃辣不舍得局部哈商家电话vasdhvo' },
        { title: 'VVIP', price: 122236564, details: 'ABS德川家康拉不舍得吃辣不舍得局部哈商家电话vasdhvo' },
        { title: 'VVVIP', price: 122236564, details: 'ABS德川家康拉不舍得吃辣不舍得局部哈商家电话vasdhvo' },
      ],
      service: [
        { message: '你猜我会不会给你提供服务！哈哈哈哈哈哈' },
        { message: '你猜我会不会给你提供服务！哈哈哈爱的哈' },
        { message: '你猜我会不会给你提供服务！哈哈阿萨德哈哈' },
        { message: '你猜我会不会给你提供服务！哈哈阿斯顿发斯蒂芬哈哈' },
        { message: '你猜我会不会给你提供服务！哈哈阿萨德法师打发斯蒂芬哈哈' },
        { message: '你猜我会不会给你提供服务！哈哈' },
        { message: '你猜我会不会给你提供服务！哈哈阿斯顿发生哈哈' },
        { message: '你猜我会不会给你提供服务！哈哈申达股份三个傻瓜哈哈' },
      ],
    };
  },
  computed: {
  },
  created() {
    // 判断是否为首页
    this.$store.commit('IS_INDEX_PAGE', true);
    // 滚动改变header颜色
    window.onscroll = function () {
      const indexNav = document.getElementsByClassName('index');
      if (document.body.scrollTop >= 500) {
        indexNav[0].style = 'background: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%)';
      } else {
        indexNav[0].style = 'background: rgba(255,255,255,0)';
      }
    };
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
.banner{
  height: 500px;
  background-image: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
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
  line-height: 48px;
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
}
.pro_contain li{
  list-style: none;
  float: left;
  flex:1;
  display: inline-block;
  margin: 0 20px;
  border: 2px solid #fff;
}
.pro_contain li:hover{
  border-color: #eee; 
}
.pro_li_img{
  display: block;
  height: 155px;
  width: 205px;
  margin: 0 auto 25px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.pro_contain li:nth-of-type(1) i{
  background-image: url('../assets/index/compute.svg');
}
.pro_contain li:nth-of-type(2) i{
  background-image: url('../assets/index/dedicated.svg');
}
.pro_contain li:nth-of-type(3) i{
  background-image: url('../assets/index/storage.svg');
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
  margin: -15px 0 20px;
}
.ser_contain{
  width: 100%;
  height:300px;
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
  background-image: url('../assets/index/compute.svg');
  display: block;
  height: 55px;
  width: 55px;
  border-radius: 50%;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
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
  border-radius: 3px;
  margin: 10px auto;
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
