<template>
  <div class="recomends">
    <div v-for="(item,index) in recommends" class="recommends-item" :key="index">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'homeRecommends',
  props:{
    recommends:{
      type:Array,
      default: ()=>[]
    }
  }
}
</script>

<style>
.recomends{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 15px;
  padding: 15px 0 30px;
  border-bottom: 8px dashed #eee 
}
.recommends-item{
  flex: 1
}
.recommends-item img{
  width: 65px;
  height: 65px;
  margin-bottom: 12px
}
</style>