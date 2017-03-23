<template>
  <footer class="footer">
    <div class="footer-content">
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
    height: 100px;
    z-index: 10;
    background-color: #324057;
  }
  .footer-content {
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    color: #a4aebd;
  }
</style>
