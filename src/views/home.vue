<template>
  <div id="home">
    <NavBar class="homeNav">
      <div slot="center">购物街</div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/navBar'
import {getHomeMultidata} from 'network/home'
export default {
  name:'home',
  components:{
    NavBar
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
      this.banner = res.banner.list;
      this.recommend = res.recommend.list
    })
  }
}
</script>

<style>
.homeNav{
  background-color: var(--color-tint);
  color: white
}
</style>