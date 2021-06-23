<template>
    <div class="footer-box">
      <div class="box-left">
        <van-button type="primary">返回</van-button>
      </div>
      <div class="box-right">
        <van-button type="info">提交</van-button>
      </div>
    </div>
</template>

<script>
import { Button } from 'vant';
export default {
  name: 'Index',
  components: {
    [Button.name]: Button
  }
};
</script>

<style lang="scss" scoped>
  .footer-box {
    display: flex;
    justify-content: space-between;
    position: fixed;
    height: 100px;
    background-color: red;
    bottom: 0px;
    width: 100%;
  }
</style>
