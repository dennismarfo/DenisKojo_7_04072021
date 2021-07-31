<template>
  <div id="nav">
    <vue-confirm-dialog></vue-confirm-dialog>
    <NavBar/>
  </div>
  <router-view/>
</template>

<script>

import NavBar from './components/NavBar.vue'
export default {
    name: "app",
    components: {
       NavBar,
        
    }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  

  a {
    font-weight: bold;
    color: white;
    font-size: 20px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
