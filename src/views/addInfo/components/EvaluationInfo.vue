<template>
  <div>
    <div class="evalute-info-box">
      <div class="title">
        {{title}}
      </div>
      <scroll ref="wrapper"
              :listenScroll="true"
              :pullup="false"
              :data="list">
        <div class="box">
          <div class="item-box" v-for="(zItem,zIndex) in list" :key="zIndex">
            <div v-for="(item,index) in zItem.stemList">
              <div class="box-title">
                {{item.stemName}}
              </div>
              <div class="box-btn">
                <div :class="nItem.isChecked?activeBtn:radioBtn" @click="checkData(index,nIndex,nItem)"
                     v-for="(nItem,nIndex) in item.optionList" :key="nIndex">
                  {{nItem.optionName}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <Footer @submitData="submitData" ></Footer>
  </div>

</template>

<script>
import { RadioGroup, Radio, Form, Field, Notify } from 'vant';
import Scroll from 'components/scroll/Index';
import Footer from 'components/footer/Index';
import { getCustomerReport } from 'apis/people/index.js';
import { ADDEVALUATIONINFO } from 'store/mutations-types.js';

export default {
  name: 'BasicInfo',
  data () {
    return {
      list: [],
      activeBtn: 'active-radio-btn',
      radioBtn: 'radio-btn',
      title: '',
      submitList: [],
      isSubmit: false
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

    saveData () {
      const newObj = this.$store.state.peopleList.find(item => item.customerNo == this.$route.query.customerNo);
      if (newObj) {
        const arr = newObj.recordData.evaluationInfo;
        for (let item of arr) {
          this.submitList.push(item);
        }
      }
    },
    compareData () {
      // 对比评估资料
      const newObj = this.$store.state.peopleList.find(item => item.customerNo == this.$route.query.customerNo);
      if (newObj) {
        const arr = newObj.recordData.evaluationInfo;
        arr.forEach((v, i) => {
          this.list.forEach((n, z) => {
            n.stemList.forEach((m, k) => {
              if (m.stemId == v.stemId) {
                m.optionList.forEach((k, q) => {
                  if (k.optionId === v.optionId) {
                    this.$set(k, 'isChecked', true);
                  }
                });
              }
            });
          });
        });
      }
      this.$loading.hide();
    },
    // 提交数据
    submitData () {
      // 判断是否全部回答完整
      let newSbArr = JSON.parse(JSON.stringify(this.submitList));
      for (let n of this.list[0].stemList) {
        const flag = newSbArr.find(item => { return n.stemId === item.stemId; });
        if (flag) {
          this.isSubmit = true;
        } else {
          this.isSubmit = false;
          break;
        }
      }
      if (this.isSubmit) {
        const newObj = {
          list: this.submitList,
          customerNo: Number(this.$route.query.customerNo)
        };
        this.$store.commit(ADDEVALUATIONINFO, newObj);
        history.back();
      } else {
        Notify({ type: 'warning', message: '问题未回答完整' });
      }
    },

    checkData (index, nIndex, val) {
      // 清空相同的list
      const clearObj = this.submitList.filter((item) => {
        return item.stemId !== val.stemId;
      });
      this.submitList = JSON.parse(JSON.stringify(clearObj));
      const { optionId, stemId } = val;
      const newObj = {
        optionId,
        stemId
      };
      this.submitList.push(newObj);
      this.list.forEach((v, i) => {
        v.stemList.forEach((n, z) => {
          if (z === index) {
            n.optionList.forEach((m, k) => {
              if (k === nIndex) {
                this.$set(m, 'isChecked', true);
              } else {
                this.$set(m, 'isChecked', false);
              }
            });
          }
        });
      });
    },
    async getData () {
      this.$loading.show();
      try {
        const { data } = await getCustomerReport();
        this.list = data.evaluationInfo;
        this.title = data.evaluationInfo[0].stemName;
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
        console.log('评估数据', this.list);
      } catch (e) {
        console.error(e);
        this.$loading.hide();
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
      height: calc(100vh - 110px);
      overflow: hidden;
      background-color: #ffffff;
    }

    .title {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .box {
      .item-box {
        display: flex;
        flex-direction: column;
        .box-btn {
          display: flex;
          flex-wrap: wrap;
        }

        .box-title {
          font-size: 14px;
          font-weight: bold;
          margin: 10px 0px;
        }
        @include btn-styles;
      }

      .van-radio--horizontal {
        margin-bottom: 10px;
      }
    }
  }
</style>
