<template>
  <footer class="footer">
    <div class="footer-content">
    </div>
    <div class="page-footer-copyright">
      Copyright © 2012-<span id="yearNew">2017</span> 深圳市投桃互动网络科技有限公司 ｜<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030402000264">粤公网安备 44030402000264号</a>｜<a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">粤ICP备15091171号-5</a>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'footer',
    props: {
    },
    data() {
      return {

      };
    },
  };
</script>

<style scoped>
  .footer {
    width: 100%;
    min-width: 1100px;
    height: 245px;
    z-index: 10;
    background-color: #324057;
  }
  .footer-content {
    height: 200px;
    margin: 0 auto;
    text-align: center;
    color: #a4aebd;
    background-color: #212930;
  }
  .page-footer-copyright {
    color: #7a889c;
    text-align: center;
    font-size: .7em;
    border-top: 1px solid #212930;
    line-height: 42px;
  }
  .page-footer-copyright a {
    color: #7a889c;
    text-decoration: none;
    cursor: pointer;
    -webkit-transition: color .1s ease-in-out;
    -moz-transition: color .1s ease-in-out;
    -o-transition: color .1s ease-in-out;
    transition: color .1s ease-in-out;
  }
</style>
