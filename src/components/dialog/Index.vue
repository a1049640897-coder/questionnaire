<template>
    <div class="dialog-box">
      {{isShow}}
    </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>

</style>
