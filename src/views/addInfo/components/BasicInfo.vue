<template>
  <div>
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
    <Footer></Footer>
  </div>

</template>

<script>
import { RadioGroup, Radio, Form, Field, Notify } from 'vant';
import Scroll from 'components/scroll/Index';
import Footer from 'components/footer/Index';
import { getCustomerReport } from 'apis/people/index.js';
export default {
  name: 'BasicInfo',
  data () {
    return {
      radio: '',
      list: [],
      activeBtn: 'active-radio-btn',
      radioBtn: 'radio-btn',
      mutipleList: []
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
    checkData (index, nIndex, val) {
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
      console.log('基础数据', this.list);
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
