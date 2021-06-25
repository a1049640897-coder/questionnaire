<template>
  <div>
    <div class="medical-info-box">
      <scroll ref="wrapper"
              :listenScroll="true"
              :pullup="false"
              :data="list"
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
          :value="count"
          name="name"
          label="单位"
          placeholder="请选择"
          readonly
          clickable
          @click="showCount= true"
        />
        <van-field
          name="addressName"
          label="次数"
          placeholder="请填写次数"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确定</van-button>
          <van-button round block type="warning" @click="cancelPicker" native-type="submit">取消</van-button>
        </div>
      </van-form>
    </van-popup>
    <van-popup v-model="showCount" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showCount = false"
      />
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
      columns: [{ text: '每日', val: 'did' }, { text: '每周', val: 'wid' }, { text: '每月', val: 'mid' }],
      showPicker: false,
      count: '',
      showCount: false,
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
    cancelPicker () {
      this.showPicker = false;
    },
    onConfirm (value) {
      const { text } = value;
      this.count = text;
      this.showCount = false;
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
