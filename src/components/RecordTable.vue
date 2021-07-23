<template>
  <div>
    <table align="center">
      <thead>
        <tr>
          <th>No.</th>
          <th>Description</th>
          <th>Date</th>
          <th>Type</th>
          <th>Value</th>
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
              <button @click="openForm(index)">Edit</button>
            </td>
        </tr>
      </tbody>
    </table>

    <div class='modal' v-if="formDisplay">
      <div class="inputContainer" id="editForm" :model="form" >
        <h3>Edit record</h3>

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

        <button class="confirmBtn" @click="editRecord()">Confirm</button>
        <button class="cancelBtn" @click="closeForm()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import RecordStore from '@/store/record'
import RecordForm from '@/components/RecordForm'
export default {
    components: { RecordForm },
    data() {
      return {
          records: [],
          editIndex: -1,
          formDisplay: null,
          form: {
            name: '',
            date: '',
            type: '',
            value: '',
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
      openForm(index) {
        this.formDisplay = true
        this.editIndex = index
      },
      closeForm() {
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
</style>