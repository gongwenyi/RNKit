<template>
  <div class="container">
    <div class="chart">
      <h3 class="chart-title">最近一周更新成功和失败数量</h3>
      <bar-chart
        :chart-data="barDatacollection"
        :options="{responsive: false, maintainAspectRatio: true}"
        :width="600"
        :height="350"
      ></bar-chart>
    </div>
    <div class="chart">
      <h3 class="chart-title">各个版本所占比例</h3>
      <doughnut-chart
        :chart-data="doughnutDatacollection"
        :options="{responsive: false, maintainAspectRatio: true}"
        :width="600"
        :height="350"
      ></doughnut-chart>
    </div>
  </div>
</template>

<script>
  import BarChart from '../chart/barChart';
  import DoughnutChart from '../chart/doughnutChart';

  export default {
    name: 'monitor',
    data() {
      return {
        barDatacollection: null,
        doughnutDatacollection: null,
      };
    },
    computed: {
    },
    created: function created() {
      this.fillBarData();
      this.fillDoughnutData();
    },
    methods: {
      fillBarData() {
        this.barDatacollection = {
          labels: ['一', '二', '三', '四', '五', '六', '七'],
          datasets: [
            {
              label: '装机量',
              backgroundColor: '#49b2d4',
              data: [20, 50, 30, 80, 40, 100, 70],
            }, {
              label: '成功量',
              backgroundColor: '#549975',
              data: [18, 45, 26, 80, 37, 92, 66],
            }, {
              label: '失败量',
              backgroundColor: '#b35f4e',
              data: [2, 5, 4, 0, 3, 8, 4],
            },
          ],
        };
      },
      fillDoughnutData() {
        this.doughnutDatacollection = {
          labels: ['1.0.0', '2.1.0', '3.0.0', '4.0.0'],
          datasets: [
            {
              backgroundColor: ['#49b2d4', '#549975', '#b35f4e', '#7c5299'],
              borderWidth: 0,
              data: [20, 50, 30, 80],
            },
          ],
        };
      },
    },
    components: {
      BarChart,
      DoughnutChart,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chart {
    width: 620px;
    padding: 10px;
    margin: 50px auto;
    background-color: #222733;
    border-radius: 4px;
  }
  .chart-title {
    padding-bottom: 8px;
    text-align: center;
    color: #83211d;
    border-bottom: 1px solid #2d3446;
  }
</style>
