// 这里放的是混入代码,有点类似于java中的继承，这里的代码在vue组件中一旦注册了，
// 那么相当于vue实例中继承了这里面的代码，添加了这里面的代码
import {debounce} from 'common/util'
export const itemListenerMixin={
  data(){
    return{
      itemImageListener:null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,500)
    this.itemImageListener = ()=>{
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImageListener)
  },
}