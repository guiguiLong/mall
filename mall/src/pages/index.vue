<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item,index) in menuList" :key="index">
                  <li v-for="(item_,listIndex) in item" :key="listIndex">
                    <a :href="item_?'/product/'+item_.id:'javascript:;'">
                      <img v-lazy="item_?item_.img:'/imgs/item-box-1.png'" alt />
                      {{item_?item_.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <a :href="'/product/'+item.id">
              <img :src="item.img" alt />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="'/product/'+item.id" v-for="(item,index) in adsList" :key="index">
          <img v-lazy="item.img" alt />
        </a>
      </div>
      <div class="banner">
        <a href="javascript:;">
          <img v-lazy="'/imgs/banner-1.png'" alt />
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <div class="box-head">
          <h2>手机</h2>
          <div class="more">
            <a href="/productList">
              <div>查看更多</div>
              <i class="el-icon-arrow-right more-icon"></i>
            </a>
          </div>
        </div>
        <div class="wrapper">
          <div class="banner-left">
            <a href="javascript:;">
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr,i) in phoneList" :key="i">
              <div class="item" v-for="(item,j) in arr" :key="j">
                <a href="javascript:;">
                  <span :class="{'new-pro':j%2===0}">新品</span>
                  <div class="item-img">
                    <img v-lazy="item.mainImage" alt />
                  </div>
                  <div class="item-info">
                    <h3>{{item.name}}</h3>
                    <p>{{item.subtitle}}</p>
                    <p class="price">{{item.price | currency}}</p>
                    <img src="/imgs/icon-cart-hover.png" @click="addCart(item.id)" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ServiceBar></ServiceBar>
    <Modal
      modalType="middle"
      title="标题"
      btnType="3"
      sureText="确定"
      cancelText="去购物车"
      :showModal="showModal"
      @submit="showModal=false"
      @cancel="goCart"
    >
      <template v-slot:body>商品添加成功</template>
    </Modal>
  </div>
</template>

<script>
import ServiceBar from "../components/ServiceBar";
import Modal from "../components/Modal";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "Index",
  components: {
    ServiceBar,
    Swiper,
    SwiperSlide,
    Modal,
  },
  data() {
    return {
      showModal: false,
      swiperOptions: {
        autoplay: {
          disableOnInteraction: false,
        },
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletActiveClass: "my-bullet-active",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      slideList: [
        {
          id: "42",
          img: "/imgs/slider/slide-1.jpg",
        },
        {
          id: "45",
          img: "/imgs/slider/slide-2.jpg",
        },
        {
          id: "46",
          img: "/imgs/slider/slide-3.jpg",
        },
        {
          id: "",
          img: "/imgs/slider/slide-4.jpg",
        },
        {
          id: "",
          img: "/imgs/slider/slide-5.jpg",
        },
      ],
      menuList: [
        [
          {
            id: 30,
            img: "/imgs/item-box-2.png",
            name: "小米CC9",
          },
          {
            id: 31,
            img: "/imgs/item-box-2.png",
            name: "小米8 青春版",
          },
          {
            id: 32,
            img: "/imgs/item-box-3.jpg",
            name: "Redmi K20 Pro",
          },
          {
            id: 33,
            img: "/imgs/item-box-4.jpg",
            name: "移动4G+专区",
          },
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      adsList: [
        {
          id: 33,
          img: "/imgs/ads/ads-1.png",
        },
        {
          id: 48,
          img: "/imgs/ads/ads-2.jpg",
        },
        {
          id: 45,
          img: "/imgs/ads/ads-3.png",
        },
        {
          id: 47,
          img: "/imgs/ads/ads-4.jpg",
        },
      ],
      phoneList: [],
    };
  },
  methods: {
    addCart(id) {
      this.axios
        .post("/carts", {
          productId: id,
          selected: true,
        })
        .then((res) => {
          this.showModal = true;
          this.$store.dispatch("saveCartCount", res.cartTotalQuantity);
          this.$store.dispatch("saveProductInfo", res);
        })
        .catch((err) => {
          throw err;
        });
    },
    goCart() {
      this.$router.push("/cart");
    },
    init() {
      this.axios
        .get("/products", {
          params: {
            categoryId: 100012,
            pageSize: 14,
          },
        })
        .then((res) => {
          res.list = res.list.slice(6, 14);
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)];
        })
        .catch((err) => {
          throw err;
        });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";

.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 10;
      background-color: #55585a7a;
      padding: 26px 0;
      box-sizing: border-box;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          a {
            font-size: 16px;
            padding-left: 30px;
            color: #fff;
            position: relative;
            display: block;
            &::after {
              content: " ";
              position: absolute;
              right: 30px;
              top: 17.5px;
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
            }
          }
          &:hover {
            background: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            width: 962px;
            height: 451px;
            position: absolute;
            left: 264px;
            top: 0;
            // border: 1px solid $colorH;
            box-shadow: 0px 7px 6px 0px $colorH;
            background-color: $colorG;
            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                flex: 1;
                line-height: 75px;
                padding-left: 23px;
                a {
                  color: $colorB;
                  font-size: 14px;
                  img {
                    width: 42px;
                    height: 35px;
                    vertical-align: middle;
                    margin-right: 15px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
        height: 100%;
      }
      .my-bullet-active {
        background: #ff6600;
        opacity: 1;
      }
    }
  }
  .ads-box {
    @include flex();
    margin: 14px 0 31px;
    a {
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-bottom: 50px;
  }
  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px;
    .box-head {
      position: relative;
      height: 58px;
      line-height: 58px;
      .more {
        a {
          color: $colorB;
          display: inline-block;
          display: flex;
          align-items: center;
          position: absolute;
          right: 0;
          top: 0;
          cursor: pointer;
          font-size: $fontJ;
          transition: all 0.4s;
          &:hover {
            color: $colorA;
            .more-icon {
              background: $colorA;
            }
          }
        }
        .more-icon {
          width: 12px;
          height: 12px;
          padding: 4px;
          margin-left: 8px;
          border-radius: 16px;
          font-size: 12px;
          line-height: 12px;
          background: #b0b0b0;
          color: #fff;
          vertical-align: 1px;
          transition: all 0.4s;
        }
      }
      h2 {
        font-size: $fontF;
        color: $colorB;
      }
    }
    .wrapper {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          @include flex();
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            position: relative;
            width: 236px;
            height: 302px;
            background-color: $colorG;
            text-align: center;
            margin-right: 14.5px;
            transition: all 0.2s linear;
            &:hover {
              box-shadow: 3px 7px 10px 5px $colorH;
              transition: all 0.2s linear;
              margin-top: -5px;
            }
            a {
              display: inline-block;
              height: 100%;
              span {
                width: 67px;
                height: 24px;
                font-size: 14px;
                line-height: 24px;
                color: $colorG;
                padding: 1px 5px;
                text-align: center;
                &.new-pro {
                  background-color: #7ecf68;
                }
                &.kill-pro {
                  background-color: #e82626;
                }
              }
              .item-img {
                img {
                  width: 100%;
                  height: 195px;
                }
              }
              .item-info {
                h3 {
                  font-size: $fontJ;
                  color: $colorB;
                  line-height: $fontJ;
                  font-weight: bold;
                }
                p {
                  color: $colorD;
                  line-height: 13px;
                  margin: 6px auto 13px;
                }
                .price {
                  color: #f20a0a;
                  font-size: $fontJ;
                  font-weight: bold;
                  cursor: pointer;
                  // &::after {
                  //   @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                  //   content: " ";
                  //   vertical-align: middle;
                  //   margin-left: 5px;
                  // }
                }
                img {
                  bottom: 21px;
                  width: 24px;
                  height: 18px;
                  position: absolute;
                  right: 40px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>