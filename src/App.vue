<template>
  <div id="app"  v-cloak>
    <router-view v-wechat-title="$route.meta.title" :key="$route.fullpath"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {
  },
  created: function () {
    this.$router.push('/');
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
