<template>
  <div class="order-list">
    <OrderHeader title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电脑,了解更多</span>
      </template>
    </OrderHeader>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <Loading v-if="loading"></Loading>
          <NoData imgUrl="/imgs/icon-no-data.png" v-if="!loading&&this.list.length===0">
            <template v-slot:footer>
              <p>当前暂无提交的订单记录.</p>
            </template>
          </NoData>
          <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号:{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money">
                <span>应付金额:</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">
                      {{item.totalPrice}}元
                      <span>x</span>
                      {{item.quantity}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status===20">
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <el-pagination
            class="pagination"
            background
            layout="prev, pager, next ,jumper"
            :total="total"
            :hideOnSinglePage="hideOnSinglePage"
            @current-change="handleChange"
          ></el-pagination>
          <!-- <div class="loading-more">
            <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
          </div>-->
          <!-- <div
            class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="100"
            v-show="showScrollMore"
          >
            <img src="/imgs/loading-svg/loading-bubbles.svg" alt />
          </div>-->
        </div>
      </div>
    </div>
    <el-backtop v-if="this.list.length!==0">
      <div class="scroll-top">
        <img src="/imgs/scroll-top.svg" alt />
      </div>
    </el-backtop>
    <ServiceBar></ServiceBar>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader";
import ServiceBar from "./../components/ServiceBar";
import Loading from "./../components/Loading";
import NoData from "./../components/NoData";
import { Pagination } from "element-ui";
import infiniteScroll from "vue-infinite-scroll";
import { Backtop } from "element-ui";
export default {
  name: "OrderList",
  data() {
    return {
      list: [],
      loading: false,
      hideOnSinglePage: true,
      busy: false,
      showScrollMore: false,
      total: 0,
      pageNum: 1,
    };
  },
  directives: { infiniteScroll },
  components: {
    OrderHeader,
    ServiceBar,
    Loading,
    NoData,
    [Pagination.name]: Pagination,
    [Backtop.name]: Backtop,
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    //获取订单列表
    getOrderList() {
      this.busy = true;
      this.loading = true;
      this.axios
        .get("/orders", {
          params: {
            pageNum: this.pageNum,
            pageSize: 10,
          },
        })
        .then((res) => {
          res.list.forEach((item) => {
            item.createTime = item.createTime
              .replace("-", "年")
              .replace("-", "月");
          });
          this.list = this.list.concat(res.list);
          this.total = res.total;
          this.loading = false;
          this.busy = !res.hasNextPage;
          this.showScrollMore = res.hasNextPage;
        });
    },
    //去支付
    goPay(orderNo) {
      this.$router.push({
        path: "pay",
        query: {
          orderNo,
        },
      });
    },
    //分页跳转
    handleChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    },
    //点击加载更多
    loadMore() {
      this.pageNum++;
      this.getOrderList();
    },
    //滚动加载更多
    scrollMore() {
      this.busy = true;
      setTimeout(() => {
        this.pageNum++;
        this.getList();
      }, 500);
    },
    //滚动加载使用方法
    getList() {
      this.axios
        .get("/orders", {
          params: {
            pageNum: this.pageNum,
            pageSize: 10,
          },
        })
        .then((res) => {
          res.list.forEach((item) => {
            item.createTime = item.createTime
              .replace("-", "年")
              .replace("-", "月");
          });
          this.list = this.list.concat(res.list);
          this.total = res.total;
          this.$nextTick(function () {
            this.busy = !res.hasNextPage;
          });
        });
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/config";
@import "./../assets/scss/mixin";
.order-list {
  .wrapper {
    background: $colorJ;
    padding: 33px 0 110px;
    .container {
      .order-box {
        .order {
          background: $colorG;
          border: 1px solid $colorF;
          margin-bottom: 31px;
          &:last-child {
            margin-bottom: 0;
          }
          .order-title {
            height: 74px;
            line-height: 74px;
            display: flex;
            justify-content: space-between;
            padding: 0 43px;
            font-size: 16px;
            color: $colorC;
            background: $colorK;
            .item-info {
              span {
                margin: 0 9px;
              }
            }
            .item-money {
              .money {
                font-size: 26px;
                color: $colorB;
                margin-left: 10px;
              }
            }
          }
          .order-content {
            padding: 0 43px;
            .good-box {
              width: 88%;
              .good-list {
                display: flex;
                align-items: center;
                height: 145px;
                .good-img {
                  width: 112px;
                  img {
                    width: 100%;
                  }
                }
                .good-name {
                  font-size: 16px;
                  color: $colorB;
                  span {
                    margin: 0 1px;
                  }
                }
              }
            }
            .good-state {
              height: 145px;
              line-height: 145px;
              font-size: 20px;
              a {
                color: $colorA;
              }
            }
          }
        }
        .pagination {
          text-align: right;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active {
          background: #ff6600;
        }
        .loading-more {
          text-align: center;
          .el-button--primary {
            background-color: #ff6600;
            border-color: #ff6600;
          }
        }
        .scroll-more {
          text-align: center;
        }
      }
    }
  }
  .scroll-top {
    img {
      width: 45px;
    }
  }
}
</style>