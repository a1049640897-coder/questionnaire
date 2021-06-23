<template>
  <div class="home-box">
    <div class="container">
      <div class="base-info">
      <p>业主问卷</p>
      <van-swipe-cell :disabled="true">
        <div class="cell-base">
          <div class="base-left">
            基础资料
            <span>*</span>
          </div>
          <div class="base-right">
            <span>已完成</span>
            <van-icon name="arrow"/>
          </div>
        </div>
      </van-swipe-cell>
    </div>
      <div class="elder-info">
        <p>人员问卷</p>
        <div class="item-box">
          <van-swipe-cell v-for="(item, index) in peopleList" :key="item.id">
            <div class="cell-base">
              <div class="base-left">
                {{item.text}}
                <span style="opacity: 0">*</span>
              </div>
              <div class="base-right">
                <span>已完成</span>
                <van-icon @click="toAddDetail" name="arrow"/>
              </div>
            </div>
            <template #right>
              <van-button square type="danger" @click="deletePeople(index)" text="删除" />
            </template>
          </van-swipe-cell>
        </div>
        <div class="icon-add">
          <van-button icon="plus" color="#fff" @click="addPeople" type="primary">添加</van-button>
        </div>
      </div>
    </div>
    <common-pop :is-show="isShow" :is-allow-close="true" @closePopup="closePopup">
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="业主关系"
        placeholder="点击选择关系"
        @click="showPicker = true"
      />
    </common-pop>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <Footer></Footer>
  </div>
</template>

<script>
import { SwipeCell, Cell, Icon, Field, Form, Button, Picker, Popup } from 'vant';

import Footer from 'components/footer/Index';
import CommonPop from 'components/popup/Index';
import BScroll from 'better-scroll'

export default {
  name: 'Home',
  components: {
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Form.name]: Form,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Popup.name]: Popup,

    CommonPop,
    Footer
  },
  computed: {

  },
  data () {
    return {
      value: '',
      columns: [{ text: '父亲', id: 1 }, { text: '母亲', id: 2 }],
      showPicker: false,
      peopleList: [],
      addShow: true,
      isShow: false
    };
  },
  methods: {
    addPeople () {
      this.isShow = true;
      this.value = '';
    },
    // 子组件关闭
    closePopup () {
      this.isShow = false;
      this.value = '';
    },

    deletePeople (index) {
      this.peopleList.splice(index, 1);
    },
    toAddDetail () {
      this.$router.push({ path: '/people', query: 1 });
    },
    onConfirm (value) {
      console.log(value);
      const { text } = value;
      this.value = text;
      this.showPicker = false;
      setTimeout(() => {
        this.isShow = false;
        this.peopleList.push(value);
      }, 500);
    }
  }

};
</script>

<style lang="scss" scoped>
  .home-box {
    .container {
      width: 100%;
      padding: 15px 15px 0px 15px;
      box-sizing: border-box;
      background-color: #F7F7F7;
      height: 100vh;
      .base-info {
        height: 100px;
        p {
          font-size: 16px;
          font-weight: 400;
        }
        .van-swipe-cell {
          margin-top: 10px;
          border-radius: 5px;
        }
        .cell-base {
          font-size: 16px;
          line-height: 41px;
          background-color: white;
          padding: 0 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .base-left {
            span:first-of-type {
              vertical-align: sub;
              color: red;
            }
          }
        }
        .base-right {
          color: #999;
          display: flex;
          align-items: center;
          span {
            margin-right: 10px;
            display: inline-block;
          }
        }
      }
      .elder-info {
        background: blue;
        margin-top: 10px;
        @extend .base-info;
        height: calc( 100vh - 235px);
        overflow: hidden;
      }
      .icon-add {
        margin-top: 15px;
        .van-button--normal {
          color: #999999 !important;
        }
      }
    }
  }
</style>
