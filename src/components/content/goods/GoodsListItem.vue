<template>
  <div class="goods-item" @click="imageClick">
    <!-- img中通过@load监听图片是否加载，一旦加载完成触发imageLoad函数 -->
    <img :src="goodsListItem.show.img" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsListItem.title}}</p>
      <span class="price">{{goodsListItem.price}}</span>
      <span class="collect">{{goodsListItem.cfav}}</span>

    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsListItem:{
      type:Object,
      default:()=>{}
    }
  },
  methods:{
    imageLoad(){
      // 事件发射总线，将监听到的图片加载完成这个事件发射出去
      this.$bus.$emit('itemImageLoad')
    },
    imageClick(){
      console.log( '跳转到详情页'),
       this.$router.push('/detail/' + this.goodsListItem.iid)
    }
  }
}

// 原生的js监听图片：img.onload=function(){} vue中使用@load
</script>

<style scoped>
/* CSS中的子绝父相，如果要对一个子元素使用定位，那么应该是子元素是绝对定位，它的父元素是相对定位，让子元素以其父元素为标准来定位 */
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%
  }
  .goods-item img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    /* 绝对定位 */
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    /* 给一个元素中设置overflow：hidden ，那么该元素的内容若超出了给定的宽度和高度属性，那么超出的部分将会被隐藏 */
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* 文本不会换行，文本会在同一行上继续，直到遇到<br>标签 */
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }
  /* ::before用于在css渲染中向元素逻辑上的头部或尾部添加内容 */
  .goods-info .collect::before {
    /* ::before必须配合content使用，content用来定义插入的东西，必须要有值，至少要为空 */
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>