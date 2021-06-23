<template>
  <div class="home">
    <CommonPopup :is-show="isShow" :is-allow-close="false">
      <div class="inside-box">
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
    <van-popup v-model="communityPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="communitys"
        @cancel="communityPicker = false"
        @confirm="onConfirmComunity"
      />
    </van-popup>
  </div>
</template>

<script>
import CommonPopup from 'components/popup/Index';
import { Field, Form, Button, Picker, Popup, Notify } from 'vant';
import { listCommunitys, listBuildings } from 'apis/home';

export default {
  name: 'HomePop',
  data () {
    return {
      isShow: false,
      name: '',
      address: '',
      addressName: '',
      elderName_1: '',
      elderName_2: '',
      showPicker: false,
      communityPicker: false,
      value: '',
      communityValue: '',
      columns: ['杭州', '宁波'],
      communitys: []
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
    async getListCommunity () {
      try {
        const { data } = await listCommunitys();
        data.communitys.forEach((v, i) => {
          v.text = v.communityName;
        });
        this.communitys = data.communitys;
      } catch (e) {
        console.error(e);
      }
    },
    async getListBuildings () {
      try {
        // const { data } = await listBuildings();
        // console.log('楼宇', data);
      } catch (e) {
        console.error(e);
      }
    },

    selectBuildings () {
      if (this.communityValue) {
        this.getListBuildings();
      } else {
        Notify({ type: 'primary', message: '请先选择社区' });
      }
    },

    onConfirm (value) {
      this.value = value;
      this.showPicker = false;
    },
    onConfirmComunity (value) {
      this.communityValue = value.text;
      this.communityPicker = false;
    },
    onSubmit (values) {
      console.log(values);
      this.isShow = false;
    }
  },
  created () {
    this.getListCommunity();
  }
};
</script>
<style lang="scss" scoped>
  .van-cell {
    width:100%;
  }
</style>
