<template>
  <div class="ali-pay">
    <Loading></Loading>
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
import Loading from "./../components/Loading";
export default {
  name: "AliPay",
  data() {
    return {
      orderId: this.$route.params.orderId,
      content: "",
    };
  },
  mounted() {
    if (!this.orderId) {
      this.$router.back();
      return;
    }
    this.paySubmit();
  },
  methods: {
    paySubmit() {
      this.axios
        .post("pay", {
          orderId: this.orderId,
          orderName: "支付宝测试支付",
          amount: 0.01,
          payType: 1,
        })
        .then((res) => {
          this.content = res.content;
          setTimeout(() => {
            document.getElementById("bestPayForm").submit();
          }, 100);
        });
    },
  },
  components: {
    Loading,
  },
};
</script>

<style>
</style>