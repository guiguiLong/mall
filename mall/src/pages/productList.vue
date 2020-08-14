<template>
  <div class="product-list">
    <NavHeader></NavHeader>
    <div class="wrapper">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(item,index) in slideList" :key="index">
          <a :href="'/product/'+item.id">
            <img v-lazy="item.img" alt class="fill" />
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <div class="container">
        <div class="channel-title">
          <h2>新品推荐</h2>
        </div>
        <div class="channel-pro">
          <div class="pro-list" v-for="(item,index) in productList" :key="index">
            <img :src="item.mainImage" alt />
            <div>
              <div class="pro-menu">
                <div class="pro-title">{{item.name}}</div>
                <div class="pro-desc">{{item.subtitle}}</div>
              </div>
              <div class="pro-price">
                <strong>{{item.price}}</strong>元
                <del>169元</del>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="side-menu">
        <a href="/index" class="index-menu">
          <i class="el-icon-house"></i>
          <div>主页</div>
        </a>
        <a href="/cart" class="cart-menu">
          <i class="el-icon-shopping-cart-2"></i>
          <div>购物车</div>
        </a>
      </div>
      <el-backtop>
        <div class="scroll-top">
          <i class="el-icon-upload2"></i>
          <div>回顶部</div>
        </div>
      </el-backtop>
    </div>
    <ServiceBar></ServiceBar>
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import ServiceBar from "./../components/ServiceBar";
import NavHeader from "./../components/NavHeader";
import NavFooter from "./../components/NavFooter";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import { Backtop } from "element-ui";
import "swiper/css/swiper.css";
export default {
  name: "ProductList",
  components: {
    ServiceBar,
    NavHeader,
    NavFooter,
    Swiper,
    SwiperSlide,
    [Backtop.name]: Backtop,
  },
  data() {
    return {
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
          img:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/aba2d8f2a2d11f06eb35a79f1bfe60b9.jpg?w=5120&h=1240&bg=D5D6D9",
        },
        {
          id: "45",
          img:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d0c29c67a79668528f4e28f21a212e3d.jpg?w=5120&h=1240&bg=D1E3FB",
        },
        {
          id: "46",
          img:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6ab79cd25a2057949266b61ec9792a8b.jpeg?w=5120&h=1240&bg=D0E10",
        },
      ],
      productList: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.axios
        .get("/products", {
          params: {
            categoryId: 100012,
          },
        })
        .then((res) => {
          this.productList = res.list;
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/config";
@import "./../assets/scss/button";

.product-list {
  .wrapper {
    background: #f5f5f5;
    .side-menu {
      z-index: 11;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: fixed;
      right: 26px;
      bottom: 111px;
      background: #fff;
      a {
        display: inline-block;
        width: 57px;
        height: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #999;
        font-size: 40px;
        font-size: 40px;
        padding: 5px;
        border-top: 1px solid #e5e5e5;
        div {
          font-size: 13px;
        }
        &:hover {
          color: #ff6700;
        }
      }
    }
    .scroll-top {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      padding: 10px;
      font-size: 40px;
      color: #999;
      div {
        margin-top: 5px;
        font-size: 13px;
        width: 40px;
      }
      &:hover {
        color: #ff6700;
      }
    }
    .swiper-container {
      img {
        height: 620px;
        object-fit: cover;
      }
    }
    .swiper-pagination-clickable .swiper-pagination-bullet {
      cursor: pointer;
      border: 2px solid #b6b7b9;
    }
    .my-bullet-active {
      background: #fff;
    }
    .swiper-button-prev {
      left: 50%;
      margin-left: -613px;
    }
    .swiper-button-next {
      right: 50%;
      margin-right: -613px;
    }
    .swiper-button-prev,
    .swiper-button-next {
      color: #9e9e9f;
      &:hover {
        background: #55585a7a;
        color: #fff;
      }
    }
    .container {
      .channel-title {
        line-height: 64px;
        margin: 0;
        padding-top: 4px;
        color: #333;
        font-size: 24px;
        font-weight: 400;
      }
      .channel-pro {
        display: flex;
        width: 1226px;
        margin: 0 auto;
        padding-bottom: 50px;
        flex-wrap: wrap;
        .pro-list {
          position: relative;
          cursor: pointer;
          flex: 2;
          margin-bottom: 14px;
          transition: all 0.5s;
          &:nth-child(even) {
            margin-left: 14px;
          }
          &:hover {
            box-shadow: 3px 7px 10px 5px #e5e5e5;
            margin-top: -1px;
            transition: all 0.5s;
          }
          img {
            height: 358px;
            width: 100%;
            vertical-align: middle;
          }
          .pro-menu {
            background: #fff;
            padding: 38px 0 40px 48px;
            box-sizing: border-box;
            width: 606px;
            .pro-title {
              font-weight: 400;
              line-height: 26px;
              font-size: 23px;
              width: 54%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .pro-desc {
              line-height: 18px;
              margin-top: 3px;
              color: #333;
              color: rgba(51, 51, 51, 0.7);
              font-size: 14px;
            }
          }
          .pro-price {
            line-height: 30px;
            color: #ff6700;
            font-size: 12px;
            font-weight: 700;
            position: absolute;
            right: 48px;
            bottom: 30px;
            margin: 0;
            strong {
              font-weight: 400;
              font-size: 30px;
            }
            del {
              color: rgba(51, 51, 51, 0.6);
            }
          }
        }
      }
    }
  }
}
</style>