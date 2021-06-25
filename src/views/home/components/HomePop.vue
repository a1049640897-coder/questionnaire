<template>
  <div class="home">
    <CommonPopup :is-show="isShow" :is-allow-close="false">
      <div class="inside-box">
        <van-form @submit="onSubmit">
          <van-field
            :value="communityObj.name"
            name="communityId"
            label="社区"
            placeholder="选择社区"
            readonly
            clickable
            @click="communityPicker = true"
            :rules="[{ required: true, message: '请选择选择社区' }]"
          />
          <van-field
            readonly
            clickable
            label="楼宇"
            name="buildingName"
            :value="buildingName"
            placeholder="选择楼宇"
            @click="selectBuildings"
            :rules="[{ required: true, message: '请选择楼宇' }]"
          />
          <van-field
            v-model="roomNo"
            name="roomNo"
            label="门牌号码"
            placeholder="门牌号码"
            required
            :rules="[{ required: true, message: '请填写门牌号码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
        <div class="remark-box">

        </div>
      </div>
    </CommonPopup>
    <!--楼宇-->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="buildings"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!--社区-->
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
import { listCommunitys, listBuildings, getUserInfo } from 'apis/home';
import * as types from 'store/mutations-types.js';

export default {
  name: 'HomePop',
  data () {
    return {
      isShow: true,
      showPicker: false,
      communityPicker: false,
      buildingName: '',
      roomNo: '',
      communityObj: {
        name: '',
        communityId: ''
      },
      communitys: [],
      buildings: []
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
          this.$set(v, 'text', v.communityName);
        });
        this.communitys = data.communitys;
      } catch (e) {
        console.error(e);
      }
    },

    async getListBuildings () {
      try {
        const { communityId } = this.communityObj;
        const param = {
          communityId
        };
        const { data } = await listBuildings(param);
        console.info('返回的楼宇', data);
        this.buildings = data.buildings;
        this.showPicker = true;
      } catch (e) {
        console.error(e);
      }
    },

    async validateUser (param) {
      try {
        param.buildingNo = 1;
        // delete param.buildingName;
        // const { data } = await getUserInfo(param);
        // console.info('结果', data);
        // const { isExist, isWrite } = data;
        const [isExist, isWrite] = [0, 0];
        if (isExist) {
          Notify({ type: 'warning', message: '用户已经存在' });
        } else if (isWrite) {
          Notify({ type: 'warning', message: '用户已经填写了问卷' });
        } else {
          console.log('成功提交');
          this.$store.commit(types.UPDATEENTERDATA, param);
          this.isShow = false;
        }
      } catch (e) {
        console.error(e);
      }
    },

    selectBuildings () {
      if (this.communityObj.communityId) {
        this.getListBuildings();
      } else {
        Notify({ type: 'warning', message: '请先选择社区' });
      }
    },

    onConfirm (value) {
      console.log('楼宇', value);
      this.buildingName = value;
      this.showPicker = false;
    },
    onConfirmComunity (value) {
      const { text, communityId } = value;
      this.communityObj.name = text;
      this.communityObj.communityId = communityId;
      this.communityPicker = false;
    },
    onSubmit (values) {
      this.validateUser(values);
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
