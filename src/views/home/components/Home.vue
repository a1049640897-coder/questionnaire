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
                  <van-icon @click="toAddDetail(item.customerNo)" name="arrow"/>
                </div>
              </div>
              <template #right>
                <van-button square type="danger" @click="deletePeople(item.customerNo)" text="删除" />
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
    <Footer @submitData="submitData" :is-only="true"></Footer>
  </div>
</template>

<script>
import { SwipeCell, Cell, Icon, Field, Form, Button, Picker, Popup, Notify } from 'vant';

import Footer from 'components/footer/Index';
import CommonPop from 'components/popup/Index';
import Scroll from 'components/scroll/Index';
import '@vant/touch-emulator';
import { ADDPEOPLELIST, DELETEPEOPLELIST, UPDATERANDOMNO, SUBMITQUESNAIRE } from 'store/mutations-types.js';

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
      columns: [
        { text: '本人', id: 1 }, { text: '父亲', id: 2 }, { text: '母亲', id: 3 },
        { text: '儿子', id: 4 }, { text: '女儿', id: 5 }, { text: '其他', id: 6 }],
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

    rlationShipIsExit (customerRel) {
      return this.$store.state.peopleList.find(item => item.customerRel === customerRel);
    },
    submitData () {
      if (this.baseInfoIsCompeleted) {
        this.$store.dispatch(SUBMITQUESNAIRE);
      } else {
        Notify({ type: 'warning', message: '请填写基础信息' });
      }
    },
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

    deletePeople (customerNo) {
      this.$store.commit(DELETEPEOPLELIST, customerNo);
    },
    toAddDetail (customerNo) {
      this.$router.push({ path: '/people', query: { customerNo: customerNo } });
    },
    onConfirm (value) {
      const { id, text } = value;
      this.value = text;
      this.showPicker = false;
      this.$store.commit(UPDATERANDOMNO);

      // 关系唯一添加
      setTimeout(() => {
        this.isShow = false;
        if (id !== 1 && id !== 2 && id !== 3) {
          const newObj = {
            customerRel: id,
            customerNo: this.$store.state.randomNo,
            recordData: {
              evaluationInfo: [],
              healthInfo: [],
              careInfo: [],
              medicineInfo: []
            },
            text: text
          };
          this.$store.commit(ADDPEOPLELIST, newObj);
        } else {
          if (this.rlationShipIsExit(id)) {
            Notify({ type: 'warning', message: `${text}不能重复添加` });
          } else {
            const newObj = {
              customerRel: id,
              customerNo: id,
              recordData: {
                evaluationInfo: [],
                healthInfo: [],
                careInfo: [],
                medicineInfo: []
              },
              text: text
            };
            this.$store.commit(ADDPEOPLELIST, newObj);
          }
        }
      }, 500);
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
