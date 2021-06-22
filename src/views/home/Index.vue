<template>
  <div class="home">
    <CommonPopup :is-show="isShow" :is-allow-close="false">
     <div class="inside-box">
       <van-form @submit="onSubmit">
         <van-field
           v-model="name"
           name="name"
           label="社区名称"
           placeholder="社区名称"
           :rules="[{ required: true, message: '请填写社区名称' }]"
         />
         <van-field
           readonly
           clickable
           label="楼宇"
           name="address"
           :value="value"
           placeholder="选择楼宇"
           @click="showPicker = true"
         />
         <van-field
           v-model="addressName"
           name="addressName"
           label="门牌号码"
           placeholder="请填写门牌号码"
         />
         <van-field
           v-model="elderName_1"
           name="elderName_1"
           label="老人姓名"
           placeholder="请填写老人姓名"
         />
         <van-field
           v-model="elderName_2"
           name="elderName_2"
           label="老人姓名"
           placeholder="请填写老人姓名"
         />
         <div style="margin: 16px;">
           <van-button round block type="info" native-type="submit">提交</van-button>
         </div>
       </van-form>
       <div class="remark-box">

       </div>
     </div>
    </CommonPopup>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import CommonPopup from 'components/popup/Index';
import { Field, Form, Button, Picker, Popup } from 'vant';
export default {
  name: 'home',
  data () {
    return {
      isShow: true,
      name: '',
      address: '',
      addressName: '',
      elderName_1: '',
      elderName_2: '',
      showPicker: false,
      value: '',
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州']
    };
  },
  components: {
    CommonPopup,
    [Field.name]: Field,
    [Form.name]: Form,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Popup.name]: Popup
  },
  methods: {
    onConfirm (value) {
      this.value = value;
      this.showPicker = false;
    },
    onSubmit (values) {
      console.log(values);
      this.isShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
  .van-cell {
    width:100%;
  }
</style>
