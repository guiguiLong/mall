<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="https://www.baidu.com/" target="_blank">我的主页</a>
      <a href="https://www.baidu.com/" target="_blank">Vue全栈课程</a>
      <a href="https://www.baidu.com/" target="_blank">React全家桶课程</a>
      <a href="https://www.baidu.com/" target="_blank">微信支付专项课程（H5+小程序+Node+Mongo）</a>
    </div>
    <div class="copyright">
      Copyright ©2019
      <span class="domain">mi.futurefe.com</span> All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: "NavFooter",
};
</script>

<style lang="scss">
@import "../assets/scss/config";

.footer {
  height: 234px;
  border-top: 4px solid $colorA;
  background-color: $colorB;
  font-size: 16px;
  text-align: center;
  color: $colorD;
  .footer-logo {
    margin: 46px 0 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    a {
      color: $colorD;
      display: inline-block;
      position: relative;
      padding-right: 16px;
      &::before {
        content: " ";
        position: absolute;
        right: 0px;
        width: 1px;
        height: 11px;
        background-color: #999;
        margin: 0 8px 0 8px;
        top: 25%;
      }
      &:last-child::before {
        display: none;
      }
    }
    margin-bottom: 13px;
  }
  .copyright {
    .domain {
      color: #ff6600;
    }
  }
}
</style>