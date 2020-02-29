<template>
  <!-- <div>详情页{{iid}}</div>-->
  <div id="detail">
    <!-- <h2>11111</h2> -->
    <detailNavbar class="detaiNavbar" @titleClick='titleClick' ref="detaiNavbar"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <div>
        <detailSwipper :topImages = topImages></detailSwipper>
        <detailBaseInfo :goods="goods"></detailBaseInfo>
        <detailShop :shop="shop"></detailShop>
        <detailGoodsInfo :dataInfo="dataInfo" @imageLoad="imageLoad"></detailGoodsInfo>
        <detailParamInfo :goodsParam="goodsParam" ref="ParamInfo"></detailParamInfo>
        <detailComments :comments="comments" ref="Comments"></detailComments>
        <goodsList :goods="recommend" ref="Recommend"></goodsList>
      </div>
    </scroll>
  </div>
</template>

<script>
import detailNavbar from 'views/detail/childComps/detailNavbar'
import detailSwipper from 'views/detail/childComps/detailSwipper'
import detailBaseInfo from 'views/detail/childComps/detailBaseInfo'
import detailShop from 'views/detail/childComps/detailShop'
import detailGoodsInfo from 'views/detail/childComps/detailGoodsInfo'
import detailParamInfo from 'views/detail/childComps/detailParamInfo'
import detailComments from 'views/detail/childComps/detailComments'
import goodsList from 'components/content/goods/GoodsList'
import scroll from 'components/common/scroll/scroll'
import {getDetail, Goods ,shop , GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/util'
import {itemListenerMixin} from 'common/mixin'

export default {
  name:"detail",
  components:{
    detailNavbar,
    detailSwipper,
    detailBaseInfo,
    detailShop,
    scroll,
    detailGoodsInfo,
    detailParamInfo,
    detailComments,
    goodsList
  },
  data(){
    return {
      iid: null,
      topImages:[],
      goods:{},
      shop:{},
      dataInfo:{},
      goodsParam:{},
      comments:{},
      recommend:[],
      imageOffsetTop:[],
      imageThemeY:null
    }
  },
  mixins:[itemListenerMixin],
  created(){
    // 1、保存传进来的iid
    this.iid = this.$route.params.iid
    // console.log('传进来的参数是',this.$route.params)
    // 2、根据传进来的iid去请求数据
    getDetail(this.iid).then(res=>{
      console.log('res',res);
      const data = res;
      this.topImages = res.result.itemInfo.topImages;
      // 3、获取商品信息
      this.goods= new Goods (data.result.itemInfo,data.result.columns,data.result.shopInfo.services)
      console.log('goods',this.goods)

      // 4、创建店铺信息对象
      this.shop = new shop (data.result.shopInfo)
      // 5、获取商品详细信息
      this.dataInfo = data.result.detailInfo
      console.log('this.dataInfo',this.dataInfo)
      // 6、获取商品参数信息
      this.goodsParam = new GoodsParam(data.result.itemParams.info,data.result.itemParams.rule)
      //7、评论信息
      if(data.result.rate.cRate !==0){
        this.comments =data.result.rate.list[0]
      }
    })
    // 请求推荐数据
    getRecommend().then(res=>{
      console.log('res.data.list 类型',typeof(res.data.list))
      this.recommend = res.data.list
      console.log('this.recommend',this.recommend)
    }),
    //定义imageThemeY函数，通过防抖函数减少调用次数
    this.imageThemeY= debounce(()=>{
      this.imageOffsetTop.push(0),
      this.imageOffsetTop.push(this.$refs.ParamInfo.$el.offsetTop)
      this.imageOffsetTop.push(this.$refs.Comments.$el.offsetTop)
      this.imageOffsetTop.push(this.$refs.Recommend.$el.offsetTop)
    },500)
  },
  methods:{
   imageLoad(){
     this.$refs.scroll.refresh();
    //  等到图片加载完成后再调用获取各个组件高度的函数
     this.imageThemeY()
   },
   titleClick(value){
     console.log('11111111111',value)
     this.$refs.scroll.scrollTo(0,-this.imageOffsetTop[value],300)
   },
    contentScroll(position){
      let value = -position.y
      console.log('34324234234',value)
      // if (value < this.imageOffsetTop[1]){
      //   this.$refs.detaiNavbar.currentIndex = 0
      // } else if (value >= this.imageOffsetTop[1] && value < this.imageOffsetTop[2]){
      //   this.$refs.detaiNavbar.currentIndex = 1
      // }else if (value >= this.imageOffsetTop[2] && value < this.imageOffsetTop[3]){
      //   this.$refs.detaiNavbar.currentIndex = 2
      // }else{
      //   this.$refs.detaiNavbar.currentIndex = 3
      // }
      // 上面这种写法不通用
      let currentIndex = 0;
      const length = this.imageOffsetTop.length
      for(let i =0;i<length;i++){
        if(currentIndex !==i &&((i< length-1 &&  value >= this.imageOffsetTop[i]
          && value < this.imageOffsetTop[i+1])||(i===length-1 &&value>=this.imageOffsetTop[i])))
          {
            currentIndex = i;
            this.$refs.detaiNavbar.currentIndex = currentIndex

          }
      }
  }
  },
  mounted(){
    // const refresh = debounce(this.$refs.scroll.refresh,500)
    // this.itemImageListener = ()=>{
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoad',this.itemImageListener)
    // 这里同home.vue中一样处理
  },
  // 这里不能使用deactived因为keep-alive将detail排除在外了
  destroyed(){
    this.$bus.$off('itemImageLoad',this.itemImageListener)
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  /* z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。 */
  z-index: 9;
  background-color: white;
  height:100vh;
}
.detaiNavbar{
  position:relative;
  z-index: 9;
  background-color:white;
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