<template>
  <div>
    <navBar>
        <div slot="left" @click="backClick" class="back">
          <img src="~assets/img/common/back.svg">
        </div>
        <div slot="center" class="Bar">
          <div v-for="(item,index) in titles" @click="titleClick(index)"
          class="BarItem" :class="{active: currentIndex===index}">{{item}}</div>
        </div>
    </navBar>
  </div>
</template>

<script>
import navBar from 'components/common/navbar/navBar'

export default {
  name:'detailNavbar',
  components:{
    navBar
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
     backClick(){
      // this.$router.push('/home')
      // 返回上一级
      this.$router.back()
    },
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',this.currentIndex)
    }
  }
}
</script>

<style>
.Bar{
  display: flex;
}
.BarItem{
  flex: 1
}
.active{
  color: var(--color-high-text)
}
.back img{
  margin-top: 12px
}
</style>