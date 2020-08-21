<template>
  <div class="login">
    <div class="container">
      <a href="/index">
        <img src="/imgs/login-logo.png" alt />
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span>
            <span class="sep-line">|</span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入账号" v-model="username" @keyup.enter="login" />
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login" />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">
              立即注册
              <span>|</span>忘记密码？
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="http://www.baidu.com" target="_blank">简体</a>
        <span>|</span>
        <a href="http://www.baidu.com" target="_blank">繁体</a>
        <span>|</span>
        <a href="http://www.baidu.com" target="_blank">English</a>
        <span>|</span>
        <a href="http://www.baidu.com" target="_blank">常见问题</a>
        <span>|</span>
        <a href="http://www.baidu.com" target="_blank">隐私政策</a>
      </div>
      <p class="copyright">Copyright ©2019 mi.futurefe.com All Rights Reserved.</p>
    </div>
  </div>
</template>

<script>
import showMessage from "./../util/message";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    //登录
    login() {
      if (!this.username || !this.password) {
        showMessage("warning", "请输入账号或者密码");
        return;
      }
      let { username, password } = this;
      this.axios
        .post("/user/login", {
          username,
          password,
        })
        .then((res) => {
          this.$cookie.set("userId", res.id, { expires: "Session" });
          this.$store.dispatch("saveUserName", res.username);
          this.$router.push("/index");
          this.username = "";
          this.password = "";
        })
        .catch((err) => {
          throw err;
        });
    },
    register() {
      this.axios
        .post("/user/register", {
          username: "ls3",
          password: "ls3",
          email: "ls3@163.com",
        })
        .then(() => {
          this.$message.success("注册成功");
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/config";
@import "../assets/scss/base";
@import "../assets/scss/button";

.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url("/imgs/login-bg.jpg") no-repeat center;
    .container {
      height: 576px;
      position: relative;
      .login-form {
        padding-left: 31px;
        padding-right: 31px;
        width: 348px;
        height: 510px;
        background-color: #ffffff;
        position: absolute;
        right: 0;
        bottom: 29px;
        text-align: center;
        h3 {
          font-size: 24px;
          line-height: 23px;
          margin: 40px auto 49px;
          .checked {
            color: $colorA;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
      }
      .input {
        display: inline-block;
        width: 100%;
        height: 50px;
        border: 1px solid #e5e5e5;
        margin-bottom: 20px;
        input {
          border: none;
          width: 100%;
          padding: 18px;
          box-sizing: border-box;
          height: 100%;
        }
      }
      .btn {
        width: 100%;
        line-height: 50px;
        font-size: 16px;
        margin-top: 10px;
      }
      .tips {
        margin-top: 14px;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        cursor: pointer;
        .sms {
          color: #ff6600;
        }
        .reg {
          color: #999999;
          margin-top: 15px;
          span {
            margin: 0 7px;
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: $colorD;
    font-size: $fontI;
    text-align: center;
    .footer-link {
      a {
        color: $colorD;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
</style>