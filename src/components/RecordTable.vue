<template>
  <div>
    <table align="center">
      <thead>
        <tr>
          <th>No.</th>
          <th>Description</th>
          <th>Date</th>
          <th>Type</th>
          <th>Value(Bath)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in records" v-bind:key="index">
            <td>{{ index+1 }}</td>
            <td>{{ record.name }}</td>
            <td>{{ record.date }}</td>
            <td>{{ record.type }}</td>
            <td>{{ record.value }}</td>
            <td>
              <button @click="openForm(index, record)">Edit</button>
            </td>
        </tr>
      </tbody>
    </table>

    <div class='modal' v-if="formDisplay">
      <div class="inputContainer" id="editForm" :model="form" >
        <h2>Edit record</h2>

        <div class="inputField">
          <label for="name" class='fieldName'>Description: </label>
          <input type="text" v-model="form.name">
        </div>
        
        <div class="inputField">
          <label for="name" class='fieldName'>Date: </label>
          <input type="date" id="inpurDateField" min="2021-07-24" v-model="form.date">
        </div>

        <div class="inputField">
          <label for="name" class='fieldName'>Type: </label>
          <select id="type" v-model="form.type" selected="form.type">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div class="inputField">
          <label for="name" class='fieldName'>Value(Bath): </label>
          <input type="number" v-model="form.value">
        </div>

        <button class="confirmBtn" @click="editRecord()">Confirm</button>
        <button class="cancelBtn" @click="closeForm()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import RecordStore from '@/store/record'
export default {
    data() {
      return {
          records: [],
          formDisplay: false,
          editIndex: -1,
          form: {
            name: '',
            date: '',
            type: '',
            value: 0,
          }
      }
    },
    created() {
      this.fetchRecord();
    },
    methods: {
      async fetchRecord() {
        await RecordStore.dispatch('fetchRecord')
        this.records = RecordStore.getters.records
      },
      editRecord() {
        let payload = {
          index: this.editIndex,
          name: this.form.name,
          date: this.form.date,
          type: this.form.type,
          value: this.form.value
        }
        console.log(payload)
        RecordStore.dispatch('editRecord', payload)
        this.closeForm()
    },
      openForm(index, record) {
        this.formDisplay = true
        this.editIndex = index
        let cloned = JSON.parse(JSON.stringify(record))
        this.form.name = cloned.name
        this.form.type = cloned.type
        this.form.value = cloned.value
        this.form.date = cloned.date
      },
      closeForm() {
        this.form = {
          name: '',
          date: '',
          type: '',
          value: '',
        },
        this.formDisplay = false
      }
    }
}
</script>

<style>
th, td {
  border-bottom: 1px solid #ddd;
  padding: 30px;
}
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
.inputContainer{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  height: 400px;
  width: 600px;
  border-color: lightblue;
  background-color:white;
  border-radius: 2%;
}
.button{
  margin: 15px;
  position: relative;
}
.confirmBtn{
  transform: translate(0%, 0%);
}
.cancelBtn{
  transform: translate(0%, 00%);
}
button{
  margin: 15px;
  position: relative;
  background-color: #29B6F6;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.confirmBtn{
  background-color: #e7e7e7; 
  color: black;
  transform: translate(0%, 0%);
}
.cancelBtn{
  transform: translate(0%, 0%);
}
.inputField{
  padding: 12px;
  margin: 5px;
}
input{
  padding: 5px;
  margin-left: 30px;
  border-radius: 4px;;
  width: 300px;
  height: 20px;
  border-color: black;
  border-width: 1px;
}
select{
  padding: 5px;
  margin-left: 30px;
  border-radius: 4px;;
  width: 310px;
  height: 30px;
  border-color: black;
  border-width: 1px;
}
.fieldName{
  position: absolute;
  left: 80px;
  width: 70px;
  padding: 5px;
}
</style>