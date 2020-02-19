<template>
  <div id="home">
    <NavBar class="homeNav">
      <div slot="center">购物街</div>
    </NavBar>
    <homeSwiper :banners=banner></homeSwiper>
    <homeRecommends :recommends=recommend></homeRecommends>
    <homeFeatureView/>
    <tabController :title="['流行','新款','精选']" class="tabControl"></tabController>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/navBar'
import homeSwiper from './childComps/homeSwiper'
import homeRecommends from './childComps/homeRecommends'
import homeFeatureView from './childComps/homeFeatureView'
import tabController from 'components/content/tabController/tabController'
import {getHomeMultidata} from 'network/home'

export default {
  name:'home',
  components:{
    NavBar,
    homeSwiper,
    homeRecommends,
    homeFeatureView,
    tabController
  },
  data(){
    return{
      result:null,
      banner:[],
      recommend:[]
    }
  },  // 组件一旦创建成功立马发送网络请求
  created(){
// 1、请求多个数据(且这个操作是一个异步操作)
    getHomeMultidata().then(res=>{
      console.log(res);
      this.result = res;
      this.banner = res.data.banner.list;
      this.recommend = res.data.recommend.list
      console.log('banner',this.banner);
      console.log('recommend',this.recommend);


    })
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px
}
.homeNav{
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top:0;
  z-index: 9;
}
.tabControl{
  position: sticky;
  top:44px
}
</style>