<template>
  <div class="nav-bar">
    <!-- 给插槽slot外面包一个div，这样当slot被修改的时候布局就不会乱 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name:'navBar'
}
</script>

<style scoped>
/* flex布局 柔性布局 */
  .nav-bar{
    display: flex;
    height: 44px; 
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 2);
  }
  .left,.right{
    width: 60px;
    /* background-color:red */
  }
  /* 左边右边各60px像素宽 */
  .center{
    flex: 1;
    /* background-color:red */
  }
  /* 中间部分将剩余的位置进行占据、 */
</style>>
