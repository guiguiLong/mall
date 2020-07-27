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
  },
  mounted() {
    this.axios.get("/user/login").then((res) => {
      this.user = res;
    });
  },
};
</script>

<style lang="scss">
@import "./assets/scss/config.scss";
@import "./assets/scss/reset.scss";
</style>
