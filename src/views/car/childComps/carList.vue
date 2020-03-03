<template>
  <div class="carList">
      <scroll class="content" ref="scroll">
          <div>
            <carListItem v-for="(item,index) in list" :key="index" :itemInfo="item"></carListItem>
          </div>
      </scroll>
  </div>
</template>

<script>
import scroll from 'components/common/scroll/scroll'
import carListItem from './carListItem'
import { mapGetters } from 'vuex'


export default {
    name:'carList',
    components:{
        scroll,
        carListItem
    },
    computed:{
        ...mapGetters({
      // vue实例中计算属性名:vuex的store对象中的getters属性的方法名
            list:'carList'
    })
    },
    // 因为每次进来的时候scroll的高度发生了变化,所以要每次进入购物车的时候(路由活跃)的时候进行刷新
    activated(){
        console.log('[[[[[[[')
        this.$refs.scroll.refresh()
    }
}
</script>

<style>
.carList{
    height: calc(100%-133px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>