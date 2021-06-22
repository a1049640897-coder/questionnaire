<template>
  <div class="home">
   <button @click="toPage">
      跳转到其他页面
   </button>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {

  },
  methods: {
    toPage () {
      this.$router.push('test');
    }
  }
};
</script>
<style lang="scss" scoped>
  .home {
    background-color: red;
  }
</style>
