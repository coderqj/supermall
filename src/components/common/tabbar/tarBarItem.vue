<template>
  <div class="tar-bar-item" @click="viewButton">
    <div v-if="isactive">
      <slot name="icon-image-active">图标</slot>
      </div>
    <div v-else>
      <slot name="icon-image">图标</slot>
      </div>
    <div :style="activrStyle"  >
      <slot name="icon-text">文本</slot>
    </div>  
  </div>
</template>

<script>
export default {
  name:'tarBarItem',
  data(){
    return{
      
    }
  },
  props:{
    path:String,
    activeColor:String
  },
  computed:{
    isactive(){
      return this.$route.path.indexOf(this.path) !==-1
    },
    activrStyle(){
      return this.isactive ? {color: this.activeColor} : {}
    }
  },
  methods:{
    viewButton(){
      this.$router.push(this.path)
      console.log('111', this.isactive)
    }
  }
}
</script>

<style>
.tar-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 15px;
  font-weight:bolder
}
.tar-bar-item img{
  height: 24px;
  width: 24px;
  align-self: center;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px
  }
</style>