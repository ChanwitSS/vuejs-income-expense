<template>
  <div>
    <div>
      <h3>Balance: {{ balance }}</h3>
      <Chart align="center" width="550" type="bar" :options="chartOptions" :series="series"></Chart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import RecordStore from '@/store/record'

export default {
  components: { Chart: VueApexCharts },
  data() {
      return {
        balance: RecordStore.getters.balance,
        chartOptions: {
          chart: {
            id: 'vuechart-example',
          },
          xaxis: {
            categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 81]
        }]
      }
  },
  created() {
    this.fetchRecord()
  },
  methods: {
    async fetchRecord() {
        await RecordStore.dispatch('fetchRecord')
        this.records = RecordStore.getters.records
    },
    findAllMonth() {
      RecordStore.getters.records
    }
}
  }
</script>

<style>
.overall{
  display: block; 
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
  padding-top: 60px;
}
</style>