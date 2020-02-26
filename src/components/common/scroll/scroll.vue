<template>
  <div class="wrapper" ref="wrapper">
    <!-- <div class="content"> -->
     <slot></slot>
    <!-- </div> -->
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
      this.scroll && this.scrollTo && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      console.log('-----刷新')
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      // scroll是否有值， 有的话返回this.scroll.y 否则的话返回0
      return this.scroll ? this.scroll.y : 0
    }
  }
}
//  Better-Scroll在决定有多少区域可以滚动的时候，是根据scroll的Height属性决定的
  // scrollHeight属性是根据放在Better-Scroll的content中的子组件的高度
  // 但是我们的首页中，刚开始在计算scrollerHeight属性时，是没有将图片计算在内的
  // 所以，一开始计算出来的高度是错误的
  // 后来图片加载进来之后有了新的高度，但是scrollerHeight属性并没有进行更新
  // 所以滚动出现了问题
  // 如何解决这个问题？
  // 监听每一张图片是否加载完成米之遥有一张图片加载完成了，执行一次refresh（）
</script>
<style>

</style>