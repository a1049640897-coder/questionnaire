<template>
  <div class="home-box">
    <div class="container">
      <scroll ref="wrapper"
              :listenScroll="true"
              :pullup="false"
              @scrollToEnd="scrollToEnd"
              @setScroll="setScroll"
              @beforeScroll = "beforeScroll"
              @scroll="scroll"
              :data="titleList"
      >
        <div>
          <p>人员问卷</p>
          <div class="item-box">
            <van-swipe-cell v-for="(item, index) in titleList" :key="item">
              <div class="cell-base">
                <div class="base-left">
                  {{item}}
                  <span  style="opacity: 0">*</span>
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
        </div>
      </scroll>

    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { SwipeCell, Cell, Icon, Field, Form, Button, Picker, Popup } from 'vant';

import Footer from 'components/footer/Index';
import Scroll from 'components/scroll/Index';
import '@vant/touch-emulator';

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

    Footer,
    Scroll
  },
  data () {
    return {
      value: '',
      columns: [{ text: '父亲', id: 1 }, { text: '母亲', id: 2 }],
      showPicker: false,
      titleList: ['评估资料', '专业医护指导', '照护需求指导', '用药协助'],
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
      @include container;
    }
  }
</style>
