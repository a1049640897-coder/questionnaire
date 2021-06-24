<template>
  <div>
    <div class="base-info-box">
      <scroll ref="wrapper"
              :listenScroll="true"
              :pullup="false"
              :data="list">
        <div>
          <div class="item-box" v-for="(item,index) in list" :key="index" >
            <h4>{{item.stemName}}</h4>
            <div class="box-list">
              <div class="radio-btn">
                更好的世界观
              </div>
<!--              <van-radio-group v-model="item.radio" @change="checkData" direction="horizontal" :key="index">-->
<!--                <van-radio :name="nItem.optionId" shape="square" v-for="(nItem,nIndex) in item.stemList[0].optionList" :key="nIndex">{{nItem.optionName}}</van-radio>-->
<!--              </van-radio-group>-->
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
      this.list = data.basicInfo;
      console.log('data', data);
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
    .item-box {
      h4 {
        font-size: 14px;
      }
      .box-list {
        margin-top: 10px;
        display: flex;
        .radio-btn {
          border: 1px solid #999;
          color: #333;
          background: #F5F5F5;
          padding: 5px;
          font-size: 14px;
        }
      }
      .van-radio--horizontal {
        margin-bottom: 10px;
      }
    }
  }
</style>
