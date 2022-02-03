<template>
  <div id="app">
    <div class="content-rout">
      <navBar></navBar>
      <router-view> </router-view>
    </div>
  </div>
</template>
<script>
 
import navBar from './user/nav-bar.vue'
export default {
  name: 'app', 
  components:{
    navBar
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
 }
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;

}
 .content-rout{
  width: 100%;
  height: 100%;
  }
</style>