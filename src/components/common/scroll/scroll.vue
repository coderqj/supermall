<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
     <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'scroll',
  data(){
    return {
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    // 1.创建BSCroll
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    // 2.实时监听位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)
    })
    // 3.监听上拉加载更新
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')

    })
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style>

</style>