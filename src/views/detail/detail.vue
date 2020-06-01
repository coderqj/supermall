<template>
  <!-- <div>详情页{{iid}}</div>-->
  <div id="detail">
    <!-- <h2>11111</h2> -->
    <detailNavbar class="detaiNavbar" @titleClick='titleClick' ref="detaiNavbar"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <div>
        <!-- <ul>><li v-for="(item,index) in $store.state.cartList" :key="index">{{item}}</li></ul> -->
        <detailSwipper :topImages = topImages></detailSwipper>
        <detailBaseInfo :goods="goods"></detailBaseInfo>
        <detailShop :shop="shop"></detailShop>
        <detailGoodsInfo :dataInfo="dataInfo" @imageLoad="imageLoad"></detailGoodsInfo>
        <detailParamInfo :goodsParam="goodsParam" ref="ParamInfo"></detailParamInfo>
        <detailComments :comments="comments" ref="Comments"></detailComments>
        <goodsList :goods="recommend" ref="Recommend"></goodsList>
      </div>
    </scroll>
    <detailBottom @addCart="addToCart"></detailBottom>
    <BackTop v-show="isShowBackTop"  @click.native="backTop"/>
    <toast :message="message" :isShow="isShow"/>
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
import detailBottom from 'views/detail/childComps/detailBottom'
import goodsList from 'components/content/goods/GoodsList'
import scroll from 'components/common/scroll/scroll'
import toast from 'components/common/toast/toast'
import {getDetail, Goods ,shop , GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/util'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import { mapActions } from 'vuex'

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
    goodsList,
    detailBottom,
    toast
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
      imageThemeY:null,
      message:'',
      isShow: false
    }
  },
  mixins:[itemListenerMixin,backTopMixin],
  created(){
    // 1、保存传进来的iid
    //        this.$router.push('/detail/' + this.goodsListItem.iid) 因为在goods组件中点击商品进来的时候是传进来了iid的，所以这个时候要将传进来的iid赋值给该组件的iid
    this.iid = this.$route.params.iid
    console.log('传进来的参数是',this.$route.params)
    // 2、根据传进来的iid去请求数据
    // 前缀http//+/api/hy/detail?this.iid
    getDetail(this.iid).then(res=>{
      console.log('res_id',res);
      const data = res;
      console.log('data_content',data);
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
    // 不能再created中调用，压根获取不到元素
    // mounted中也不行，数据还没有找到
    // 获取到数据里面也不行，这个歌时候DOM还没有渲染
     this.imageThemeY()
   },
   titleClick(value){
     console.log('11111111111',value)
     this.$refs.scroll.scrollTo(0,-this.imageOffsetTop[value],300)
   },
    contentScroll(position){
      let value = -position.y
      console.log('position',value)
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
      };
      this.listenBackTop(position)
   },
   ...mapActions({
    // vue实例中计算属性名:vuex的store对象中的getters属性的方法名
    addCart:'addCart'
   }),
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product={};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.oldPrice.substr(1);
      product.iid = this.iid;
      console.log('product.iid',product.iid);
      // 执行vuex中的acctionsn中的操作,如果操作成功返回resolve后的then操作
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res)
      // })
      this.addCart(product).then(res=>{
        console.log('message',res);
        
        // this.$toast.toastShow(res,2000)
        this.message = res,
        this.isShow = true,
        setTimeout(()=>{
          this.isShow=false;
          this.message=''
        },4000)
        // toast弹窗一会消失
      })
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
.backTop{
  /* position:relative; */
  z-index: 20;
}
</style>