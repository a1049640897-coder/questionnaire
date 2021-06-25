<template>
    <div class="footer-box">
      <div class="box-left" @click="back">
        返回
      </div>
      <div class="box-right">
        提交
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
    position: fixed;
    height: 50px;
    bottom: 0px;
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    .box-left,.box-right {
      width: 50%;
      height: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
    }
    .box-right{
      background-color: #799BDB;
      border-radius: 0px 10px 0px 0px;
      color: white;
    }
    .box-left {
      background-color: #cccccc;
      border-radius: 10px 0px 0px 0px;
    }
  }
</style>
