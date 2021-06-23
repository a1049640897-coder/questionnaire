<template>
    <div class="footer-box">
      <div class="box-left">
        <van-button type="warning" round @click="back" >返回</van-button>
      </div>
      <div class="box-right">
        <van-button type="info" round >提交</van-button>
      </div>
    </div>
</template>

<script>
import { Button } from 'vant';
export default {
  name: 'Index',
  components: {
    [Button.name]: Button
  },
  methods: {
    back () {
      history.back();
    }
  }
};
</script>

<style lang="scss" scoped>
  .footer-box {
    display: flex;
    justify-content:center;
    align-items: center;
    position: fixed;
    height: 100px;
    background-color: #fff;
    bottom: 0px;
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    .van-button--normal {
      margin: 0px 10px;
    }
    .van-button--round {
      width: 100px;
    }
  }
</style>
