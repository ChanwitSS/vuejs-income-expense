<template>
  <div>
    <button @click="openForm()">Add record</button>
    <div class='modal' v-if="formDisplay">
      <div class="inputContainer" id="addForm" :model="form" >
        <h2>Add record</h2>

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
          <select id="type" v-model="form.type">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div class="inputField">
          <label for="name" class='fieldName'>Value(Bath): </label>
          <input type="number" v-model="form.value">
        </div>

        <button class="confirmBtn" @click="addRecord()">Confirm</button>
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
      editIndex: -1,
      formDisplay: false,
      form: {
          name: '',
          date: '',
          type: '',
          value: 0,
      },
    }
  },
  methods:{
    addRecord() {
      let payload = {
        name: this.form.name,
        date: this.form.date,
        type: this.form.type,
        value: this.form.value
      }
      RecordStore.dispatch('addRecord', payload)
      this.closeForm()
      console.log(RecordStore.getters.records)
    },
    openForm() {
      this.formDisplay = true
    },
    closeForm() {
      this.form = {
        name: '',
        date: '',
        type: '',
        value: 0,
      },
      this.formDisplay = false
    }
  },
}
</script>

<style scoped>
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
  border-radius: 2%;
}
button{
  margin: 15px;
  position: relative;
  background-color: #29B6F6;
  border: none;
  color: white;
  padding: 15px 32px;
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