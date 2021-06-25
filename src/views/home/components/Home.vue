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
            <span>{{baseInfoIsCompeleted?'已完成':''}}</span>
            <van-icon name="arrow" @click="toBaseInfo"/>
          </div>
        </div>
      </van-swipe-cell>
    </div>

      <scroll ref="wrapper"
              :listenScroll="true"
              :pullup="false"
              @scrollToEnd="scrollToEnd"
              @setScroll="setScroll"
              @beforeScroll = "beforeScroll"
              @scroll="scroll"
              :data="$store.state.peopleList"
      >
        <div>
          <p>人员问卷</p>
          <div class="item-box">
            <van-swipe-cell v-for="(item, index) in $store.state.peopleList " :key="index">
              <div class="cell-base">
                <div class="base-left">
                  {{item.text}}
                  <span style="opacity: 0">*</span>
                </div>
                <div class="base-right">
                  <span></span>
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
      </scroll>

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
import Scroll from 'components/scroll/Index';
import '@vant/touch-emulator';
import { ADDPEOPLELIST, DELETEPEOPLELIST } from 'store/mutations-types.js';

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
    Footer,
    Scroll
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
  computed: {
    baseInfoIsCompeleted () {
      return this.$store.state.baseInfo.length > 0;
    }
  },
  methods: {
    toBaseInfo () {
      this.$router.push({ path: '/add-info', query: { type: 1 } });
    },
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
      this.$store.commit(DELETEPEOPLELIST, index);
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
        this.$store.commit(ADDPEOPLELIST, value);
      }, 500);
    },
    scrollToEnd (scroll) {
      this.scroll = scroll;
      console.log('下拉到最底下');
    },
    setScroll (scroll) {
      this.scroll = scroll;
      console.log('scroll创建成功');
    },
    scroll (pos) {
      console.log(pos);// 监听滚动坐标
    },
    beforeScroll () {
      console.log('滚动之前');
    }
  }

};
</script>
<style lang="scss" scoped>
  @import "styles/mixin.scss";
  .home-box {
   .container{
     @include container
   }
  }
</style>
