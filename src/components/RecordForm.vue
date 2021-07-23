<template>
  <div align="center">
    <button @click="openForm()">Add record</button>
    <div class='modal' v-if="formDisplay">
      <div class="inputContainer" id="addForm" :model="form" >
        <h3>Add record</h3>

        <div>
          <label for="name">Name</label>
          <input type="text" v-model="form.name">
        </div>
        
        <div>
          <label for="name">Date</label>
          <input type="text" v-model="form.date">
        </div>

        <div>
          <label for="name">Type</label>
          <input type="text" v-model="form.type">
        </div>

        <div>
          <label for="name">Value</label>
          <input type="text" v-model="form.value">
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
          value: '',
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
</style>