<template>
  <div class="toast" v-show="isShow">
      <div >
          {{message}} 
      </div>
  </div>
</template>

<script>
export default {
    name:'toast',
    props:{
        message:{
            type:String,
            default:''
        },
        isShow:{
            type:Boolean,
            default:false
        }
    }

}
</script>

<style scoped>
.toast{
    position:fixed;
    top: 50%;
    left: 50%;
    color:#fff;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    background-color: rgba(0,0,0,.75)
}

</style>