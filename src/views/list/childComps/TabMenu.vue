<template>
<!-- 实现靠右边的菜单栏 -->
    <scroll id="tab-menu">
        <div class="menu-list">
            <div class="menu-list-item"
                :class="{active: index===currentIndex}"
                v-for="(item,index) in categories" :key="index"
                @click="itemClick(index)"                
                >{{item.title}}
            </div>
        </div>
    </scroll>
</template>
<script>
import scroll from 'components/common/scroll/scroll'

export default {
    name:"TabMenu",
    components:{
        scroll

    },
    props:{
        categories:{
            type:Array,
            default(){
                return[]
            }
        }
    },
    data(){
        return{
            currentIndex:0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex=index
            this.$emit('selectItem',index)
            // 点击该事件后，向外发送该索引号
        }
    }  
}
</script>
<style scoped>
/* 设置CSS的box-sizing属性值为“border-box”，这样就会把borders和padding全都包含在定义的宽高里面 */
  #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }
  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
   .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>