<template>
  <div class="header-box">
     <div class="left">
     </div>
     <div class="center">
       <slot name="center"></slot>
     </div>
     <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped lang="scss">
  .common {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
  }
 .header-box {
   height: 50px;
   display: flex;
   .left {
     @extend .common;
     background-color: beige;
   }
   .center {
     flex: 1;
     @extend .common;
     background-color: wheat;
   }
   .right{
     @extend .common;
     background-color: salmon;
   }

 }
</style>
