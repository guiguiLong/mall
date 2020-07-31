<template>
  <div>
    <NavHeader></NavHeader>
    <h2>购物车页面</h2>
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import NavHeader from "../components/NavHeader";
import NavFooter from "../components/NavFooter";
export default {
  name: "Cart",
  components: {
    NavHeader,
    NavFooter,
  },
};
</script>

<style>
</style>