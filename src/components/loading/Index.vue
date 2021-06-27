<template>
  <div class="loading-box">
    <van-overlay :show="isShowLoading" >
      <div class="wrapper" @click.stop>
        <van-loading />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Loading, Overlay } from 'vant';

export default {
  name: 'Index',
  data () {
    return {
      isShowLoading: false
    };
  },
  components: {
    [Loading.name]: Loading,
    [Overlay.name]: Overlay
  }
};
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
