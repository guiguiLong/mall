<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="/index">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="username" @click="loginOut">退出</a>
          <a href="javascript:;" v-else @click="login">登录</a>
          <a href="/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" v-else>注册</a>
          <a href="javascript:;" class="my-cart">
            <div class="to-cart">
              <a href="/cart">
                <i class="el-icon-shopping-cart-1 cart-icon"></i>
                购物车({{cartcount}})
              </a>
            </div>
            <div class="cartList-wrapper" v-if="cartcount!==0">
              <div class="line"></div>
              <ul>
                <li
                  class="cart-list"
                  v-for="(item,index) in productinfo.cartProductVoList"
                  :key="index"
                >
                  <img v-lazy="item.productMainImage" alt />
                  <div class="pro-name" @click="toProductInfo">{{item.productName}}</div>
                  <div class="pro-price">
                    {{item.productPrice}}元
                    <span>x{{item.quantity}}</span>
                  </div>
                  <i class="el-icon-close icon-close" @click="delProduct(item.productId)"></i>
                </li>
              </ul>
              <div class="cartList-footer">
                <div class="cartList-info">
                  共{{productinfo.cartTotalQuantity}}件商品
                  <br />
                  <span>{{productinfo.cartTotalPrice}}</span>元
                </div>
                <a href="/cart" class="btn">去购物车结算</a>
              </div>
            </div>
            <div class="no-list" v-else>购物车还没有商品,赶紧选购吧!</div>
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in productList" :key="index">
                  <a :href="'/product'+item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in productList" :key="index">
                  <a :href="'/product'+item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="javascript:;" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt />
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="javascript:;" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt />
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="javascript:;" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt />
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="javascript:;" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt />
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="javascript:;" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt />
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="javascript:;" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt />
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import showMessage from "./../util/message";
import store from "./../store";

export default {
  name: "NavHeader",
  data() {
    return {
      productList: [], //产品列表
      totalPrice: 0, //购物车总价格
    };
  },
  computed: {
    ...mapState(["username", "cartcount", "productinfo"]),
  },
  methods: {
    //登录
    login() {
      this.$router.push("/login");
    },
    //退出登录
    loginOut() {
      this.axios.post("/user/logout").then(() => {
        showMessage("success", "退出成功");
        this.$cookie.set("userId", "", { expires: "-1" });
        this.$store.dispatch("saveUserName", "");
        this.$store.dispatch("saveCartCount", "0");
      });
    },
    //获取产品列表
    getProductList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: "100012",
          },
        })
        .then((res) => {
          if (res.list.length >= 6) {
            return (this.productList = res.list.slice(0, 6));
          }
          return (this.productList = res.list);
        })
        .catch((err) => {
          throw err;
        });
    },
    //商品详情页
    toProductInfo() {
      this.$router.push("/product/45");
    },
    //删除购物车商品
    delProduct(id) {
      this.axios.delete(`/carts/${id}`).then((res) => {
        this.$store.dispatch("saveProductInfo", res);
        this.$store.dispatch("saveCartCount", res.cartTotalQuantity);
      });
    },
  },
  mounted() {
    this.getProductList();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/base";
@import "../assets/scss/config";
@import "../assets/scss/mixin";
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background: #333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
        &:hover {
          color: #fff;
        }
      }
      .topbar-user {
        display: flex;
        height: 39px;
        .my-cart {
          height: 39px;
          transition: all 0.5s;
          position: relative;
          width: 110px;
          background: #ff6600;
          text-align: center;
          margin-right: 0;
          .to-cart {
            a {
              color: #fff;
              margin-right: 0;
              .cart-icon {
                font-size: 20px;
                vertical-align: middle;
              }
            }
          }
          &:hover {
            background: #fff;
            a {
              color: #ff6600;
            }
            .cartList-wrapper {
              opacity: 1;
              height: auto;
            }
            .no-list {
              opacity: 1;
              height: 111px;
            }
          }
          .cartList-wrapper {
            overflow: hidden;
            opacity: 1;
            height: 0;
            transition: all 0.5s;
            z-index: 11;
            position: absolute;
            top: 39px;
            left: -253px;
            background: #fff;
            color: #333;
            .line {
              height: 20px;
            }
            ul {
              height: auto;
              max-height: 381px;
              overflow-y: scroll;
              .cart-list {
                position: relative;
                &:first-child {
                  border-top: 0;
                }
                box-sizing: border-box;
                border-top: 1px solid #e0e0e0;
                width: 306px;
                display: flex;
                justify-content: space-between;
                padding: 20px 10px;
                margin: 0 20px;
                align-items: center;
                img {
                  width: 60px;
                  height: 60px;
                }
                .pro-name {
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  flex: 0.8;
                  &:hover {
                    color: #ff6600;
                  }
                }
                .pro-price {
                  span {
                    margin-left: 1px;
                  }
                }
                .icon-close {
                  position: absolute;
                  right: -13px;
                  top: 42px;
                  font-size: 15px;
                  font-weight: bold;
                  opacity: 0;
                  transition: all 0.5s;
                }
                &:hover {
                  .icon-close {
                    opacity: 1;
                  }
                }
              }
            }
            .cartList-footer {
              display: flex;
              justify-content: space-between;
              align-items: center;
              box-sizing: border-box;
              padding: 5px 1px 5px 15px;
              background: #fafafa;
              .cartList-info {
                text-align: left;
                height: 100%;
                line-height: 20px;
                span {
                  color: #ff6600;
                  font-size: 21px;
                  margin: 3px 0 0 -2px;
                }
              }
              .btn {
                width: 165px;
                height: 52px;
                line-height: 52px;
                color: #fff;
                font-size: 15px;
              }
            }
          }
          .no-list {
            overflow: hidden;
            transition: all 0.5s;
            opacity: 0;
            position: absolute;
            top: 39px;
            left: -210px;
            background: #fff;
            width: 321px;
            height: 0;
            box-shadow: 0px 7px 25px 3px rgba(0, 0, 0, 0.11);
            z-index: 11;
            text-align: center;
            line-height: 111px;
            font-size: 13px;
            color: #333;
          }
        }
      }
    }
  }
  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();
      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu {
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          display: inline-block;
          color: #333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          .children {
            background: #fff;
            z-index: 20;
            overflow: hidden;
            transition: all 0.5s;
            position: absolute;
            opacity: 0;
            height: 0;
            left: 0;
            top: 112px;
            width: 1226px;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            .product {
              position: relative;
              float: left;
              width: 16.6%;
              text-align: center;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              a {
                display: inline-block;
              }
              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                font-weight: bold;
                margin: 19px 0 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
                span {
                  margin-left: 1px;
                }
              }
              &::before {
                content: " ";
                right: 0;
                position: absolute;
                top: 28px;
                border-right: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }
              &:last-child::before {
                display: none;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          input {
            border: none;
            box-sizing: border-box;
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            padding-left: 14px;
          }
          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png");
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>