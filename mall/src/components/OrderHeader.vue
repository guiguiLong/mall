<template>
  <div class="order-header">
    <div class="container clearfix">
      <div class="header-logo">
        <a href="/index"></a>
      </div>
      <div class="title">
        <h2>
          {{title}}
          <slot name="tip"></slot>
        </h2>
      </div>
      <div class="username">
        <div class="username_title">
          {{username}}
          <i class="el-icon-arrow-down user-icon"></i>
        </div>
        <div class="username_select">
          <a href="/cart">购物车</a>
          <a href="/order/list">我的订单</a>
          <a href="javascript:;" @click="loginOut">退出登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "OrderHeader",
  computed: {
    ...mapState(["username"]),
  },
  methods: {
    //退出登录
    loginOut() {
      this.axios.post("/user/logout").then(() => {
        this.$router.push("/index");
        this.$cookie.set("userId", "", { expires: "-1" });
        this.$store.dispatch("saveUserName", "");
        this.$store.dispatch("saveCartCount", "0");
      });
    },
  },
  props: {
    title: String,
  },
};
</script>

<style lang="scss">
.order-header {
  padding: 30px 0;
  border-bottom: 2px solid #ff6600;
  .container {
    .header-logo {
      float: left;
    }
    .title,
    .username {
      display: inline-block;
      height: 55px;
      line-height: 55px;
    }
    .title {
      float: left;
      margin-left: 54px;
      h2 {
        font-size: 28px;
        color: #333;
      }
      span {
        font-size: 14px;
        margin-left: 17px;
        color: #999;
        font-weight: 200;
      }
    }
    .username {
      float: right;
      color: #666666;
      position: relative;
      &:hover {
        .username_select {
          opacity: 1;
          height: 108px;
        }
      }
      .username_title {
        .user-icon {
          font-weight: bold;
          font-size: 12px;
        }
        &:hover {
          color: #ff6600;
        }
      }
      .username_select {
        transition: all 0.5s;
        overflow: hidden;
        height: 0;
        opacity: 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 10px);
        box-shadow: 0 8px 8px rgba(0, 0, 0, 0.15);
        width: 68px;
        padding: 0 10px;
        a {
          display: inline-block;
          color: #333;
          text-align: center;
          font-size: 12px;
          width: 100%;
          height: 36px;
          line-height: 36px;
          &:hover {
            color: #ff6600;
          }
        }
      }
    }
  }
}
</style>