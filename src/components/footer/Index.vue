<template>
    <div class="footer-box">
      <div class="main-box" v-show="isOnly" @click="homeSubmit">
        <div class="box-wrapper">
          提交
        </div>
      </div>
      <div class="between-box" v-show="!isOnly">
        <div class="box-left" @click="back" v-show="isBack">
          返回
        </div>
        <div class="box-left" @click="customizeBack" v-show="!isBack">
          返回
        </div>
        <div class="box-right" @click="submitMsg">
          提交
        </div>
      </div>
    </div>
</template>

<script>
import { Button } from 'vant';
export default {
  name: 'Index',
  props: {
    isBack: {
      type: Boolean,
      default () {
        return true;
      }
    },
    isOnly: {
      type: Boolean,
      default () {
        return false;
      }
    }
  },
  components: {
    [Button.name]: Button
  },
  methods: {
    back () {
      history.back();
    },
    submitMsg () {
      this.$emit('submitData');
    },
    customizeBack () {
      this.$emit('back');
    },
    homeSubmit () {
      this.$emit('submitData');
    }
  }
};
</script>

<style lang="scss" scoped>
  @mixin common {
    width: 50%;
    height: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }
  .footer-box {
    display: flex;
    position: fixed;
    height: 50px;
    bottom: 0px;
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    .between-box {
      width: 100%;
      display: flex;
      .box-left,.box-right {
        @include common
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
    .main-box {
      width: 100%;
      .box-wrapper {
        @include common;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        background-color: #799BDB;
        border-radius: 10px 10px 0px 0px ;
        color: white;
      }
    }
  }
</style>
