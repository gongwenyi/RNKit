<template>
  <div class="container">
    <div class="banner">
        <p class="slogan-title">RNKit  云服务</p>
    </div>
    <div class="products">
      <p class="pro_title">我们的产品</p>
      <ul class="pro_contain">
        <li ></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
    };
  },
  computed: {
  },
  created() {
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
.banner{
  background-image: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
  padding: 200px 0;
  color: #fff;
}
.banner p {
  margin:0 auto;
  text-align: center;
}
.banner .slogan-title{
  font-size: 42px;
  font-weight: bold;
  line-height: 48px;
}
.products{
  max-width: 1200px;
}
</style>
