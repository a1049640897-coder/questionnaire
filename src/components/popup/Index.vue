<template>
    <div class="popup-box">
      <van-popup v-model="isShow"  v-if="isAllowClose" :close-on-click-overlay="false" @click-overlay="closePopup">
        <slot></slot>
      </van-popup>
      <van-popup v-model="isShow" :close-on-click-overlay="false" v-else >
        <slot></slot>
      </van-popup>
    </div>
</template>

<script>
import { Popup } from 'vant';
export default {
  name: 'Index',
  components: {
    [Popup.name]: Popup
  },
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    isAllowClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    closePopup () {
      console.info('子组件点击了');
      this.$emit('closePopup');
    }
  }
};
</script>

<style scoped lang="scss">
  .van-popup--center {
    width: 80%;
    min-width: 300px;
    border-radius: 5px;
  }
</style>
