<template>
  <div class="Goods">
    <GoodsListItem v-for="(item,index) in goods" :goodsListItem="item"  :key="index"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name:'GoodsList',
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return[]
      }
    }
  }
}
</script>

<style>
  .Goods{
    /* 弹性盒模型，让下面元素水平放置 */
    display: flex;
    /* flex-wrap换行属性，换行，第一行在上方    wrap规定灵活的项目在必要的时候拆行或拆列。*/
    flex-wrap: wrap;
    /* 每个项目两侧的间隔相等，即项目之间的间隔比项目与边框的间隔大一倍 */
    justify-content: space-around;
    padding: 2px
  }
</style>