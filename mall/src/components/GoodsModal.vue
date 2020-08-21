<template>
  <transition name="slide">
    <div class="modal" v-if="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <img src="/imgs/icon-close.png" @click="$emit('submit')" />
        </div>
        <div class="modal-body">
          <div class="form-desc">
            <span class="sales">蓝色</span>近一周销量
            <span class="inventory">红色</span>库存
            <strong>品名:</strong>
            {{goodsData.goodsName}}
            <strong>杯型:</strong>
            {{goodsData.cupType}}
            <strong>罩杯厚度:</strong>
            {{goodsData.cupthickness}}
            <strong>小分类:</strong>
            {{goodsData.smallClassification}}
            <strong>单位:</strong>
            {{(goodsData.unitname)}}
          </div>
          <div class="form-title">
            <div>
              款号:
              <span>{{goodsData.partNum}}</span>
            </div>
            <div v-for="(item,index) in goodsData.sizeArr" :key="index">{{item}}</div>
          </div>
          <div
            class="form-select"
            v-for="goodsObj in goodsData.goodsSelect"
            :key="goodsObj.goodsNuber"
          >
            <div class="select-color">{{goodsObj.color}}</div>
            <div v-for="(item,index) in goodsData.sizeArr.length" :key="index">
              <input type="text" maxlength=""/>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="btn-group" v-if="btnType==='3'">
            <!-- <div class="modal-no">
              款号:
              <input type="text" />
              <a href="javascript:;" class="btn search">搜索</a>
            </div>-->
            <div class="modal-num">
              每包
              <span>{{goodsData.numofpackage}}</span>件x
              <input type="text" />份
            </div>
            <a href="javascript:;" class="btn">齐色齐码</a>
            <a href="javascript:;" class="btn group">确定</a>
            <a href="javascript:;" class="btn btn-default">关闭</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "GoodsModal",
  props: {
    //弹框类型: 小small、 中middle、 大large、 表单form
    modalType: {
      type: String,
      default: "form",
    },
    //弹框标题
    title: String,
    //按钮类型 1:确定按钮 2:取消按钮 3:确定取消按钮
    btnType: String,
    sureText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    showModal: Boolean,
    goodsData: Object,
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/modal.scss";
@import "./../assets/scss/button.scss";
.modal {
  .modal-dialog {
    .modal-body {
      box-sizing: border-box;
      border: 1px solid #e5e5e5;
      padding: 0px;
      margin: 11px;
      .form-title,
      .form-select {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        div {
          position: relative;
          height: 40px;
          line-height: 40px;
          flex: 1;
          text-align: center;
          span {
            margin-left: 1px;
            color: #ff6600;
          }
          &::after {
            content: "";
            width: 0.5px;
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            background: #e5e5e5;
          }
          &:last-child::after {
            display: none;
          }
        }
      }
      .form-desc {
        letter-spacing: 1px;
        background: #f5f5f5;
        padding: 10px 5px;
        font-size: 14px;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
        .sales {
          color: blue;
        }
        .inventory {
          color: red;
        }
        strong {
          margin-right: 2px;
        }
      }
      .form-select {
        &:last-child {
          border-bottom: 0;
        }
        input {
          border: 0;
          width: 100%;
          height: 99%;
          text-align: center;
        }
      }
    }
    .modal-footer {
      .btn-group {
        margin: 0 10px;
        display: flex;
        align-items: center;
        font-size: 14px;
        .modal-num,
        .modal-no {
          input {
            border: 1px solid #e5e5e5;
            height: 30px;
            text-align: center;
            margin: 0 2px;
            font-weight: bold;
          }
        }
        .modal-no {
          input {
            width: 100px;
          }
          .search {
            background: #63b0ff;
          }
        }
        .modal-num {
          margin: 0 15px;
          span {
            color: red;
            margin: 0 1px 0 -1px;
          }
          input {
            width: 50px;
          }
        }
        .group {
          margin-left: 155px;
        }
      }
    }
  }
}
</style>