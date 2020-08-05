<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import storage from "./storage/index";
export default {
  name: "App",
  data() {
    return {
      user: {},
    };
  }
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
</style>
