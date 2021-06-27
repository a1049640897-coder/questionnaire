<template>
  <div id="app"  v-cloak>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {
  },
  created: function () {
    this.$router.push('/'); // 注意！ 你这个代码的意思就是每次刷新的时候进入'/login'，去掉就可以了
  }
};
</script>

<style>
  [v-cloak] {
    display: none;
  }
  *{
    padding: 0;
    margin: 0;
  }
  .van-button--normal{
    padding: 0 0.39rem;
  }
</style>
