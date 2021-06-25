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
      list: [],
      activeBtn: 'active-radio-btn',
      radioBtn: 'radio-btn',
      title: ''
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
      console.info('点击的数据', index, nIndex, val);
      console.info('点击后面的数据', this.list);
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
      console.log('评估数据', data.evaluationInfo);
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
