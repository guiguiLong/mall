<template>
  <div class="scan">
    <div class="mask"></div>
    <div class="item-wrap">
      <div class="img-scan"></div>
      <div class="img-pay">
        <div class="title">
          微信支付
          <em @click="$emit('closepaymodal')"></em>
        </div>
        <div class="qrcode">
          <img :src="imgUrl" />
        </div>
        <div class="tip">
          <p>请使用微信扫一扫</p>
          <p>二维码完成支付</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scan",
  props: ["imgUrl"],
};
</script>

<style lang="scss">
@import "./../assets/scss/mixin";
.scan {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.6;
    background-color: #000000;
  }
  .item-wrap {
    z-index: 11;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 670px;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    .img-scan {
      @include bgImg(296px, 485px, "/imgs/pay/icon-scan.png");
    }
    .img-pay {
      width: 370px;
      height: 440px;
      background: #fff;
      display: flex;
      flex-direction: column;
      .title {
        height: 60px;
        line-height: 60px;
        padding: 0 18px;
        font-size: 20px;
        background: #f5f5f5;
        color: #333;
        position: relative;
        em {
          position: absolute;
          right: 18px;
          top: 18px;
          @include bgImg(13px, 13px, "/imgs/icon-close.png");
          cursor: pointer;
        }
      }
      .qrcode {
        text-align: center;
        padding: 44px 0 26px;
        img {
          width: 237px;
          height: 240px;
        }
      }
      .tip {
        text-align: center;
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>