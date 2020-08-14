<template>
  <div class="order-confirm">
    <OrderHeader title="确认订单">
      <template v-slot:tip>
        <span>请认真核对送货地址</span>
      </template>
    </OrderHeader>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="position: absolute; width: 0px; height: 0px; overflow: hidden;"
    >
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path
            d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z"
            class="path1"
          />
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path
            d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"
            class="path1"
          />
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path
            d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"
            class="path1"
          />
          <path
            d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path2"
          />
          <path
            d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path3"
          />
          <path
            d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path4"
          />
        </symbol>
      </defs>
    </svg>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearfix">
              <div
                class="addr-info"
                :class="{checked:index===checkedIndex}"
                @click="checkedIndex=index"
                v-for="(item,index) in list"
                :key="index"
              >
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverMobile}}</div>
                <div class="street">
                  {{item.receiverProvince+' '+item.receiverCity+' '+item.receiverDistrict}}
                  <br />
                  {{item.receiverAddress}}
                </div>
                <div class="action">
                  <a href="javascript:;" class="fl" @click="delAddress(item)">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del" />
                    </svg>
                  </a>
                  <a href="javascript:;" class="fr" @click="editAddressModal(item)">
                    <svg class="icon icon-edit">
                      <use xlink:href="#icon-edit" />
                    </svg>
                  </a>
                </div>
              </div>
              <div class="addr-add" @click="openAddressModal">
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <li v-for="(item,index) in cartList" :key="index">
                <div class="good-name">
                  <img v-lazy="item.productMainImage" alt />
                  <span>{{item.productName+' '+item.productSubtitle}}</span>
                </div>
                <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                <div class="good-total">{{item.productTotalPrice}}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice|currency}}</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0.00元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0.00元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalPrice|currency}}</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="submitCart">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" @close="closeModal">
      <div v-if="userAction===0||userAction===1" class="edit-wrap">
        <div class="item">
          <input
            type="text"
            class="input"
            placeholder="姓名"
            maxlength="20"
            v-model="checkItem.receiverName"
          />
          <input
            type="text"
            class="input"
            placeholder="手机号"
            maxlength="11"
            v-model="checkItem.receiverMobile"
          />
        </div>
        <el-cascader
          clearable
          size="large"
          placeholder="请选择省/市/区"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange"
        ></el-cascader>
        <div class="item">
          <textarea name="street" placeholder="详细地址" v-model="checkItem.receiverAddress"></textarea>
        </div>
        <div class="item">
          <input
            type="text"
            class="input"
            placeholder="邮编"
            maxlength="6"
            v-model="checkItem.receiverZip"
          />
        </div>
      </div>
      <span v-if="userAction===2">{{content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="submitAddress">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import showMessage from "./../util/message";
import OrderHeader from "../components/OrderHeader";
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  name: "OrderConfirm",
  components: {
    OrderHeader,
  },
  data() {
    return {
      list: [], //地址列表
      cartList: [], //购物车中需要结算的商品
      cartTotalPrice: 0, //商品总金额
      count: 0, //商品结算数量
      checkItem: {}, //选中的商品对象
      userAction: "", //用户行为 0:新增,1:编辑,2:删除
      dialogVisible: false, //是否显示弹框
      title: "", //弹框标题
      content: "", //弹框内容
      options: regionData, //省市区选项
      selectedOptions: [], //省市区框显示内容
      checkedIndex: 0,
    };
  },
  mounted() {
    this.getShippingsList();
    this.getCartList();
  },
  methods: {
    handleChange(value) {},
    //获取地址列表
    getShippingsList() {
      this.axios.get("/shippings").then((res) => {
        this.list = res.list;
      });
    },
    //获取购物车中选中的商品
    getCartList() {
      this.axios.get("/carts").then((res) => {
        let list = res.cartProductVoList; //获取购物车中所有商品数据
        this.cartTotalPrice = res.cartTotalPrice; //商品总金额
        this.cartList = list.filter((item) => item.productSelected);
        this.cartList.map((item) => {
          this.count += item.quantity;
        });
      });
    },
    //新增地址弹框
    openAddressModal() {
      this.checkItem = {};
      this.userAction = 0;
      this.dialogVisible = true;
      this.title = "新增提示";
    },
    //编辑地址弹框
    editAddressModal(item) {
      this.checkItem = item;
      this.selectedOptions = [
        TextToCode[item.receiverProvince].code,
        TextToCode[item.receiverProvince][item.receiverCity].code,
        TextToCode[item.receiverProvince][item.receiverCity][
          item.receiverDistrict
        ].code,
      ];
      this.userAction = 1;
      this.dialogVisible = true;
      this.title = "编辑提示";
    },
    //删除地址()
    delAddress(item) {
      this.checkItem = item;
      this.userAction = 2;
      this.dialogVisible = true;
      this.title = "删除提示";
      this.content = "确定删除此地址吗";
    },
    //编辑、删除、新增地址统一方法  0:新增,1:编辑,2:删除
    submitAddress() {
      let { userAction, checkItem, selectedOptions } = this;
      let method,
        url,
        params = {};
      if (userAction === 0) {
        method = "post";
        url = "/shippings";
      } else if (userAction === 1) {
        method = "put";
        url = `/shippings/${checkItem.id}`;
      } else if (userAction === 2) {
        method = "delete";
        url = `/shippings/${checkItem.id}`;
      }
      if (userAction === 0 || userAction === 1) {
        if (selectedOptions.length !== 0) {
          checkItem.receiverProvince = CodeToText[selectedOptions[0]] || "";
          checkItem.receiverCity = CodeToText[selectedOptions[1]] || "";
          checkItem.receiverDistrict = CodeToText[selectedOptions[2]] || "";
        }
        let {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip,
        } = checkItem;
        let errMsg = "";
        if (!receiverName) {
          errMsg = "收货人姓名不能为空";
        } else if (receiverMobile === "" || !/\d{11}/.test(receiverMobile)) {
          errMsg = "请输入正确的手机号码";
        } else if (!receiverProvince || !receiverCity || !receiverDistrict) {
          errMsg = "请选择省市区";
        } else if (!receiverAddress) {
          errMsg = "请输入详细地址";
        } else if (!/\d{6}/.test(receiverZip)) {
          errMsg = "请输入正确的邮政编码";
        }
        if (errMsg) {
          this.$message.error(errMsg);
          return;
        }
        params = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip,
        };
      }
      this.axios[method](url, params).then(() => {
        this.closeModal();
        this.getShippingsList();
        showMessage("success", "操作成功");
      });
    },
    //地址操作完后关闭弹窗
    closeModal() {
      this.dialogVisible = false;
      this.checkItem = {};
      this.userAction = "";
      this.title = "";
      this.content = "";
      this.selectedOptions = [];
    },
    //生成订单
    submitCart() {
      if (this.cartList.length === 0) {
        showMessage("warning", "未添加任何商品");
        return;
      }

      this.axios
        .post("/orders", {
          shippingId: this.list[this.checkedIndex].id,
        })
        .then((res) => {
          this.$router.replace({
            path: "pay",
            query: {
              orderNo: res.orderNo,
            },
          });
        });
    },
  },
};
</script>

<style lang="scss">
.order-confirm {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 84px;
    .order-box {
      background-color: #ffffff;
      padding-left: 40px;
      padding-bottom: 40px;
      .addr-title {
        font-size: 20px;
        color: #333333;
        font-weight: 200;
        margin-bottom: 21px;
      }
      .item-address {
        padding-top: 38px;
        .addr-list {
          .addr-info,
          .addr-add {
            box-sizing: border-box;
            float: left;
            width: 271px;
            height: 180px;
            border: 1px solid #e5e5e5;
            margin-right: 15px;
            padding: 15px 24px;
            font-size: 14px;
            color: #757575;
          }
          .addr-info {
            cursor: pointer;
            h2 {
              height: 27px;
              font-size: 18px;
              font-weight: 300;
              color: #333;
              margin-bottom: 10px;
            }
            .street {
              height: 50px;
            }
            .action {
              height: 50px;
              line-height: 50px;
              .icon {
                width: 20px;
                height: 20px;
                fill: #666666;
                vertical-align: middle;
                &:hover {
                  fill: #ff6700;
                }
              }
            }
            &.checked {
              border: 1px solid #ff6700;
            }
          }
          .addr-add {
            text-align: center;
            color: #999999;
            cursor: pointer;
            .icon-add {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: url("/imgs/icon-add.png") #e0e0e0 no-repeat center;
              background-size: 14px;
              margin: 0 auto;
              margin-top: 45px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .item-good {
        margin-top: 34px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 12px;
        h2 {
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 5px;
        }
        li {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          font-size: 16px;
          color: #333333;
          .good-name {
            flex: 5;
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
          .good-price {
            flex: 2;
            text-align: center;
          }
          .good-total {
            flex: 1;
            color: #ff6600;
            text-align: center;
          }
        }
      }
      .item-shipping,
      .item-invoice {
        margin-top: 31px;
        line-height: 20px;
        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: 20px;
          width: 80px;
        }
        span,
        a {
          font-size: 16px;
          color: #ff6700;
          margin-right: 23px;
        }
      }
      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
        text-align: right;
        font-size: 16px;
        color: #666666;
        .item-val {
          color: #ff6700;
        }
        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }
        .item-val {
          display: inline-block;
          width: 200px;
        }
        .item-total {
          .item-val {
            font-size: 28px;
          }
        }
      }
      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }
  }
  .edit-wrap {
    font-size: 14px;
    .el-cascader {
      width: 100%;
      margin-bottom: 15px;
    }
    .item {
      textarea::-webkit-input-placeholder {
        font-size: 15px;
      }
      input::-webkit-input-placeholder,
      textarea::-webkit-input-placeholder {
        color: #c0c4cc;
        font-weight: 500;
      }
      input:-moz-placeholder,
      textarea:-moz-placeholder {
        color: #c0c4cc;
        font-weight: 500;
      }
      input::-moz-placeholder,
      textarea::-moz-placeholder {
        color: #c0c4cc;
        font-weight: 500;
      }
      input:-ms-input-placeholder,
      textarea:-ms-input-placeholder {
        color: #c0c4cc;
        font-weight: 500;
      }

      margin-bottom: 15px;
      display: flex;
      .input {
        display: inline-block;
        width: 50%;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border: 1px solid #e5e5e5;
        & + .input {
          margin-left: 14px;
        }
      }
      textarea {
        height: 62px;
        width: 100%;
        padding: 13px 15px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        font: 400 13.3333px Aria;
      }
    }
  }
}
</style>