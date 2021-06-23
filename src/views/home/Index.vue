<template>
  <div class="home">
    <home-pop></home-pop>
    <home></home>
  </div>
</template>

<script>
import HomePop from './components/HomePop';
import Home from './components/Home';

export default {
  name: 'Index',
  data () {
    return {
      isShow: false
    };
  },
  components: {
    HomePop,
    Home
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
  .van-cell {
    width: 100%;
  }
</style>
