<template>
  <div>
    <div class="medical-info-box">
      <scroll ref="wrapper"
              :listenScroll="true"
              :pullup="false"
              :data="medicalListData"
              @scroll="scrollD"
      >
        <div>
          <div class="item-box" v-for="(item,index) in list" :key="item.stemId">
            <div class="title">
              {{item.stemName}}
            </div>
            <div class="btn-box">
              <div class="box-item" v-for="(nItem,nIndex) in item.stemList" :key="nIndex">
                <div :class="zItem.isChecked?activeBtn:radioBtn" @click="checkData(index,nIndex,zIndex)"
                     v-for="(zItem,zIndex) in nItem.optionList" :key="zIndex">{{zItem.optionName}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <Footer></Footer>
    <van-popup v-model="showPicker" position="center">
      <van-form @submit="onSubmit">
        <van-field
          :value="communityValue"
          name="name"
          label="社区"
          placeholder="选择社区"
          readonly
          clickable
          @click="communityPicker = true"
        />
        <van-field
          readonly
          clickable
          label="楼宇"
          name="address"
          :value="value"
          placeholder="选择楼宇"
          @click="selectBuildings"
        />
        <van-field
          v-model="addressName"
          name="addressName"
          label="门牌号码"
          placeholder="请填写门牌号码"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
          <van-button round block type="warning" native-type="submit">取消</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>

</template>

<script>
import { RadioGroup, Radio, Icon, Field, Form, Button, Picker, Popup, Notify } from 'vant';
import Scroll from 'components/scroll/Index';
import Footer from 'components/footer/Index';
import { getCustomerReport } from 'apis/people/index.js';

export default {
  name: 'MedicineInfo',
  data () {
    return {
      radio: '',
      list: [],
      columns: ['每周六此', '每周一次'],
      showPicker: false,
      medicalListData: [
        { title: '阿昔莫司', count: '每周六次', remark: '请备注' },
        { title: '阿昔莫司', count: '每周六次', remark: '请备注' }
      ],
      activeBtn: 'active-radio-btn',
      radioBtn: 'radio-btn'
    };
  },
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Picker.name]: Picker,
    [Popup.name]: Popup,

    Footer,
    Scroll
  },
  methods: {
    scrollD (val) {
      console.info('店亭', val);
    },
    onConfirm (value) {
      const newObj = {
        title: 'dsad',
        count: value,
        remark: 'aa'
      };
      console.log('new', newObj);
      this.medicalListData.push(newObj);
      this.showPicker = false;
    },
    delMedicalDate (index) {
      this.medicalListData.splice(index, 1);
    },
    addMedicalData () {
      this.showPicker = true;
    },
    checkData (index, nIndex, zIndex) {
      this.showPicker = true;
      this.list.forEach((v, i) => {
        if (i === index) {
          v.stemList.forEach((n, z) => {
            if (z === nIndex) {
              n.optionList.forEach((k, m) => {
                if (m === zIndex) {
                  this.$set(k, 'isChecked', true);
                } else {
                  this.$set(k, 'isChecked', false);
                }
              });
            }
          });
        }
      });
    },
    async getData () {
      const { data } = await getCustomerReport();
      this.list = data.careInfo;
      // 增加是否选中标识符
      this.list.forEach((v, i) => {
        v.stemList.forEach((n, z) => {
          n.optionList.forEach((k, m) => {
            this.$set(k, 'isChecked', false);
          });
        });
      });

      console.log('照护', data.careInfo);
    }
  },
  created () {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
  @import "styles/mixin.scss";
  .van-popup--center {
    width: 90%;
  }
  .van-button--round {
    margin-bottom: 10px;
  }
  .medical-info-box {
    @include common;
    .item-box {
      .title {
        font-size: 15px;
        font-weight: 400;
        margin-bottom: 10px;
      }

      .btn-box {
        background-color: #ffffff;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;

        .box-item {
          display: flex;
          flex-wrap: wrap;
          @include btn-styles;
        }
      }
    }

    .bottom-item-box {
      @extend .item-box;

      .add-btn {
        width: 100%;
        margin-top: 10px;
      }

      .medical-box {
        width: 100%;

        .medical-top {
          display: flex;
          margin-bottom: 10px;

          input {
            height: 30px;
            border-radius: 5px;
            border: 1px solid #cccccc;
            padding-left: 10px;
          }

          .medical-count {
            height: 30px;
            border-radius: 5px;
            border: 1px solid #cccccc;
            line-height: 30px;
            margin: 0 10px;
            padding: 0 10px;
          }

          .medical-remark {
            width: 100%;
          }

          .medical-del {
            .van-icon {
              line-height: 30px;
              font-size: 20px;
            }
          }
        }

      }

    }
  }
</style>
