<template>
  <div class="order-pay">
    <OrderHeader title="订单支付">
      <template v-slot:tip>
        <span>请仔细核对金额,谨防诈骗</span>
      </template>
    </OrderHeader>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功!去付款咯~</h2>
              <p>
                请在
                <span>30分</span>内完成支付,超时后将取消订单
              </p>
              <p>{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>
                应付总额:
                <span>{{payment}}</span>元
              </p>
              <p>
                订单详情
                <em
                  class="icon-down"
                  :class="{'icon-up':showDetail}"
                  @click="showDetail=!showDetail"
                ></em>
              </p>
            </div>
          </div>
          <div class="item-detail" :class="{'showDetail':showDetail}" v-show="!showDetail">
            <div class="item">
              <div class="detail-title">订单号:</div>
              <div class="detail-info">{{orderId}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息:</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item">
              <div class="detail-title">商品信息:</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage" alt />
                    {{item.productName}}
                    <span>x{{item.quantity}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" @click="paySubmit(1)"></div>
            <div class="pay pay-wechat" @click="paySubmit(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <Scan v-if="showPay" :imgUrl="payImg" @closepaymodal="closepaymodal"></Scan>
    <Modal
      :showModal="showModal"
      title="支付确认"
      btnType="3"
      sureText="查看订单"
      cancelText="未支付"
      @submit="goOrderList"
      @cancel="showModal=false"
    >
      <template v-slot:body>
        <p>您是否已经完成了支付?</p>
      </template>
    </Modal>
  </div>
</template>

<script>
import QRCode from "qrcode";
import OrderHeader from "../components/OrderHeader";
import Scan from "./../components/ScanPayCode";
import Modal from "./../components/Modal";
export default {
  name: "OrderPay",
  components: {
    Scan,
    Modal,
    OrderHeader,
  },
  data() {
    return {
      orderId: this.$route.query.orderNo,
      addressInfo: "", //收货人地址
      orderDetail: [], //订单详情，包含商品列表
      showDetail: false, //是否显示订单详情
      payType: "", //支付类型
      showPay: false, //是否显示微信支付弹框
      payImg: "", //微信支付的二维码地址
      showModal: false, //是否显示二次支付确认弹框
      payment: 0, //订单总金额
      T: "", //定时器ID
    };
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    //获取订单明细
    getOrderDetail() {
      this.axios.get(`/orders/${this.orderId}`).then((res) => {
        let shippingVo = res.shippingVo;
        this.addressInfo = `${shippingVo.receiverName} ${shippingVo.receiverMobile} ${shippingVo.receiverProvince} ${shippingVo.receiverCity} ${shippingVo.receiverDistrict} ${shippingVo.receiverAddress} `;
        this.orderDetail = res.orderItemVoList;
        this.payment = res.payment;
      });
    },
    //提交付款方式
    paySubmit(payType) {
      if (payType === 1) {
        this.payType = 1;
        this.$router.push({
          name: "alipay",
          params: {
            orderId: this.orderId,
          },
        });
      } else {
        this.axios
          .post("pay", {
            orderId: this.orderId,
            orderName: "微信支付测试",
            amount: 0.01,
            payType: 2,
          })
          .then((res) => {
            QRCode.toDataURL(res.content)
              .then((url) => {
                this.showPay = true;
                this.payImg = url;
                this.loopOrderState();
              })
              .catch((err) => {
                this.$message.error("微信二维码生成失败，请稍后重试");
              });
          });
      }
    },
    //关闭微信扫描框
    closepaymodal() {
      this.showPay = false;
      this.showModal = true;
      clearInterval(this.T);
    },
    //轮询当前状态
    loopOrderState() {
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderId}`).then((res) => {
          if (res.status === 20) {
            clearInterval(this.T);
            this.goOrderList();
          }
        });
      }, 1000);
    },
    goOrderList() {
      this.$router.replace("list");
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/mixin";

.order-pay {
  .wrapper {
    background: #f5f5f5;
    padding: 30px 0 61px;
    .container {
      .order-wrap {
        padding: 62px 50px;
        background: #fff;
        font-size: 14px;
        margin-bottom: 30px;
        .item-order {
          display: flex;
          align-items: center;
          .icon-succ {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background: url("/imgs/icon-gou.png") #80c58a no-repeat center;
            background-size: 60px;
            margin-right: 40px;
          }
          .order-info {
            margin-right: 248px;
            h2 {
              font-size: 24px;
              color: #333;
              margin-bottom: 20px;
            }
            p {
              color: #666;
              span {
                color: #ff6700;
              }
            }
          }
          .order-total {
            & > p:first-child {
              margin-bottom: 30px;
            }
            span {
              font-size: 28px;
              color: #ff6700;
            }
            .icon-down {
              @include bgImg(14px, 10px, "/imgs/icon-down.png");
              margin-left: 9px;
              cursor: pointer;
              transition: all 0.5s;
            }
            .icon-up {
              transform: rotate(180deg);
            }
          }
        }
        .item-detail {
          border-top: 1px solid #d7d7d7;
          padding: 47px 0 0 130px;
          font-size: 14px;
          margin-top: 45px;
          @keyframes showDetail {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          &.showDetail {
            animation: showDetail 0.6s linear;
          }
          .item {
            margin-bottom: 19px;
            display: flex;
            align-items: center;
            .detail-title {
              width: 100px;
            }
            .detail-info {
              img {
                width: 30px;
                vertical-align: middle;
              }
              span {
                color: #26262594;
                margin-left: 10px;
              }
            }
          }
        }
      }
      .item-pay {
        padding: 26px 50px 72px;
        background: #fff;
        color: #333;
        h3 {
          font-size: 20px;
          font-weight: 200;
          color: #333;
          padding-bottom: 24px;
          border-bottom: 1px solid #d7d7d7;
          margin-bottom: 26px;
        }
        .pay-way {
          font-size: 18px;
          .pay {
            display: inline-block;
            width: 188px;
            height: 64px;
            border: 1px solid #d7d7d7;
            cursor: pointer;
            &:last-child {
              margin-left: 20px;
            }
            &:hover {
              border: 1px solid #ff6700;
            }
          }
          .pay-ali {
            background: url("/imgs/pay/icon-ali.png") no-repeat center;
            background-size: 103px;
            margin-top: 19px;
          }
          .pay-wechat {
            background: url("/imgs/pay/icon-wechat.png") no-repeat center;
            background-size: 103px;
          }
        }
      }
    }
  }
}
</style>