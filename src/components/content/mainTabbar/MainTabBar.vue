<template>
  <TabBar>
    <TabBarItem path="/home" activeColor="red" >
      <img src="~assets/img/tar-bar/view.png" slot="icon-image"></img>
      <img src="~assets/img/tar-bar/view (1).png" slot="icon-image-active"></img>
      <div slot="icon-text">首页</div>
    </TabBarItem>
    <TabBarItem path="/list" activeColor="red">
      <img src="~assets/img/tar-bar/list.png" slot="icon-image"></img>
      <img src="~assets/img/tar-bar/list (1).png" slot="icon-image-active"></img>

      <div slot="icon-text">分类</div>
    </TabBarItem>
    <TabBarItem path="/car" activeColor="red">
      <img src="~assets/img/tar-bar/shopcar.png" slot="icon-image"></img>
      <img src="~assets/img/tar-bar/shopcar (1).png" slot="icon-image-active"></img>

      <div slot="icon-text">购物车</div>
    </TabBarItem>
    <TabBarItem path="/user" activeColor="red">
      <img src="~assets/img/tar-bar/user.png" slot="icon-image"></img>
      <img src="~assets/img/tar-bar/user (1).png" slot="icon-image-active"></img>
      <div slot="icon-text">我的</div>
    </TabBarItem>
  </TabBar>
</template>

<script>
  import TabBar from 'components/common/tabbar/tarBar'
  import TabBarItem from 'components/common/tabbar/tarBarItem'

  export default {
    name: "MainTabBar",
    components: {
      TabBar, 
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
