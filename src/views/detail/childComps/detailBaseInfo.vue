<template>
<!-- 原生js给我们提供了一个很好的方法：Object.keys()，该方法返回一个数组,其中这个数组的内容就是这个对象的所有键值 -->
    <!-- Object.keys(goods).length !== 0 这句话的目的是判断对象名为goods的对象是否为空，是否里面的key都为空 -->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title" @click="buttonCLick">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <!-- goods.services[goods.services.length-1].name返回的是services数组中最后的元素 -->
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img v-lazy="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailBaseInfo",
    props: {
		  goods: {
        type: Object,
        default(){
        }
      }
    },
    methods:{
      buttonCLick(){
        console.log('obj.goods',Object.keys(this.goods));
        console.log('goods',this.goods);     
        console.log('obj.goods.length',Object.keys(this.goods).length);


      }
    }
	}
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    color: #222
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .info-price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .info-price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;

    /*璁╁厓绱犱笂娴竴浜? 浣跨敤鐩稿瀹氫綅鍗冲彲*/
    position: relative;
    top: -8px;
  }

  .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 13px;
    color: #333;
  }
</style>
