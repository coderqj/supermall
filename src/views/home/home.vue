<template>
  <div id="home">
    <NavBar class="homeNav">
      <div slot="center">购物街</div>
    </NavBar>
    <scroll class="content" ref="scroll" 
      :probe-type="3" :pull-up-load=true 
      @scroll="contentScroll" @pullingUp="loadMore">
      <homeSwiper :banners=banner></homeSwiper>
      <homeRecommends :recommends=recommend></homeRecommends>
      <homeFeatureView/>
      <tabController :title="['流行','新款','精选']" class="tabControl" @titleChange="TitleC"></tabController>
      <!-- <ul><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li></ul> -->
      <GoodsList :goods="goods[currentTitle].list">></GoodsList>
    </scroll>
    <!-- 当我们要监听一个原生事件，必须给对应事件加上一个修饰符.native -->
    <backTop v-show="isShowBackTop" @click.native="backClick"></backTop>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/navBar'
import homeSwiper from './childComps/homeSwiper'
import homeRecommends from './childComps/homeRecommends'
import homeFeatureView from './childComps/homeFeatureView'
import tabController from 'components/content/tabController/tabController'
import GoodsList from 'components/content/goods/GoodsList'
import scroll from 'components/common/scroll/scroll'
import backTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'

export default {
  name:'home',
  components:{
    NavBar,
    homeSwiper,
    homeRecommends,
    homeFeatureView,
    tabController,
    GoodsList,
    scroll,
    backTop
  },
  data(){
    return{
      isShowBackTop:false,
      result:null,
      banner:[],
      recommend:[],
      currentTitle:'pop',
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
// goods是对象，'pop'是key，后面的{page,list是value}
      }
    }
  },  // 组件一旦创建成功立马发送网络请求
  created(){
// 1、请求多个数据(且这个操作是一个异步操作)
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods:{
    getHomeMultidata(){   
      getHomeMultidata().then(res=>{
      console.log(res);
      this.result = res;
      this.banner = res.data.banner.list;
      this.recommend = res.data.recommend.list
      console.log('banner',this.banner);
      console.log('recommend',this.recommend);
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page +1;
      getHomeGoods(type,page).then(res=>{
      console.log('------请求回来的商品数据',res)
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page = this.goods[type].page +1
      this.$refs.scroll.finishPullUp()   

    })
    },
    TitleC(value){
      switch(value){
        case 0:
          this.currentTitle='pop';
          break
        case 1:
          this.currentTitle='new';
          break
        case 2:
          this.currentTitle='sell';
          break
      }
    },
    backClick(){
      // 通过this.$refs.scroll去访问scroll组件,然后后面接的.scroll是这个组件对象中的数据scroll,scrollTo函数是回到顶部的函数 scrollTo(位置x，位置y，回到顶部时间(ms))
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      // 或者通过封装的思想,如下 
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      if(position.y <-1000){
        this.isShowBackTop = true
      }else{
        this.isShowBackTop = false

      }
    },
    loadMore(){
      this.getHomeGoods(this.currentTitle)
      console('---上拉加载更多')
      // 图片加载完后，要手动刷新一下
      this.$refs.scroll.scroll.refresh()
    }
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
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
  top:44px;
  z-index: 9;
}
.content{
  overflow: hidden;
  position:absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0
}
</style>