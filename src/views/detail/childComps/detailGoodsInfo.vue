<template>
  <div v-if="Object.keys(dataInfo).length!==0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{dataInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{dataInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in dataInfo.detailImage[0].list" :key="index"
           :src="item" @load="imgload" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name:'detailGoodsInfo',
  props:{
    dataInfo:{
      type:Object,
      // default: ()=>{}
    }
  },
  data(){
    return{
      counter:0,
      imageLength:0
    }
  },
  methods:{
    // 每一次加载完一张图片后counter计数器会加1，当计数器加到等于图片长度的时候，就会将图片加载完成的命令发射出去
    imgload(){
      // 等到所有图片都加载完毕后才会出发发射函数
      if(++this.counter===this.imageLength){
        this.$emit('imageLoad')
      }
    }
  },
  watch:{
    // 监听函数，一旦监听到props里面的dataInfo有数据改变，就触发watch函数，这样就改变imageLength
    dataInfo(){
      this.imageLength = this.dataInfo.detailImage[0].list.length
      console.log('this.imageLength',this.imageLength)
    }
  }
}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px dashed #f2f5f8;
  }

  .info-desc {
    /* 调整左右边框的间距 */
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    /* 元素向左浮动 */
    float: left;
  }

  .info-desc .end {
    /* 元素向右浮动 */
    float: right;
  } 

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
