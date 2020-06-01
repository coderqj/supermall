<template>
  <div id="list">
    <NavBar class="homeNav">
      <div slot="center">商品分类</div>
    </NavBar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>
      <div class="content-right">
        <tabController :title="['综合', '新品', '销量']" 
            class="tabControl"  @titleChange="TitleC" 
            ref="tabControl1" v-show="isShow"></tabController>
        <scroll id="tab-content" ref="scroll"  :probe-type="3" @scroll="contentScroll">
          <div>
            <TabContentCategory :subcategories="showSubcategory" ></TabContentCategory>
            <tabController :title="['综合', '新品', '销量']" 
            class="tabControl2"  @titleChange="TitleC" 
            ref="tabControl"></tabController>
            <TabContentDetail :categoryDetail="showCategoryDetail"></TabContentDetail>
          </div>
        </scroll>
        <backTop v-show="isShowBackTop" @click.native="backClick"></backTop>
      </div>
    </div>
  </div>
</template>

<script>
import scroll from 'components/common/scroll/scroll'
import NavBar from 'components/common/navbar/navBar'
import TabMenu from './childComps/TabMenu'
import TabContentCategory from './childComps/TabContentCategory'
import TabContentDetail from './childComps/TabContentDetail'

import tabController from 'components/content/tabController/tabController'
import backTop from 'components/content/backTop/BackTop'

// import {tabControlMixin} from "common/mixin";
import {POP, SELL, NEW} from "common/const";
import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'

export default {
  name:'list',
  components:{
    NavBar,
    scroll,
    TabMenu,
    TabContentCategory,
    tabController,
    TabContentDetail,
    backTop
  },
  // mixins: [tabControlMixin],
  data(){
    return{
      categories: [],
      categoryData: {
      },
      currentIndex: -1,
      currentType:POP,
      isShow:false,
      tanOffsetTop:0,
      isShowBackTop:true
    }
  },
  computed:{
    showSubcategory(){
      if (this.currentIndex===-1) return{}
      console.log('111111111',this.categoryData[this.currentIndex].subcategories);
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail(){
      if(this.currentIndex===-1)return[]
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  mounted(){

  },
  created() {
  // 1.请求分类数据
  // 刚创建的时候调用请求数据的函数
  this._getCategory()
  },
  methods:{
    _getCategory(){
      getCategory().then(res=>{
        // 先获取分类数据
        this.categories=res.data.category.list
        // 初始化每个类别的子数据
        for(let i=0; i<this.categories.length;i++){
          this.categoryData[i]={
            subcategories:{},
            categoryDetail:{
              'pop':[],
              'new':[],
              'sell':[]
            }
          }
        }
        // 请求第一个分类数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index){
      this.currentIndex=index;
      const mailKey=this.categories[index].maitKey;
      console.log('Obtian_mailKey',mailKey);
      getSubcategory(mailKey).then(res=>{
        this.categoryData[index].subcategories=res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    _getCategoryDetail(type){
      // 获取请求的miniWallKey
      const miniWallkey=this.categories[this.currentIndex].miniWallKey
      const a=123
      console.log('a',a)
      console.log('Obtian_currentIndex',this.categories[this.currentIndex])
      console.log('Obtian_this.miniWallkey',this.categories[this.currentIndex].miniWallkey)
      // console.log('Obtian_miniWallKey',miniWallkey)


      // 发送请求，传入当前的miniWallKey和type
      getCategoryDetail(this.categories[this.currentIndex].miniWallkey,type).then(res=>{
        // 将获取到的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type]=res
        this.categoryData={...this.categoryData}
      })
    },
    selectItem(index){
      // 通过点击这个事件来调取数据
      this._getSubcategories(index)
    },
    TitleC(index){
      switch(index){
        case 0:
          this.currentType=POP;
          break
        case 1:
          this.currentType=NEW;
          break
        case 2:
          this.currentType=SELL;
          break
      };
      // this.$refs.tabControl.currentIndex = value
    },
    contentScroll(position){
      if(position.y <-1000){
        this.isShowBackTop = true
      }else{
        this.isShowBackTop = false
      }
      // 这里决定tabControl是否吸顶
      this.isShow = (-position.y) > 1180
          },
    backClick(){
      // 通过this.$refs.scroll去访问scroll组件,然后后面接的.scroll是这个组件对象中的数据scroll,scrollTo函数是回到顶部的函数 scrollTo(位置x，位置y，回到顶部时间(ms))
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      // 或者通过封装的思想,如下 
      this.$refs.scroll.scrollTo(0,0,500)
    },
    // imgload(){
    //   this.tanOffsetTop = this.$refs.tabControl.$el.offsetTop
    //   console.log('tranOffsetTop',this.tanOffsetTop)
    // }
  }
}
</script>

<style>
#list{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.homeNav{
  background-color:var(--color-tint);
  color: white;
}
.content{
  overflow: hidden;
  position:absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
  display: flex;
}
#tab-content{
  height: 100%;
  /* flex: 1; */
}
.tabControl{
  position: relative;
  /* top:44px; */
  z-index: 9999;
  /* flex: 1; */
}
.content-right{
  flex: 1;
}
</style>