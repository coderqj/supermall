<template>
  <!-- <div>详情页{{iid}}</div>-->
  <div id="detail">
    <!-- <h2>11111</h2> -->
    <detailNavbar class="detaiNavbar"/>
    <scroll class="content" ref="scroll">
      <div>
        <detailSwipper :topImages = topImages></detailSwipper>
        <detailBaseInfo :goods="goods"></detailBaseInfo>
        <detailShop :shop="shop"></detailShop>
        <detailGoodsInfo :dataInfo="dataInfo" @imageLoad="imageLoad"></detailGoodsInfo>
        <detailParamInfo :goodsParam="goodsParam"></detailParamInfo>
        <detailComments :comments="comments"></detailComments>
        <goodsList :goods="recommend"></goodsList>
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
      recommend:[]
    }
  },
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

    })
  },
  methods:{
   imageLoad(){
     this.$refs.scroll.refresh()
   }
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