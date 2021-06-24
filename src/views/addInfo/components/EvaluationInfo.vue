<template>
  <div>
    <div class="evaluate-info-box">
      <scroll ref="wrapper"
              :listenScroll="true"
              :pullup="false"
              :data="list">
        <div>
          <div class="item-box" v-for="(item,index) in list" :key="index">
            <h4>{{item.stemName}}</h4>
            <div class="box-wrapper">
              <div class="item-box" v-for="(nItem,nIndex) in item.stemList" :key="nItem.stemId">
                <h5>{{nItem.stemName}}</h5>
                <div class="item-option">
                  <van-radio-group v-model="nItem.radio" @change="checkData" direction="horizontal" >
                    <van-radio :name="zItem.optionId" shape="square" v-for="(zItem,zIndex) in nItem.optionList" :key="zIndex">{{zItem.optionName}}</van-radio>
                  </van-radio-group>
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
import { RadioGroup, Radio, Form, Field } from 'vant';
import Scroll from 'components/scroll/Index';
import Footer from 'components/footer/Index';
import { getCustomerReport } from 'apis/people/index.js';

export default {
  name: 'BasicInfo',
  data () {
    return {
      radio: '',
      list: []
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
    checkData (e) {
      console.log('回调参数', e);
    },
    async getData () {
      const { data } = await getCustomerReport();
      this.list = data.evaluationInfo;
      console.log('data', data.evaluationInfo);
    }
  },
  created () {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
  @import "styles/mixin.scss";

  .evaluate-info-box {
    @include common;

    .item-box {
      h4 {
        font-size: 16px;
        font-weight: 400;
      }

      .box-wrapper {
        margin-top: 10px;
        background: #fff;
        .item-box {
           h5 {
             font-weight: 400;
           }
          margin-bottom: 10px;
        }
      }

      .van-radio--horizontal {
        margin-bottom: 10px;
      }
    }
  }
</style>
