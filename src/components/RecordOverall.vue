<template>
  <div>
    <div>
      <h3>Balance: {{ balance }}</h3>
    </div>

    <h3></h3>
  </div>
</template>

<script>
export default {
  data() {
      return {
          balance: 0,
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