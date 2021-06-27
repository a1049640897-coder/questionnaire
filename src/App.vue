<template>
  <div id="app"  v-cloak>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

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
