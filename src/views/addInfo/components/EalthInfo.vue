<template>
  <div>
    <div class="evalute-info-box">
      <div class="title">专业医护指导</div>
      <scroll ref="wrapper"
              :listenScroll="true"
              :pullup="false"
              :data="list">
        <div>
          <div class="item-box" v-for="(item,index) in list" :key="index" >
            <div class="title">{{item.stemName}}</div>
            <div class="box-list">
              <div v-for="(nItem,nIndex) in item.stemList[0].optionList" :key="nIndex">
                  <div :class="nItem.isChecked?activeBtn:radioBtn" v-if="nItem.optionType===1" @click="checkData(index,nIndex,nItem)" :key="nIndex">    {{nItem.optionName}}</div>
                  <div v-else > <input type="text" placeholder="请输入其他症状"  v-model="nItem.remarks" @blur="getInputData(nItem,nIndex)" class="input-box" :key="nIndex"></div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <Footer @submitData="submitData"></Footer>
  </div>

</template>

<script>
import { RadioGroup, Radio, Form, Field, Notify } from 'vant';
import Scroll from 'components/scroll/Index';
import Footer from 'components/footer/Index';
import { getCustomerReport } from 'apis/people/index.js';
import { UPDATEEALTHINFO } from 'store/mutations-types.js';

export default {
  name: 'BasicInfo',
  data () {
    return {
      radio: '',
      list: [],
      activeBtn: 'active-radio-btn',
      radioBtn: 'radio-btn',
      submitList: []
    };
  },
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Form.name]: Form,
    [Field.name]: Field,

    Footer,
    Scroll
  },
  methods: {

    submitData () {
      const newObj = {
        list: this.submitList,
        customerNo: Number(this.$route.query.customerNo)
      };
      this.$store.commit(UPDATEEALTHINFO, newObj);
      history.back();
    },
    saveData () {
      const newObj = this.$store.state.peopleList.find(item => item.customerNo == this.$route.query.customerNo);
      if (newObj) {
        const arr = newObj.recordData.healthInfo;
        for (let item of arr) {
          this.submitList.push(item);
        }
      }
    },
    compareData () {
      // 对比评估资料
      const newObj = this.$store.state.peopleList.find(item => item.customerNo == this.$route.query.customerNo);
      if (newObj) {
        const arr = newObj.recordData.healthInfo;
        arr.forEach((v, i) => {
          this.list.forEach((n, z) => {
            if (n.stemId == v.stemId) {
              n.stemList.forEach((m, k) => {
                m.optionList.forEach((k, q) => {
                  if (k.optionId == v.optionId) {
                    if (v.remarks) {
                      this.$set(k, 'remarks', v.remarks);
                    } else {
                      this.$set(k, 'isChecked', true);
                    }
                  }
                });
              });
            }
          });
        });
      }
      this.$loading.hide();
    },
    getInputData (val, nIndex) {
      for (let i = 0, len = this.submitList.length; i < len; i++) {
        if (this.submitList[i].optionType == 2 && this.submitList[i].stemId == val.stemId) {
          this.submitList.splice(i, 1);
          len--;
        }
      }
      const { optionId, stemId, remarks, optionType } = val;
      const newObj = {
        optionId,
        stemId,
        remarks,
        optionType
      };
      this.submitList.push(newObj);
    },
    checkData (index, nIndex, val) {
      // 清空相同的list
      for (var i = 0, len = this.submitList.length; i < len; i++) {
        if (this.submitList[i].stemId == val.stemId && this.submitList[i].optionType == 1) {
          this.submitList.splice(i, 1);
          len--;
        }
      }
      const { optionId, stemId, optionType } = val;
      const newObj = {
        optionId,
        stemId,
        optionType
      };
      this.submitList.push(newObj);

      this.list.forEach((v, i) => {
        if (i === index) {
          v.stemList[0].optionList.forEach((n, z) => {
            if (z === nIndex) {
              this.$set(n, 'isChecked', true);
            } else {
              this.$set(n, 'isChecked', false);
            }
          });
        }
      });
    },
    async getData () {
      this.$loading.show();
      try {
        const { data } = await getCustomerReport();
        this.list = data.healthInfo;
        this.list.forEach((v, i) => {
          // 增加选中标识符
          v.stemList.forEach((n, z) => {
            n.optionList.forEach((m, k) => {
              this.$set(m, 'isChecked', false);
            });
          });
        });
        this.saveData();
        this.compareData();
      } catch (e) {
        console.error(e);
      } finally {
        this.$loading.hide();
      }
    }
  },
  created () {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
  @import "styles/mixin.scss";
  .evalute-info-box {
    @include common;
    .wrapper {
      height: calc(#{$vh} - 110px );
      background: #fff;
    }
    .title {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .item-box {
      .title {
        font-size: 14px;
        font-weight: bold;
      }
      .box-list {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        .input-box {
          width: calc( 100vw - 100px)  ;
          border: 1px solid #999999;
          background-color: #F5F5F5;
          font-size: 14px;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
        }
        @include btn-styles;
      }
      .van-radio--horizontal {
        margin-bottom: 10px;
      }
    }
  }
</style>
