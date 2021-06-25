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
              <div :class="nItem.isChecked?activeBtn:radioBtn" v-if="nItem.optionType===1" @click="checkData(index,nIndex,nItem)" v-for="(nItem,nIndex) in item.stemList[0].optionList" :key="nIndex">
                {{nItem.optionName}}
              </div>
              <div v-else :key="nIndex">
                <input type="text" placeholder="请输入其他症状" class="input-box">
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
      this.list = data.healthInfo;
      this.list.forEach((v, i) => {
        // 增加选中标识符
        v.stemList.forEach((n, z) => {
          n.optionList.forEach((m, k) => {
            this.$set(m, 'isChecked', false);
          });
        });
      });
      console.log('专业医护数据', data.healthInfo);
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
      height: calc(100vh - 110px );
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
