<template>
  <Swiper>
    <SwiperItem v-for="item in banners">
      <a :href="item.link">
      <img :src="item.image">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
  name:"childCom",
  props:{
    banners:{
      type:Array,
      default:()=>[]
    }
   },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>
<style>

</style>