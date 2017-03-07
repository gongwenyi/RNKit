<template>
  <div class="main">
    <Headers />
    <div class="content" :class="{'index' : isIndexPage }">
      <router-view></router-view>
    </div>
    <Footers />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Headers from 'components/Header';
import Footers from 'components/Footer';

export default {
  name: 'app',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'isIndexPage',
    ]),
  },
  components: {
    Headers,
    Footers,
  },
};
</script>

<style scoped>
  .content {
    max-width: 1200px;
    min-width: 1100px;
    margin: 0 auto;
    padding-top: 54px;
    min-height:  90%;/*写给不支持calc()的浏览器*/
    min-height: -moz-calc(100vh - 104px);
    min-height: -webkit-calc(100vh - 104px);
    min-height:  calc(100vh - 104px);
  }
  .index{
    max-width: 100%;
    padding-top: 0;
  }
</style>
