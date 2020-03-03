<template>
  <Swiper v-if="banners.length>1">
    <SwiperItem v-for="(item,index) in banners" :key="index" >
      <a :href="item.link">
      <img :src="item.image" @load="swiperImageLoad">
      </a>
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