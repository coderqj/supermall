<template>
    <Swiper class="swiperItem" v-if="topImages.length>1">
      <SwiperItem v-for="item in topImages">
        <img :src="item">
      </SwiperItem>
    </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  name:"detailSwipper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default:()=>[]
    }
  }
}
</script>

<style scoped>
.swiperItem{
  overflow: hidden; 
  height: 300px;
}
</style>