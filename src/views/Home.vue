<template>
  <div class="home">
    <h1>Income/Expense Records</h1>
    <RecordForm/>
    <RecordOverall/>
    <RecordTable/>
  </div>
</template>

<script>
import RecordTable from '@/components/RecordTable.vue'
import RecordForm from '@/components/RecordForm.vue'
import RecordOverall from '@/components/RecordOverall.vue'

export default {
  components: { RecordTable, RecordForm, RecordOverall },
  data() {
    return {
    }
  },
  methods:{
  }
}
</script>

<style scoped>

</style>
