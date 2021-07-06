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
                <div :class="zItem.isChecked?activeBtn:radioBtn" @click="checkData(index,nIndex,zIndex,zItem)"
                     v-for="(zItem,zIndex) in nItem.optionList" :key="zIndex">
                  <span v-if="zItem.flag">
                    {{zItem.remarkTitle}}
                  </span>
                  <span v-else>
                     {{zItem.optionName}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <Footer @submitData="submitData"></Footer>
    <van-popup v-model="showPicker" position="center">
      <van-form @submit="onSubmit">
        <van-field
          :value="unitTitle"
          name="name"
          label="单位"
          placeholder="请选择"
          readonly
          clickable
          @click="showCount= true"
          :rules="[{ required: true, message: '请选择单位' }]"
        />
        <van-field
          name="times"
          label="次数"
          placeholder="请填写次数"
          v-model="times"
          :rules="[{ required: true, message: '请填写次数' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确定</van-button>
          <van-button round block type="warning" @click="cancelPicker" native-type="button">清除</van-button>
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
import { getCustomerReport } from 'apis/common/index.js';
import { UPDATECAREINFO } from 'store/mutations-types.js';

export default {
  name: 'MedicineInfo',
  data () {
    return {
      radio: '',
      list: [],
      columns: [{ text: '每日', unit: 'qid' }, { text: '每周', unit: 'qweek' }, { text: '每月', unit: 'qm' }],
      showPicker: false,
      unit: '',
      unitTitle: '',
      times: '',
      showCount: false,
      activeBtn: 'active-radio-btn',
      radioBtn: 'radio-btn',
      index: 0,
      nIndex: 0,
      zIndex: 0,
      zItem: {},
      submitList: [],
      test: {
        'enumType': 'MedicineType'
      }
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
    saveData () {
      const newObj = this.$store.state.peopleList.find(item => item.customerNo == this.$route.query.customerNo);
      if (newObj) {
        const arr = newObj.recordData.careInfo;
        for (let item of arr) {
          this.submitList.push(item);
        }
      }
    },
    compareData () {
      // 对比评估资料
      const newObj = this.$store.state.peopleList.find(item => item.customerNo == this.$route.query.customerNo);
      if (newObj) {
        const arr = newObj.recordData.careInfo;
        arr.forEach((v, i) => {
          this.list.forEach((n, z) => {
            if (n.stemId == v.stemId) {
              n.stemList.forEach((m, k) => {
                m.optionList.forEach((k, q) => {
                  if (k.optionId === v.optionId) {
                    this.$set(k, 'isChecked', true);
                    this.$set(k, 'times', v.times);
                    this.$set(k, 'unit', v.unit);
                    this.$set(k, 'unitTitle', v.unitTitle);
                    this.$set(k, 'remarkTitle', v.remarkTitle);
                    this.$set(k, 'flag', v.flag);
                  }
                });
              });
            }
          });
        });
      }
      this.$loading.hide();
    },
    submitData () {
      const newObj = {
        list: this.submitList,
        customerNo: Number(this.$route.query.customerNo)
      };
      this.$store.commit(UPDATECAREINFO, newObj);
      history.back();
    },

    onSubmit (values) {
      const { times, name } = values;
      this.list.forEach((v, i) => {
        if (i === this.index) {
          v.stemList.forEach((n, z) => {
            if (z === this.nIndex) {
              n.optionList.forEach((k, m) => {
                if (m === this.zIndex) {
                  this.$set(k, 'isChecked', true);
                  this.$set(k, 'times', times);
                  this.$set(k, 'unit', this.unit);
                  this.$set(k, 'unitTitle', name);
                  this.$set(k, 'remarkTitle', `${name}${times}次${k.optionName}`);
                  this.$set(k, 'flag', true);
                }
              });
            }
          });
        }
      });

      this.submitList = this.submitList.filter((item) => { return item.optionId !== this.zItem.optionId; });

      const newObj = {
        stemId: this.zItem.stemId,
        optionId: this.zItem.optionId,
        unit: this.unit,
        times: Number(times),
        unitTitle: name,
        remarkTitle: `${name}${times}次${this.zItem.optionName}`,
        flag: true
      };
      this.submitList.push(newObj);
      this.showPicker = false;
    },
    cancelPicker () {
      this.showPicker = false;
      this.list.forEach((v, i) => {
        if (i === this.index) {
          v.stemList.forEach((n, z) => {
            if (z === this.nIndex) {
              n.optionList.forEach((k, m) => {
                if (m === this.zIndex) {
                  this.$set(k, 'isChecked', false);
                  this.$set(k, 'times', '');
                  this.$set(k, 'unit', '');
                  this.$set(k, 'unitTitle', '');
                  this.$set(k, 'remarkTitle', '');
                  this.$set(k, 'flag', false);
                }
              });
            }
          });
        }
      });
      this.submitList = JSON.parse(JSON.stringify(this.submitList.filter((item) => { return item.optionId !== this.zItem.optionId; })));
    },
    onConfirm (value) {
      const { text, unit } = value;
      this.unit = unit;
      this.unitTitle = text;
      this.showCount = false;
    },
    checkData (index, nIndex, zIndex, val) {
      this.zItem = val;
      this.index = index;
      this.nIndex = nIndex;
      this.zIndex = zIndex;
      const { unitTitle, times, unit } = val;
      this.unitTitle = unitTitle;
      this.times = times;
      this.unit = unit;
      this.showPicker = true;
    },
    async getData () {
      this.$loading.show();
      try {
        const { data } = await getCustomerReport();
        this.list = data.careInfo;
        // 增加是否选中标识符 次数 单位
        this.list.forEach((v, i) => {
          v.stemList.forEach((n, z) => {
            n.optionList.forEach((k, m) => {
              this.$set(k, 'isChecked', false);
              this.$set(k, 'times', '');
              this.$set(k, 'unit', '');
              this.$set(k, 'unitTitle', '');
              this.$set(k, 'remarkTitle', '');
              this.$set(k, 'flag', '');
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
  .van-popup--center {
    width: 90%;
    border-radius: 5px;
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
