<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'my-project'
  }
</script>

<style>
  /* CSS */
  html body {
    height: 100%;
    margin: 0;
    overflow: hidden;
  }
  h3 {
    margin: 0;
  }
  #app {
    width: 100vw;
    height: 100vh;
    background-color: skyblue;
  }
</style>
