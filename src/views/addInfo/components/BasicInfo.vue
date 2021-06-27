<template>
  <div >
    <div class="base-info-box">
      <scroll ref="wrapper"
              :listenScroll="true"
              :pullup="false"
              :data="list">
        <div>
          <div class="item-box" v-for="(item,index) in list" :key="index" >
            <div class="title">{{item.stemName}}</div>
            <div class="box-list" v-if="item.isMultiselect">
              <div :class="nItem.isChecked?activeBtn:radioBtn" @click="checkMultipleData(index,nIndex,nItem)" v-for="(nItem,nIndex) in item.stemList[0].optionList" :key="nIndex">
                {{nItem.optionName}}
              </div>
            </div>
            <div class="box-list" v-else>
              <div :class="nItem.isChecked?activeBtn:radioBtn" @click="checkData(index,nIndex,nItem)" v-for="(nItem,nIndex) in item.stemList[0].optionList" :key="nIndex">
                {{nItem.optionName}}
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
import * as types from 'store/mutations-types.js';
export default {
  name: 'BasicInfo',
  data () {
    return {
      radio: '',
      list: [],
      activeBtn: 'active-radio-btn',
      radioBtn: 'radio-btn',
      mutipleList: [],
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
  computed: {
  },
  methods: {

    saveData () {
      for (let item of this.$store.state.baseInfo) {
        this.submitList.push(item);
      }
      for (let item of this.$store.state.baseInfoMutifly) {
        this.mutipleList.push(item);
      }
    },
    compareData () {
      // 对比没有多选的基础数据
      this.$store.state.baseInfo.forEach((v, i) => {
        this.list.forEach((n, z) => {
          if (v.stemId === n.stemId) {
            n.stemList.forEach((m, k) => {
              m.optionList.forEach((k, q) => {
                if (k.optionId === v.optionId) {
                  this.$set(k, 'isChecked', true);
                }
              });
            });
          }
        });
      });
      // 对比多选的基础数据
      this.$store.state.baseInfoMutifly.forEach((v, i) => {
        this.list.forEach((n, z) => {
          if (n.isMultiselect) {
            n.stemList.forEach((m, k) => {
              m.optionList.forEach((k, q) => {
                if (k.optionId === v.optionId) {
                  this.$set(k, 'isChecked', true);
                }
              });
            });
          }
        });
      });
      this.$loading.hide();
    },
    submitData () {
      // 判断是否全部回答完整
      let newSbArr = JSON.parse(JSON.stringify(this.submitList));
      let newMuArr = JSON.parse(JSON.stringify(this.mutipleList));
      for (let k of newMuArr) {
        newSbArr.push(k);
      }
      for (let n of this.list) {
        const flag = newSbArr.find(item => { return n.stemId === item.stemId; });
        if (flag) {
          this.isSubmit = true;
        } else {
          this.isSubmit = false;
          break;
        }
      }

      if (this.isSubmit) {
        this.$store.commit(types.UDATEBASEINFO, this.submitList);
        this.$store.commit(types.UDATEBASEINFOMUTY, this.mutipleList);
        history.back();
      } else {
        Notify({ type: 'warning', message: '问题未回答完整' });
      }
    },
    checkData (index, nIndex, val) {
      this.list.forEach((v, i) => {
        if (i === index) {
          v.stemList[0].optionList.forEach((n, z) => {
            if (z === nIndex) {
              this.$set(n, 'isChecked', true);
              const newList = this.submitList.filter((item) => { return item.uid !== i; });
              this.submitList = newList;
              const { stemId, optionId } = n;
              const newObj = { stemId, optionId, uid: i };
              this.submitList.push(newObj);
            } else {
              this.$set(n, 'isChecked', false);
            }
          });
        }
      });
    },
    checkMultipleData (index, nIndex, val) {
      // 判断是否超过三个
      if (this.mutipleList.length >= 3) {
        this.list.forEach((v, i) => {
          if (i === index) {
            v.stemList[0].optionList.forEach((n, z) => {
              if (z === nIndex) {
                // 判断是否点击过
                if (n.isChecked) {
                  // 清楚list里对应的值
                  let newArr = this.mutipleList.filter((p) => p.optionId !== n.optionId);
                  this.mutipleList = newArr;
                  console.log(newArr);
                  this.$set(n, 'isChecked', false);
                } else {
                  Notify({ type: 'warning', message: '该选项不能超过3项' });
                }
              }
            });
          }
        });
      } else {
        this.list.forEach((v, i) => {
          if (i === index) {
            v.stemList[0].optionList.forEach((n, z) => {
              if (z === nIndex) {
                if (z === nIndex) {
                  // 判断是否点击过
                  if (n.isChecked) {
                    // 清楚list里对应的值
                    let newArr = this.mutipleList.filter((p) => p.optionId !== n.optionId);
                    this.mutipleList = newArr;
                    console.log('newArr', this.mutipleList);
                    this.$set(n, 'isChecked', false);
                  } else {
                    this.$set(n, 'isChecked', true);
                    const newObj = {};
                    this.$set(newObj, 'optionId', n.optionId);
                    this.$set(newObj, 'stemId', n.stemId);
                    this.mutipleList.push(newObj);
                  }
                }
              }
            });
          }
        });
      }
      console.log('mutipleList', this.mutipleList);
    },
    async getData () {
      this.$loading.show();
      try {
        const { data } = await getCustomerReport();
        this.list = data.basicInfo;
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
  .base-info-box {
    @include common;
    .wrapper {
      background-color: #ffffff;
    }
    .item-box {
      margin-bottom: 10px;
      .title {
        font-size: 14px;
        font-weight: bold;
      }
      .box-list {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        @include btn-styles;
      }
      .van-radio--horizontal {
        margin-bottom: 10px;
      }
    }
  }
</style>
