<template>
  <div>
    <router-view></router-view>
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import NavFooter from "../components/NavFooter";

export default {
  name: "Order",
  data() {
    return {
      title: "",
      tip: "",
    };
  },
  components: {
    NavFooter,
  },
  created() {
    let name = this.$route.name;

    if (name === "list") {
      this.title = "订单列表";
      this.tip = "请仔细核对金额,谨防诈骗";
    } else if (name === "confirm") {
      this.title = "确认订单";
      this.tip = "请认真核对送货地址";
    } else if (name === "pay") {
      this.title = "订单支付";
      this.tip = "请仔细核对金额,谨防诈骗";
    }
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/config";
@import "./../assets/scss/button";
</style>