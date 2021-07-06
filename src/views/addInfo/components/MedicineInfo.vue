<template>
  <div>
    <div class="medical-info-box">
      <scroll ref="wrapper"
              :listenScroll="true"
              :pullup="false"
              :data="medicalListData"
      >
        <div>
          <div class="item-box" v-for="(item,index) in list" :key="item.stemId" v-if="item.stemName!==title">
            <div class="title">
              {{item.stemName}}
            </div>
            <div class="btn-box">
              <div class="box-item" v-for="(nItem,nIndex) in item.stemList" :key="nIndex">
                <div :class="zItem.isChecked?activeBtn:radioBtn"  @click="checkData(index,nIndex,zIndex,zItem)"
                     v-for="(zItem,zIndex) in nItem.optionList" :key="zIndex">{{zItem.optionName}}
                </div>
              </div>
            </div>
          </div>
          <div v-else>
          <div class="bottom-item-box">
            <div class="title">
              药物治疗
            </div>
            <div class="btn-box" v-for="(item,index) in medicalListData" :key="index">
              <div class="box-item">
                <div class="medical-box">
                  <div class="medical-top">
                    <div class="medical-title">
                      <input type="text" placeholder="药物名称" v-model="item.name">
                    </div>
                    <div class="medical-count" @click="showCount(item,item.selectedIndex,index)">
                      {{item.count}}
                    </div>
                    <div class="medical-del">
                      <van-icon name="delete-o" @click="delMedicalDate(index)"/>
                    </div>
                  </div>
                  <div class="medical-remark">
                    <textarea placeholder="请备注" v-model="item.remarks" style=" resize:none;padding-left:10px;padding-top:10px;width: calc(100% - 10px);border-radius: 5px;height: 40px;border: 1px solid #cccccc;">
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="add-btn">
              <van-button type="primary" @click="addMedicalData" icon="plus" round block>添加</van-button>
            </div>
          </div>
          </div>
        </div>
      </scroll>
    </div>
    <Footer @submitData="submitData"></Footer>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        ref="picker"
      />
    </van-popup>
  </div>

</template>

<script>
import { RadioGroup, Radio, Form, Field, Button, Icon, Picker, Popup } from 'vant';
import Scroll from 'components/scroll/Index';
import Footer from 'components/footer/Index';
import { getCustomerReport, listEnumValues } from 'apis/common/index.js';
import { UPDATEMEDICAL } from 'store/mutations-types.js';

export default {
  name: 'MedicineInfo',
  data () {
    return {
      radio: '',
      list: [],
      title: '药物治疗',
      columns: [],
      showPicker: false,
      isAdd: true,
      medicalListData: [],
      submitList: [],
      modiflyIndex: 0,
      activeBtn: 'active-radio-btn',
      radioBtn: 'radio-btn',
      type: {
        enumType: 'MedicineType'
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
    [Field.name]: Field,
    [Form.name]: Form,

    Footer,
    Scroll
  },
  methods: {

    showCount (nItem, selectedIndex, index) {
      console.info('index', selectedIndex);

      this.showPicker = true;
      this.$refs.picker.setColumnIndex(0, selectedIndex);
      this.isAdd = false;
      this.modiflyIndex = index;
    },
    saveData () {
      const newObj = this.$store.state.peopleList.find(item => item.customerNo == this.$route.query.customerNo);
      if (newObj) {
        const arr = newObj.recordData.medicineInfo;
        for (let item of arr) {
          if (item.stemId !== 36) {
            this.submitList.push(item);
          } else {
            this.medicalListData.push(item);
          }
        }
      }
    },
    compareData () {
      // 对比评估资料
      const newObj = this.$store.state.peopleList.find(item => item.customerNo == this.$route.query.customerNo);
      if (newObj) {
        const arr = newObj.recordData.medicineInfo;
        arr.forEach((v, i) => {
          this.list.forEach((n, z) => {
            if (n.stemId == v.stemId) {
              n.stemList.forEach((m, k) => {
                m.optionList.forEach((k, q) => {
                  if (k.optionId == v.optionId) {
                    if (v.remarks) {
                      this.$set(k, 'remarks', v.remarks);
                    } else {
                      this.$set(k, 'isChecked', true);
                    }
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
      this.medicalListData.forEach((v, i) => {
        this.submitList.push(v);
      });
      const newObj = {
        list: this.submitList,
        customerNo: Number(this.$route.query.customerNo)
      };
      this.$store.commit(UPDATEMEDICAL, newObj);
      history.back();
    },
    onConfirm (value) {
      const { key, text } = value;
      const index = this.columns.findIndex(item => item.key == key);
      if (this.isAdd) {
        const newObj = {
          name: '',
          count: text,
          remarks: '',
          unit: key,
          stemId: 36,
          selectedIndex: index
        };
        this.medicalListData.push(newObj);
      } else {
        this.medicalListData.forEach((v, i) => {
          if (i == this.modiflyIndex) {
            v.times = text;
            v.unit = key;
            v.selectedIndex = index;
          }
        });
      }
      this.showPicker = false;
    },
    onCancel () {
      this.showPicker = false;
      this.isAdd = true;
    },
    delMedicalDate (index) {
      this.medicalListData.splice(index, 1);
    },

    addMedicalData () {
      this.showPicker = true;
      this.isAdd = true;
    },

    checkData (index, nIndex, zIndex, val) {
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
    async getListEnumValues () {
      try {
        const { data } = await listEnumValues(this.type);
        data.forEach((v, i) => {
          v.text = v.value;
          this.columns.push(v);
        });
      } catch (e) {
        console.error(e);
      }
    },
    async getData () {
      this.$loading.show();
      try {
        const { data } = await getCustomerReport();
        this.list = data.medicineInfo;
        // 增加是否选中标识符
        this.list.forEach((v, i) => {
          v.stemList.forEach((n, z) => {
            n.optionList.forEach((k, m) => {
              this.$set(k, 'isChecked', false);
            });
          });
        });
        this.saveData();
        this.compareData();
      } catch (e) {
        console.error(e);
      } finally {
        this.$loading.hide();
      }
    }
  },
  created () {
    this.getData();
    this.getListEnumValues();
  }
};
</script>

<style lang="scss" scoped>
  @import "styles/mixin.scss";

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
