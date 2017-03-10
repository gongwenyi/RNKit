<template>
  <div class="container" >
    <div class="top_bar">
      <div class="message">
        <h1 class="mes_tittle">13523453245</h1>
        <h2 class="mes_detail">SD敢达康师傅GV楼上的回复水电费加快速度放款后速度快解放和公里数肯德基法规和楼上的回复省的hlkjasdh5</h2>
      </div>
      <ul class="prduct_choose">
        <li>
          <router-link class="item" :to="{name: 'vip' }" >
            <i class="item_img"></i>
            <span>vip</span>
            <em></em>
          </router-link>
        </li>
        <li>
          <router-link class="item" :to="{name: 'vvip' }">
            <i class="item_img"></i>
            <span>vvip</span>
          </router-link>
        </li>
          <li>
          <router-link class="item" :to="{name: 'vvvip' }">
            <i class="item_img"></i>
            <span>vvvip</span>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'product',
  data() {
    return {
    };
  },
  computed: {
  },
  created() {
    this.$store.commit('IS_INDEX_PAGE', true); // 不在首页
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
  margin:0;
  padding:0;
}
a{
  text-decoration: none;
}
.top_bar{
  height: 500px;
  background-image: linear-gradient(90deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
  margin: 0 auto;
  color: #fff;
}
.message{
  padding-top: 50px;
}
.mes_tittle{
  text-align: center;
  padding:20px 0;
  max-width: 610px;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  font-weight: 600;
  text-transform: capitalize;
}
.mes_detail{
  text-align: center;
  max-width: 700px;
  margin: -15px auto 25px auto;
  color: rgba(196, 227, 255, 0.8);
  font-size: 18px;
  font-weight: 300;
  line-height: 30px;
  text-transform: none;
}
.prduct_choose {
  width: 100%;
  display: flex;
  margin-top:30px;
  height:300px;
}
.prduct_choose li{
  position: relative;
  text-align: center;
  list-style: none;
  padding: 2% 5% 0;
  display: block;
  flex:1;
  height:300px;
}
.prduct_choose li a{
  width: 100%;
  height: 100%;
  display: block;
}
.router-link-active:after{
  position: absolute;
  left: 50%;
  bottom: 0;
  content: " ";
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid #fff;
}
.prduct_choose li span{
  display: block;
  color:#fff;
  font-weight: bold;
  font-size: 20px;
}
.item_img{
    display: inline-block;
    height: 155px;
    width: 205px;
    margin-bottom: 25px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}
.prduct_choose li:nth-of-type(1) i{
  background-image: url('../assets/index/compute.svg');
}
.prduct_choose li:nth-of-type(2) i{
  background-image: url('../assets/index/storage.svg');
}
.prduct_choose li:nth-of-type(3) i{
  background-image: url('../assets/index/dedicated.svg');
}
</style>
