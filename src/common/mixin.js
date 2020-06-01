// 这里放的是混入代码,有点类似于java中的继承，这里的代码在vue组件中一旦注册了，
// 那么相当于vue实例中继承了这里面的代码，添加了这里面的代码
import {POP, NEW, SELL} from "./const";

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
    // this.$bus.$emit是子组件发送数据，this.$bus.$on是子组件接收数据
    this.$bus.$on('itemImageLoad',this.itemImageListener)
  },
}

import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin={
  data(){
    return {
      isShowBackTop:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0,0,300)
    },
    listenBackTop(posiotion){
      this.isShowBackTop = -posiotion.y >1000
    }
  }
}

// export const tabControlMixin = {
//   data: function () {
//     return {
//       currentType: POP
//     }
//   },
//   methods: {
//     tabClick(index) {
//       switch (index) {
//         case 0:
//           this.currentType = POP
//           break
//         case 1:
//           this.currentType = NEW
//           break
//         case 2:
//           this.currentType = SELL
//           break
//       }
//       console.log('aaaaa',this.currentType);
//     }
//   }
// }