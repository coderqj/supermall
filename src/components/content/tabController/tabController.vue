<template>
  <div class="tabContr"> 
    <div v-for="(item,index) in title" class="tabContrItem" :class="{active : currentIndex === index}" @click="btnClick(index)" :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'tabController',
  data(){
    return{
      currentIndex:0
    }
  },
  props:{
    title:{
      type:Array,
      default:()=>[]
    }
  },
  methods:{
    btnClick(index){
      this.currentIndex = index;
      this.$emit('titleChange',this.currentIndex)
      //点击后，将事件发送出去，发送的是titleeChange
    }
  }
}
</script>

<style>
.tabContr{
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: white
}
.tabContrItem {
  flex: auto;
}
.tabContrItem span {
  padding: 5px;
}
.active{
  color: var(--color-high-text)
}
.active span{
  border-bottom: 3px solid var(--color-tint);
}
</style>