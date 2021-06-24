<template>
  <div class="home-box">
    <div class="container" >
      <scroll ref="wrapper"
              :listenScroll="true"
              :pullup="false"
              :data="quesnaireList"
      >
        <div>
          <p>问卷内容</p>
          <div class="item-box">
            <van-swipe-cell v-for="(item, index) in quesnaireList" :key="index" :disabled="true" >
              <div class="cell-base">
                <div class="base-left">
                  {{item.title}}
                  <span  style="opacity: 0">*</span>
                </div>
                <div class="base-right">
                  <span v-if="item.isCompeleted">
                     已完成
                  </span>
                  <span v-else>
                  </span>
                  <van-icon @click="toAddDetail(item.type)" name="arrow"/>
                </div>
              </div>
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
import { getCustomerReport } from 'apis/people/index.js';
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
      addShow: true,
      isShow: false,
      copIsShow: false,
      quesnaireList: []
    };
  },
  methods: {

    async getQuesnaire () {
      try {
        const { data } = await getCustomerReport();
        console.info('问卷', data);
        for (let name in data) {
          if (name === 'medicineInfo') {
            const newObj = {
              title: '康复/用药协助',
              isCompeleted: false,
              list: [],
              type: 2
            };
            data[name].forEach((v, i) => {
              newObj.list.push(v);
            });
            this.quesnaireList.push(newObj);
          } else if (name === 'careInfo') {
            const newObj = {
              title: '照护需求指导',
              isCompeleted: false,
              list: [],
              type: 3
            };
            data[name].forEach((v, i) => {
              newObj.list.push(v);
            });
            this.quesnaireList.push(newObj);
          } else if (name === 'evaluationInfo') {
            const newObj = {
              title: '评估资料',
              isCompeleted: false,
              list: [],
              type: 4
            };
            data[name].forEach((v, i) => {
              newObj.list.push(v);
            });
            this.quesnaireList.push(newObj);
          } else if (name === 'healthInfo') {
            const newObj = {
              title: '专业医护指导',
              isCompeleted: false,
              list: [],
              type: 5
            };
            data[name].forEach((v, i) => {
              newObj.list.push(v);
            });
            this.quesnaireList.push(newObj);
          }
        }
        console.log('queList', this.quesnaireList);
      } catch (e) {
        console.error(e);
      }
    },
    deletePeople (index) {
      this.peopleList.splice(index, 1);
    },
    toAddDetail (type) {
      this.$router.push({ path: '/add-info',
        query: {
          type: type
        } });
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
    },
    setScroll (scroll) {
      this.scroll = scroll;
    },
    scroll (pos) {
      console.log(pos);// 监听滚动坐标
    },
    beforeScroll () {
    }
  },
  created () {
    // 获取问卷调查表
    this.getQuesnaire();
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
