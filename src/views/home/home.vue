<template>
  <div id="home">
    <NavBar class="homeNav">
      <div slot="center">购物街</div>
    </NavBar>
    <!-- 这个tabController初始状态不会出现，只有v-show为true的时候才会出现，即出现吸顶 -->
     <tabController :title="['流行','新款','精选']" 
      class="tabControl"  @titleChange="TitleC" 
      ref="tabControl1" v-show="isTabShow"></tabController>
      <!-- 在父组件中的子标签中监听该自定义事件并添加一个响应该事件TitleC的处理方法 -->
      <!-- 当往下滑到到一定的程度显示 -->
      <!-- ref 加在子组件上，用this.ref.name 获取到的是组件实例，可以使用组件的所有方法 -->
    <scroll class="content" ref="scroll" 
      :probe-type="3" :pull-up-load=true 
      @scroll="contentScroll" @pullingUp="loadMore">
      <!-- 一旦滑动scroll组件就给父组件发送@scroll命令，传回position，再父组件中执行contentScroll函数 -->
      <!-- 一旦上拉加载更新，scroll组件就给父组件发送@pullingUp组件，父组件接到命令后就去完成数据更新 -->
      <div>
        <homeSwiper :banners=banner @swiperImageLoad='swiperImageLoad'></homeSwiper>
        <homeRecommends :recommends=recommend></homeRecommends>
        <homeFeatureView/>
        <tabController :title="['流行','新款','精选']" 
        @titleChange="TitleC" ref="tabControl2"></tabController>
        <!-- 当点击tabController中的元素，返回一个索引并赋值给currentTitle，此时GoodsList中的:goods的值会发生变化 -->
        <GoodsList :goods="goods[currentTitle].list">></GoodsList>
      </div>
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
import {debounce} from 'common/util'
import {itemListenerMixin} from 'common/mixin'
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
  mixins:[itemListenerMixin],
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
      },
      tanOffsetTop: 0,
      isTabFixed: false,
      isTabShow:false,
      saveY:0,
    }
  },
  // 该路由处于活跃的时候  
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    // 活跃的时候回到最开始离开的位置
    this.$refs.scroll.refresh()
  },
  // 该路由处于失活的时候(即当跳转出该路由的时候)
  deactivated(){
    // 失活的时候保留最后离开的位置
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消全局事件的监听，也就是说当这个路由失活的取消事件监听
    this.$bus.$off('itemImageLoad',this.itemImageListener)

  },
  // 组件一旦创建成功立马发送网络请求
  created(){
// 1、请求多个数据(且这个操作是一个异步操作)
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted(){
    // 3.home组件一旦创建出来后就要开始监听图片加载完成
  // 因为要实时监听图片是否加载成功，如果放到created()中可能scroll组件还没创建出来，就调用了
  // refresh函数，所以可能会调用失败，所以要把监听方法放到mounted中，这样就可以等组件都挂载成功了再实施监听
    // this.$bus.$on('itemImageLoad',()=>{
    //   this.$refs.scroll.refresh()
    // })
    // 对于refre刷新频繁，需要用到防抖函数，因为不使用防抖函数的话，上面的refresh要执行30次对服务器请求压力过大
      // 通过debounce防抖函数可以将refresh函数传入到debounce中，生成一个新的函数,之后在调用非常频繁的时候，就是用新生成的函数，如果下一次执行来的非常快就会取消掉上一次
      // const refresh = debounce(this.$refs.scroll.refresh,500)
      // this.itemImageListener = ()=>{
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad',this.itemImageListener)
      // 以上代码不需要写上，因为在minxin中写了，vue组件只需要混入即可
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
      };
      this.$refs.tabControl1.currentIndex = value
      this.$refs.tabControl2.currentIndex = value
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
      // 这里决定tabControl是否吸顶
      this.isTabShow = (-position.y) > this.tanOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentTitle)
      console.log('---上拉加载更多')
      // 图片加载完后，要手动刷新一下
      // this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad(){
      // 3.创建tabControl的offsetTop
      // 所有的组件都有一个属性$el,用于获取组件中的元素
      // 创建tanOffsetTop是为了监听当滚动到多少时，才开始有吸顶的效果，这个时候就需要获取tabControl组件的offsetTop
      // 但是，如果直接在mounted中获取的话，这样的值可能是不正确的，因为这个时候轮播图组件的图片还未加载出来，所以此时获取到的高度不准
        // 所以这个时候我们要去homeSwiper组件中监听图片是否加载完成，当加载完成的时候我们就发出一个事件，这个时候我们再给tanOffsetTop赋值
      this.tanOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log('1111',this.$refs.tabControl2.$el.offsetTop)
    }
  }
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.homeNav{
  background-color: var(--color-tint);
  color: white;
  /* 下面这种固定，是在浏览器滚动的时候为了固定在最上面才实行，但是使用了 */
   /* position: fixed; */
  /* left: 0;
  right: 0;
  top:0; */
  /*z-index: 9; */
}
.tabControl{
  position: relative;
  z-index: 9;
}
.fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px
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