<template>
  <div>
    <button class="overallBtn" @click="openForm()">Overall</button>
    <div class="modal" v-if="display === true">
      <div class="container">
        <h3>Balance: {{ balance }}</h3>
        <Chart style="margin-top: 20px;" type="bar" align="center" height="350" width="600" :options="chartOptions" :series="series"></Chart>
        <div class="inputField1">
          <label for="name" class='fieldName1'>Time peroid: </label>
          <input type="date" id="startDateField" v-model="startDate" @change="calOverall()">
          <input type="date" id="endDateField" v-model="endDate" @change="calOverall()">
        </div>
        <button @click="closeForm()">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import RecordStore from '@/store/record'
import moment, { max } from 'moment'

export default {
  components: { Chart: VueApexCharts },
  data() {
      return {
        startDate: null,
        endDate: null,
        minDate: null,
        maxDate: null,
        display: false,
        balance: null,
        count: 0,
        chartOptions: {
          chart: {
            id: 'vuechart-example',
          },
          xaxis: {
            categories: ['Income', 'Expense'],
          },
        },
        series: [
          {
            name: 'Income',
            data: [0]
          }, {
            name: 'Expense',
            data: [0]
          }
        ]
      }
  },
  created() {
    this.fetchRecord()
    this.findMinMaxDate(true)
  },
  methods: {
    async fetchRecord() {
        await RecordStore.dispatch('fetchRecord')
        this.records = RecordStore.getters.records
    },
    findAllMonth() {
      RecordStore.getters.records
    },
    openForm() {
      this.display = true
      this.calOverall()
    },
    closeForm() {
      this.form = {
        name: '',
        date: '',
        type: '',
        value: '',
      },
      this.display = false
    },
    async calOverall() {
      let balance = 0
      let income = 0
      let expense = 0
      var status = 0
      if (this.startDate == null && this.endDate == null) {
        RecordStore.getters.records.map((item, index) => {
          if (item.type == "income") {
              balance += item.value
              income += parseInt(item.value)
            } else {
              balance -= parseInt(item.value)
              expense += parseInt(item.value)
            }
            this.balance = balance
            this.series = [
              {
                name: 'Income',
                data: [income]
              },
              {
                name: 'Expense',
                data: [expense]
              }
            ]
        })
      } else {
        this.findMinMaxDate()
        await RecordStore.getters.records.map(item => {
          if ((moment(item.date).isBetween(this.minDate, this.maxDate) || moment(item.date).isSame(this.minDate) || moment(item.date).isSame(this.maxDate)) || this.count == 0) {
            if (item.type == "income") {
              balance += parseInt(item.value)
              income += parseInt(item.value)
            } else {
              balance -= parseInt(item.value)
              expense += parseInt(item.value)
            }
            this.balance = balance
            this.series = [
              {
                name: 'Income',
                data: [income]
              },
              {
                name: 'Expense',
                data: [expense]
              }
            ]
            status = 1
          }
        })
      }
      if (status == 0 && count != 0) {
        this.balance = balance
        this.series = [
          {
            name: 'Income',
            data: [0]
          },
          {
            name: 'Expense',
            data: [0]
          }
        ]
      }
      this.count += 1
    },
    findMinMaxDate(load) {
      var minDate = null
      var maxDate = null
      if (load) {
        RecordStore.getters.records.map((item, index) => {
          if (index == 0) {
            minDate = item.date
            maxDate = item.date
          } else {
            if (moment(item.date).isBefore(minDate)) {
              minDate = item.date
            } else if (moment(item.date).isAfter(maxDate)) {
              maxDate = item.date
            }
          }
        })
        this.minDate = minDate
        this.maxDate = maxDate
      } else {
        this.minDate = this.startDate
        this.maxDate = this.endDate
      }
    }
}
  }
</script>

<style>
.modal {
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
.container{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  height: 600px;
  width: 1100px;
  border-color: lightblue;
  background-color:white;
  border-radius: 2%;
}
.overallBtn {
  position: absolute;
  left: 850px;
  margin-top: 40px;
}
.inputField1 {
  margin-top: 40px;
}
.fieldName1 {
  margin-left: 70px;
  margin-top: -10px;
}
</style>