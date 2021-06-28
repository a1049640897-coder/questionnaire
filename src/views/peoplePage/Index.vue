<template>
  <div class="home-box">
    <div class="container">
      <scroll ref="wrapper"
              :listenScroll="true"
              :pullup="false"
              :data="quesnaireList"
      >
        <div>
          <p>问卷内容</p>
          <div class="item-box">
            <van-swipe-cell v-for="(item, index) in quesnaireList" :key="index" :disabled="true">
              <div class="cell-base">
                <div class="base-left">
                  {{item.title}}
                  <span style="" v-if="item.required">*</span>
                  <span style="opacity: 0" v-else>*</span>
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
    <Footer @submitData="submitData"></Footer>
  </div>
</template>

<script>
import { SwipeCell, Cell, Icon, Field, Form, Button, Picker, Popup, Notify } from 'vant';

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
  computed: {
    baseInfoIsCompeleted () {
      return this.$store.state.baseInfo.length > 0;
    },
    medicineShow () {
      const flag = this.$store.state.peopleList.filter(item => {
        return item.customerNo == this.$route.query.customerNo;
      });
      return flag[0].recordData.medicineInfo.length;
    },
    careShow () {
      const flag = this.$store.state.peopleList.filter(item => {
        return item.customerNo == this.$route.query.customerNo;
      });
      return flag[0].recordData.careInfo.length;
    },
    ealthShow () {
      const flag = this.$store.state.peopleList.filter(item => {
        return item.customerNo == this.$route.query.customerNo;
      });
      return flag[0].recordData.healthInfo.length;
    },
    evaluationShow () {
      const flag = this.$store.state.peopleList.filter(item => {
        return item.customerNo == this.$route.query.customerNo;
      });
      return flag[0].recordData.evaluationInfo.length;
    }

  },
  methods: {

    back () {
      if (this.evaluationShow) {
        history.back();
      } else {
        Notify({ type: 'warning', message: '请先填写完评估资料' });
      }
    },
    submitData () {
      if (this.evaluationShow) {
        history.back();
      } else {
        Notify({ type: 'warning', message: '评估资料还未填写' });
      }
    },

    async getQuesnaire () {
      this.$loading.show();
      try {
        const { data } = await getCustomerReport();
        for (let name in data) {
          if (name === 'medicineInfo') {
            const newObj = {
              title: '康复/用药协助',
              isCompeleted: this.medicineShow,
              type: 2,
              list: []
            };
            data[name].forEach((v, i) => {
              newObj.list.push(v);
            });
            this.quesnaireList.push(newObj);
          } else if (name === 'careInfo') {
            const newObj = {
              title: '照护需求指导',
              isCompeleted: this.careShow,
              type: 3,
              list: []
            };
            data[name].forEach((v, i) => {
              newObj.list.push(v);
            });
            this.quesnaireList.push(newObj);
          } else if (name === 'evaluationInfo') {
            const newObj = {
              title: '评估资料',
              isCompeleted: this.evaluationShow,
              type: 4,
              list: [],
              required: true
            };
            data[name].forEach((v, i) => {
              newObj.list.push(v);
            });
            this.quesnaireList.push(newObj);
          } else if (name === 'healthInfo') {
            const newObj = {
              title: '专业医护指导',
              isCompeleted: this.ealthShow,
              type: 5,
              list: []
            };
            data[name].forEach((v, i) => {
              newObj.list.push(v);
            });
            this.quesnaireList.push(newObj);
          }
        }
      } catch (e) {
        console.error(e);
        this.$loading.hide();
      } finally {
        this.$loading.hide();
      }
    },
    deletePeople (index) {
      this.peopleList.splice(index, 1);
    },
    toAddDetail (type) {
      this.$router.push({
        path: '/add-info',
        query: {
          type: type,
          customerNo: this.$route.query.customerNo
        }
      });
    },
    onConfirm (value) {
      const { text } = value;
      this.value = text;
      this.showPicker = false;
      setTimeout(() => {
        this.isShow = false;
        this.peopleList.push(value);
      }, 500);
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
    .container {
      @include container;
    }
  }
</style>
