<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import storage from "./storage/index";
export default {
  name: "App",
  mounted() {
    storage.clear("age_", "user");
  },
};
</script>

<style>
</style>
