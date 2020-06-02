<template>
    <div>
        <GridView :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
          <div class="item" v-for="(item,index) in subcategories.list" :key="index">
              <a :href="item.link">
                <img :src="item.image" alt="" class="item-img" @load="ImageLoad">
                <div class="item-text">{{item.title}}</div>
              </a>
          </div>
        </GridView>
    </div>
</template>
<script>
  import GridView from 'components/common/gridView/GridView'

export default {
    name:"TabContentCategory",
    components:{
      GridView
    },
    props:{
      subcategories:{
        type:Object,
        default(){
          return[]
        }
      }
    },
    data(){
      return{
        isLoad: false

      }
    },
    methods:{
      ImageLoad(){
        if (!this.isLoad){      
          this.$emit('ImageLoad')
          this.isLoad = !this.isLoad
        }
        // 这样做的目的是为了让HomeWipper不多次发射事件出来,因为只要有一张图片加载出来后，轮播图的高度就确定了
      }
    }
  }
</script>
<style scoped>
  .item{
    text-align: center;
    font-size: 12px;
  }
  .item-img{
    width: 80%;
  }
  .item-text{
    margin-top: 15px;
  }
</style>