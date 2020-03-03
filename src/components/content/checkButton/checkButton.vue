<template>
  <div class="checkButton" :class="{active:isClick}" >
      <img src="~assets/img/cart/tick.svg" >
  </div>
</template>

<script>
export default {
    name:'checkButton',
    props:{
        isClick:{
            type:Boolean,
            default:true
        }
    },
    methods:{
        // checkBtnClick(){
        //     this.$emit('checkBtnClick')
        // }
    }
}
</script>

<style scoped>
.checkButton{
    border-radius: 50%;
    border:2px solid #aaa;
}
.active{
    border-color: red;
    background: red;

}   
</style>