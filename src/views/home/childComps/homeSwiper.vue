<template>
  <Swiper v-if="banners.length>1">
    <SwiperItem v-for="(item,index) in banners" :key="index" >
      <a :href="item.link">
        <img :src="item.image" @load="swiperImageLoad">
      <!-- 如果图片加载完成后，则子组件发出事件load给当前组件 -->
      </a>
      <!-- 由于SwiperItem组件中有一个匿名插槽slot，所以a标签里面的内容统一放入这个匿名插槽中 -->
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
  name:"homeSwiper",
  props:{
    banners:{
      type:Array,
      default:()=>[]
    }
   },
   data(){
     return{
       isLoad: false
     }
   },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    swiperImageLoad(){
      if (!this.isLoad){      
        this.$emit('swiperImageLoad')
        this.isLoad = !this.isLoad
      }
      // 这样做的目的是为了让HomeWipper不多次发射事件出来,因为只要有一张图片加载出来后，轮播图的高度就确定了
    }
  }
}
</script>
<style scoped>

</style>