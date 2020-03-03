<template>
  <div class="car">
  <NavBar class="navBar">
    <div slot="center">购物车({{length}})</div>  
  </NavBar>    
    <carList class="carList"/>
    <carBottomBar class="carBottomBar"/>
  </div> 
</template>

<script>
import NavBar from 'components/common/navbar/navBar'
import carList from 'views/car/childComps/carList'
import carBottomBar from 'views/car/childComps/carBottomBar'
import { mapGetters } from 'vuex'
export default {
  name:'car',
  components:{
    NavBar,
    carList,
    carBottomBar
  },
  computed:{
    // 通过mapGetters将vuex的store中的getters属性与vue实例中的computed属性关联,使得vue实例中可以直接使用store中的getters属性中的方法
    ...mapGetters({
      // vue实例中计算属性名:vuex的store对象中的getters属性的方法名
      length:'cartLength'
    })
  }
}
</script>

<style>
.car{
  position: relative;
  height: 100vh;
}
.navBar{
  background: var( --color-tint);
  color: white;
  font-weight: 400
}
.carList{
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
}

</style>