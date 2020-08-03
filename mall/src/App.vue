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
    if (this.$cookie.get("userId")) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    getUser() {
      this.axios
        .get("/user")
        .then((res) => {
          this.$store.dispatch("saveUserName", res.username);
        })
        .catch((err) => {
          throw err;
        });
    },
    getCartCount() {
      this.axios
        .get("/carts")
        .then((res) => {
          this.$store.dispatch("saveCartCount", res.cartProductVoList.length);
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
</style>
