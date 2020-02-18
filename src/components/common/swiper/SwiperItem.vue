<template>
    <div class="slide">
      <slot></slot>
    </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
/* 设置了固定宽高的图片被压缩
通常实现如下的效果，是把外层容器设置为display:flex，容器中图片设置固定宽高度，右边元素设置为flex:1，但当右边元素宽度超出剩余空间的时候，图片会被挤压，变成椭圆形。
这是因为在flex容器中，当空间不够的时候，flex-shrink不为0的元素会被压缩，所以解决的方法就是给图片设置：flex-shrink:0。 */
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>
